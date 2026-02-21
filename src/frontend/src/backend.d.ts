import type { Principal } from "@icp-sdk/core/principal";
export interface Some<T> {
    __kind__: "Some";
    value: T;
}
export interface None {
    __kind__: "None";
}
export type Option<T> = Some<T> | None;
export interface TokenMetric {
    status: string;
    marketCap?: number;
    lastUpdated: bigint;
    volume?: number;
    price?: number;
}
export interface http_request_result {
    status: bigint;
    body: Uint8Array;
    headers: Array<http_header>;
}
export interface TransformationOutput {
    status: bigint;
    body: Uint8Array;
    headers: Array<http_header>;
}
export interface TransformationInput {
    context: Uint8Array;
    response: http_request_result;
}
export interface NewsUpdate {
    id: bigint;
    title: string;
    content: string;
    timestamp: bigint;
}
export interface UserProfile {
    name: string;
}
export interface http_header {
    value: string;
    name: string;
}
export enum UserRole {
    admin = "admin",
    user = "user",
    guest = "guest"
}
export interface backendInterface {
    addNewsUpdate(title: string, content: string): Promise<bigint>;
    assignCallerUserRole(user: Principal, role: UserRole): Promise<void>;
    getAllNewsUpdates(): Promise<Array<NewsUpdate>>;
    getCallerUserProfile(): Promise<UserProfile | null>;
    getCallerUserRole(): Promise<UserRole>;
    getLiveWalletBalances(owner: Uint8Array, subaccount: Uint8Array | null, currency: string): Promise<bigint>;
    getNewsUpdate(id: bigint): Promise<NewsUpdate | null>;
    getNewsUpdatesByContent(content: string): Promise<Array<NewsUpdate>>;
    getNewsUpdatesByDateRange(startDate: bigint, endDate: bigint): Promise<Array<NewsUpdate>>;
    getNewsUpdatesByTitle(title: string): Promise<Array<NewsUpdate>>;
    getNewsUpdatesPaginated(page: bigint, pageSize: bigint): Promise<Array<NewsUpdate>>;
    getSortedNewsUpdates(): Promise<Array<NewsUpdate>>;
    getTokenMetrics(): Promise<TokenMetric>;
    getUserProfile(user: Principal): Promise<UserProfile | null>;
    initializeAccessControl(): Promise<void>;
    isCallerAdmin(): Promise<boolean>;
    saveCallerUserProfile(profile: UserProfile): Promise<void>;
    transform(input: TransformationInput): Promise<TransformationOutput>;
}
