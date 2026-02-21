import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { useActor } from './useActor';
import { useInternetIdentity } from './useInternetIdentity';
import { principalToAccountId, formatTokenBalance, parseTokenAmount } from '../lib/accountId';
import { Principal } from '@icp-sdk/core/principal';
import type { UserProfile, NewsUpdate } from '../backend';

// Types for wallet and trading functionality
export interface TokenBalance {
  balance: bigint;
  decimals: number;
}

export interface WalletInfo {
  principalId: string;
  accountId: string;
}

export interface SwapRequest {
  fromToken: string;
  toToken: string;
  amount: bigint;
}

export interface SwapResult {
  success: boolean;
  message: string;
  txId?: string;
}

export interface TransferRequest {
  token: string;
  to: string;
  amount: bigint;
}

export interface TransferResult {
  success: boolean;
  message: string;
  txId?: string;
}

// ICRC-1 Account type
interface ICRC1Account {
  owner: Uint8Array;
  subaccount: [] | [Uint8Array];
}

// ICRC-1 Transfer types
interface ICRC1TransferArgs {
  to: ICRC1Account;
  fee: [] | [bigint];
  memo: [] | [Uint8Array];
  from_subaccount: [] | [Uint8Array];
  created_at_time: [] | [bigint];
  amount: bigint;
}

interface ICRC1TransferError {
  BadFee?: { expected_fee: bigint };
  BadBurn?: { min_burn_amount: bigint };
  InsufficientFunds?: { balance: bigint };
  TooOld?: null;
  CreatedInFuture?: { ledger_time: bigint };
  Duplicate?: { duplicate_of: bigint };
  TemporarilyUnavailable?: null;
  GenericError?: { error_code: bigint; message: string };
}

type ICRC1TransferResult = { Ok: bigint } | { Err: ICRC1TransferError };

// ICRC-1 Ledger interface
interface ICRC1Ledger {
  icrc1_balance_of: (account: ICRC1Account) => Promise<bigint>;
  icrc1_transfer: (args: ICRC1TransferArgs) => Promise<ICRC1TransferResult>;
  icrc1_decimals: () => Promise<number>;
  icrc1_fee: () => Promise<bigint>;
}

// Canister IDs for tokens
const BITTYICP_CANISTER_ID = 'qroj6-lyaaa-aaaam-qeqta-cai';
const ICP_LEDGER_CANISTER_ID = 'ryjl3-tyaaa-aaaaa-aaaba-cai';
const CKBTC_CANISTER_ID = 'mxzaz-hqaaa-aaaar-qaada-cai';

export function useGetCallerUserProfile() {
  const { actor, isFetching: actorFetching } = useActor();

  const query = useQuery<UserProfile | null>({
    queryKey: ['currentUserProfile'],
    queryFn: async () => {
      if (!actor) throw new Error('Actor not available');
      return actor.getCallerUserProfile();
    },
    enabled: !!actor && !actorFetching,
    retry: false,
  });

  return {
    ...query,
    isLoading: actorFetching || query.isLoading,
    isFetched: !!actor && query.isFetched,
  };
}

export function useSaveCallerUserProfile() {
  const { actor } = useActor();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (profile: UserProfile) => {
      if (!actor) throw new Error('Actor not available');
      return actor.saveCallerUserProfile(profile);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['currentUserProfile'] });
    },
  });
}

export function useGetAllNewsUpdates() {
  const { actor, isFetching } = useActor();

  return useQuery<NewsUpdate[]>({
    queryKey: ['newsUpdates'],
    queryFn: async () => {
      if (!actor) return [];
      const updates = await actor.getAllNewsUpdates();
      return updates || [];
    },
    enabled: !!actor && !isFetching,
    staleTime: 0,
    refetchOnMount: true,
    refetchOnWindowFocus: true,
    refetchInterval: 5 * 60 * 1000,
  });
}

// Trading Interface Hooks with Real Wallet Info
export function useGetCallerWalletInfo() {
  const { identity } = useInternetIdentity();

  return useQuery<WalletInfo>({
    queryKey: ['walletInfo', identity?.getPrincipal().toString()],
    queryFn: async () => {
      if (!identity) throw new Error('Identity not available');
      
      const principal = identity.getPrincipal();
      const principalId = principal.toString();
      const accountId = principalToAccountId(principal);

      return {
        principalId,
        accountId,
      };
    },
    enabled: !!identity,
    staleTime: Infinity, // Wallet info doesn't change
  });
}

// Helper function to create ICRC-1 actor
async function createICRC1Actor(canisterId: string): Promise<ICRC1Ledger> {
  const { Actor, HttpAgent } = await import('@dfinity/agent');
  
  const agent = new HttpAgent({
    host: 'https://ic0.app',
  });

  // Only fetch root key in development
  if (process.env.DFX_NETWORK !== 'ic') {
    await agent.fetchRootKey().catch(err => {
      console.warn('Unable to fetch root key. Check to ensure that your local replica is running');
      console.error(err);
    });
  }

  const idlFactory = ({ IDL }: any) => {
    const Account = IDL.Record({
      owner: IDL.Principal,
      subaccount: IDL.Opt(IDL.Vec(IDL.Nat8)),
    });
    const TransferArgs = IDL.Record({
      to: Account,
      fee: IDL.Opt(IDL.Nat),
      memo: IDL.Opt(IDL.Vec(IDL.Nat8)),
      from_subaccount: IDL.Opt(IDL.Vec(IDL.Nat8)),
      created_at_time: IDL.Opt(IDL.Nat64),
      amount: IDL.Nat,
    });
    const TransferError = IDL.Variant({
      BadFee: IDL.Record({ expected_fee: IDL.Nat }),
      BadBurn: IDL.Record({ min_burn_amount: IDL.Nat }),
      InsufficientFunds: IDL.Record({ balance: IDL.Nat }),
      TooOld: IDL.Null,
      CreatedInFuture: IDL.Record({ ledger_time: IDL.Nat64 }),
      Duplicate: IDL.Record({ duplicate_of: IDL.Nat }),
      TemporarilyUnavailable: IDL.Null,
      GenericError: IDL.Record({ error_code: IDL.Nat, message: IDL.Text }),
    });
    return IDL.Service({
      icrc1_balance_of: IDL.Func([Account], [IDL.Nat], ['query']),
      icrc1_transfer: IDL.Func([TransferArgs], [IDL.Variant({ Ok: IDL.Nat, Err: TransferError })], []),
      icrc1_decimals: IDL.Func([], [IDL.Nat8], ['query']),
      icrc1_fee: IDL.Func([], [IDL.Nat], ['query']),
    });
  };

  return Actor.createActor(idlFactory, {
    agent,
    canisterId,
  }) as unknown as ICRC1Ledger;
}

// Live ICRC-1 Token Balance Queries
export function useGetCallerBittyBalance() {
  const { identity } = useInternetIdentity();

  return useQuery<TokenBalance>({
    queryKey: ['bittyBalance', identity?.getPrincipal().toString()],
    queryFn: async () => {
      if (!identity) throw new Error('Identity not available');
      
      try {
        const actor = await createICRC1Actor(BITTYICP_CANISTER_ID);
        const principal = identity.getPrincipal();
        
        const balance = await actor.icrc1_balance_of({
          owner: principal.toUint8Array(),
          subaccount: [],
        });

        return {
          balance,
          decimals: 8,
        };
      } catch (error) {
        console.error('Error fetching BITTYICP balance:', error);
        return {
          balance: BigInt(0),
          decimals: 8,
        };
      }
    },
    enabled: !!identity,
    staleTime: 10000, // 10 seconds
    refetchInterval: 30000, // Refresh every 30 seconds
  });
}

export function useGetCallerIcpBalance() {
  const { identity } = useInternetIdentity();

  return useQuery<TokenBalance>({
    queryKey: ['icpBalance', identity?.getPrincipal().toString()],
    queryFn: async () => {
      if (!identity) throw new Error('Identity not available');
      
      try {
        const actor = await createICRC1Actor(ICP_LEDGER_CANISTER_ID);
        const principal = identity.getPrincipal();
        
        const balance = await actor.icrc1_balance_of({
          owner: principal.toUint8Array(),
          subaccount: [],
        });

        return {
          balance,
          decimals: 8,
        };
      } catch (error) {
        console.error('Error fetching ICP balance:', error);
        return {
          balance: BigInt(0),
          decimals: 8,
        };
      }
    },
    enabled: !!identity,
    staleTime: 10000, // 10 seconds
    refetchInterval: 30000, // Refresh every 30 seconds
  });
}

export function useGetCallerBtcBalance() {
  const { identity } = useInternetIdentity();

  return useQuery<TokenBalance>({
    queryKey: ['btcBalance', identity?.getPrincipal().toString()],
    queryFn: async () => {
      if (!identity) throw new Error('Identity not available');
      
      try {
        const actor = await createICRC1Actor(CKBTC_CANISTER_ID);
        const principal = identity.getPrincipal();
        
        const balance = await actor.icrc1_balance_of({
          owner: principal.toUint8Array(),
          subaccount: [],
        });

        return {
          balance,
          decimals: 8,
        };
      } catch (error) {
        console.error('Error fetching ckBTC balance:', error);
        return {
          balance: BigInt(0),
          decimals: 8,
        };
      }
    },
    enabled: !!identity,
    staleTime: 10000, // 10 seconds
    refetchInterval: 30000, // Refresh every 30 seconds
  });
}

export function useGetCallerQRCodeData() {
  const { identity } = useInternetIdentity();

  return useQuery<string>({
    queryKey: ['qrCodeData', identity?.getPrincipal().toString()],
    queryFn: async () => {
      if (!identity) throw new Error('Identity not available');
      return identity.getPrincipal().toString();
    },
    enabled: !!identity,
    staleTime: Infinity,
  });
}

export function useGetSwapRate() {
  return useMutation({
    mutationFn: async ({ fromToken, toToken, amount }: { fromToken: string; toToken: string; amount: bigint }) => {
      // Note: This requires direct integration with ICPSwap pool canister
      // Pool canister ID: wkyqn-qqaaa-aaaar-qbyxq-cai
      console.log('Fetching swap rate:', { fromToken, toToken, amount: amount.toString() });
      
      // Placeholder rate calculation
      const rate = 1000000; // 1 ICP = 1,000,000 BITTY
      return {
        rate: BigInt(rate),
        estimatedOutput: amount * BigInt(rate),
      };
    },
  });
}

export function useExecuteSwap() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (request: SwapRequest): Promise<SwapResult> => {
      // Note: This requires direct integration with ICPSwap pool canister
      // Pool canister ID: wkyqn-qqaaa-aaaar-qbyxq-cai
      console.log('Executing swap:', {
        from: request.fromToken,
        to: request.toToken,
        amount: request.amount.toString(),
      });
      
      throw new Error('Swap functionality requires direct integration with ICPSwap pool canister (wkyqn-qqaaa-aaaar-qbyxq-cai). Please use the ICPSwap interface directly.');
    },
    onSuccess: () => {
      // Invalidate balance queries to refresh after swap
      queryClient.invalidateQueries({ queryKey: ['bittyBalance'] });
      queryClient.invalidateQueries({ queryKey: ['icpBalance'] });
    },
  });
}

export function useExecuteTransfer() {
  const queryClient = useQueryClient();
  const { identity } = useInternetIdentity();

  return useMutation({
    mutationFn: async (request: TransferRequest): Promise<TransferResult> => {
      if (!identity) throw new Error('Identity not available');

      try {
        // Determine which canister to use based on token
        let canisterId: string;
        switch (request.token) {
          case 'BITTYICP':
            canisterId = BITTYICP_CANISTER_ID;
            break;
          case 'ICP':
            canisterId = ICP_LEDGER_CANISTER_ID;
            break;
          case 'BTC':
            canisterId = CKBTC_CANISTER_ID;
            break;
          default:
            throw new Error('Unsupported token');
        }

        const actor = await createICRC1Actor(canisterId);

        // Parse recipient address (can be Principal or Account ID)
        let recipientPrincipal: Principal;
        try {
          recipientPrincipal = Principal.fromText(request.to);
        } catch (error) {
          throw new Error('Invalid recipient address. Please provide a valid Principal ID.');
        }

        // Get fee
        const fee = await actor.icrc1_fee();

        // Execute transfer
        const result = await actor.icrc1_transfer({
          to: {
            owner: recipientPrincipal.toUint8Array(),
            subaccount: [],
          },
          fee: [fee],
          memo: [],
          from_subaccount: [],
          created_at_time: [BigInt(Date.now() * 1000000)], // nanoseconds
          amount: request.amount,
        });

        if ('Ok' in result) {
          return {
            success: true,
            message: 'Transfer successful',
            txId: result.Ok.toString(),
          };
        } else {
          const error = result.Err;
          let errorMessage = 'Transfer failed';
          
          if (error.InsufficientFunds) {
            errorMessage = `Insufficient funds. Balance: ${formatTokenBalance(error.InsufficientFunds.balance, 8)}`;
          } else if (error.BadFee) {
            errorMessage = `Bad fee. Expected: ${formatTokenBalance(error.BadFee.expected_fee, 8)}`;
          } else if (error.GenericError) {
            errorMessage = error.GenericError.message;
          } else if (error.TooOld !== undefined) {
            errorMessage = 'Transaction too old';
          } else if (error.CreatedInFuture) {
            errorMessage = 'Transaction created in future';
          } else if (error.Duplicate) {
            errorMessage = 'Duplicate transaction';
          } else if (error.TemporarilyUnavailable !== undefined) {
            errorMessage = 'Service temporarily unavailable';
          }

          return {
            success: false,
            message: errorMessage,
          };
        }
      } catch (error: any) {
        console.error('Transfer error:', error);
        return {
          success: false,
          message: error.message || 'Transfer failed. Please try again.',
        };
      }
    },
    onSuccess: (result) => {
      if (result.success) {
        // Invalidate balance queries to refresh after transfer
        queryClient.invalidateQueries({ queryKey: ['bittyBalance'] });
        queryClient.invalidateQueries({ queryKey: ['icpBalance'] });
        queryClient.invalidateQueries({ queryKey: ['btcBalance'] });
      }
    },
  });
}

export function useVerifyTradingAccess() {
  const { identity } = useInternetIdentity();

  return useQuery<boolean>({
    queryKey: ['tradingAccess', identity?.getPrincipal().toString()],
    queryFn: async () => {
      if (!identity) return false;
      // User is authenticated with Internet Identity
      return true;
    },
    enabled: !!identity,
  });
}
