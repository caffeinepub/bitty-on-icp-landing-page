import type { Principal } from "@icp-sdk/core/principal";

const SUB_ACCOUNT_ZERO = new Uint8Array(32);

/**
 * Converts a Principal to an Account ID (hex string)
 * This follows the ICP ledger account identifier specification
 */
export function principalToAccountId(
  principal: Principal,
  subAccount?: Uint8Array,
): string {
  const hash = sha224(
    "\x0Aaccount-id",
    principal.toUint8Array(),
    subAccount || SUB_ACCOUNT_ZERO,
  );

  // Calculate CRC32 checksum
  const crc = crc32(hash);
  const bytes = new Uint8Array([...crc, ...hash]);

  return Array.from(bytes)
    .map((b) => b.toString(16).padStart(2, "0"))
    .join("");
}

/**
 * SHA-224 hash implementation
 */
function sha224(...data: (string | Uint8Array)[]): Uint8Array {
  // SHA-224 uses SHA-256 with different initial hash values and truncated output
  const K = [
    0x428a2f98, 0x71374491, 0xb5c0fbcf, 0xe9b5dba5, 0x3956c25b, 0x59f111f1,
    0x923f82a4, 0xab1c5ed5, 0xd807aa98, 0x12835b01, 0x243185be, 0x550c7dc3,
    0x72be5d74, 0x80deb1fe, 0x9bdc06a7, 0xc19bf174, 0xe49b69c1, 0xefbe4786,
    0x0fc19dc6, 0x240ca1cc, 0x2de92c6f, 0x4a7484aa, 0x5cb0a9dc, 0x76f988da,
    0x983e5152, 0xa831c66d, 0xb00327c8, 0xbf597fc7, 0xc6e00bf3, 0xd5a79147,
    0x06ca6351, 0x14292967, 0x27b70a85, 0x2e1b2138, 0x4d2c6dfc, 0x53380d13,
    0x650a7354, 0x766a0abb, 0x81c2c92e, 0x92722c85, 0xa2bfe8a1, 0xa81a664b,
    0xc24b8b70, 0xc76c51a3, 0xd192e819, 0xd6990624, 0xf40e3585, 0x106aa070,
    0x19a4c116, 0x1e376c08, 0x2748774c, 0x34b0bcb5, 0x391c0cb3, 0x4ed8aa4a,
    0x5b9cca4f, 0x682e6ff3, 0x748f82ee, 0x78a5636f, 0x84c87814, 0x8cc70208,
    0x90befffa, 0xa4506ceb, 0xbef9a3f7, 0xc67178f2,
  ];

  // SHA-224 initial hash values (different from SHA-256)
  let h0 = 0xc1059ed8;
  let h1 = 0x367cd507;
  let h2 = 0x3070dd17;
  let h3 = 0xf70e5939;
  let h4 = 0xffc00b31;
  let h5 = 0x68581511;
  let h6 = 0x64f98fa7;
  let h7 = 0xbefa4fa4;

  // Concatenate all input data
  const message: number[] = [];
  for (const item of data) {
    if (typeof item === "string") {
      for (let i = 0; i < item.length; i++) {
        message.push(item.charCodeAt(i));
      }
    } else {
      for (let i = 0; i < item.length; i++) {
        message.push(item[i]);
      }
    }
  }

  // Pre-processing: adding padding bits
  const msgLen = message.length;
  const bitLen = msgLen * 8;

  message.push(0x80);

  // Pad with zeros until length ≡ 448 (mod 512)
  while ((message.length * 8) % 512 !== 448) {
    message.push(0x00);
  }

  // Append length as 64-bit big-endian
  for (let i = 7; i >= 0; i--) {
    message.push((bitLen >>> (i * 8)) & 0xff);
  }

  // Process the message in 512-bit chunks
  for (let chunk = 0; chunk < message.length; chunk += 64) {
    const w: number[] = new Array(64);

    // Break chunk into sixteen 32-bit big-endian words
    for (let i = 0; i < 16; i++) {
      w[i] =
        (message[chunk + i * 4] << 24) |
        (message[chunk + i * 4 + 1] << 16) |
        (message[chunk + i * 4 + 2] << 8) |
        message[chunk + i * 4 + 3];
    }

    // Extend the sixteen 32-bit words into sixty-four 32-bit words
    for (let i = 16; i < 64; i++) {
      const s0 =
        rightRotate(w[i - 15], 7) ^
        rightRotate(w[i - 15], 18) ^
        (w[i - 15] >>> 3);
      const s1 =
        rightRotate(w[i - 2], 17) ^
        rightRotate(w[i - 2], 19) ^
        (w[i - 2] >>> 10);
      w[i] = (w[i - 16] + s0 + w[i - 7] + s1) >>> 0;
    }

    // Initialize working variables
    let a = h0;
    let b = h1;
    let c = h2;
    let d = h3;
    let e = h4;
    let f = h5;
    let g = h6;
    let h = h7;

    // Main loop
    for (let i = 0; i < 64; i++) {
      const S1 = rightRotate(e, 6) ^ rightRotate(e, 11) ^ rightRotate(e, 25);
      const ch = (e & f) ^ (~e & g);
      const temp1 = (h + S1 + ch + K[i] + w[i]) >>> 0;
      const S0 = rightRotate(a, 2) ^ rightRotate(a, 13) ^ rightRotate(a, 22);
      const maj = (a & b) ^ (a & c) ^ (b & c);
      const temp2 = (S0 + maj) >>> 0;

      h = g;
      g = f;
      f = e;
      e = (d + temp1) >>> 0;
      d = c;
      c = b;
      b = a;
      a = (temp1 + temp2) >>> 0;
    }

    // Add the compressed chunk to the current hash value
    h0 = (h0 + a) >>> 0;
    h1 = (h1 + b) >>> 0;
    h2 = (h2 + c) >>> 0;
    h3 = (h3 + d) >>> 0;
    h4 = (h4 + e) >>> 0;
    h5 = (h5 + f) >>> 0;
    h6 = (h6 + g) >>> 0;
    h7 = (h7 + h) >>> 0;
  }

  // Produce the final hash value (SHA-224 uses only first 7 words, 28 bytes)
  const hash = new Uint8Array(28);
  const words = [h0, h1, h2, h3, h4, h5, h6];

  for (let i = 0; i < 7; i++) {
    hash[i * 4] = (words[i] >>> 24) & 0xff;
    hash[i * 4 + 1] = (words[i] >>> 16) & 0xff;
    hash[i * 4 + 2] = (words[i] >>> 8) & 0xff;
    hash[i * 4 + 3] = words[i] & 0xff;
  }

  return hash;
}

/**
 * Right rotate helper for SHA-224
 */
function rightRotate(n: number, b: number): number {
  return ((n >>> b) | (n << (32 - b))) >>> 0;
}

/**
 * CRC32 checksum calculation
 */
function crc32(buf: Uint8Array): number[] {
  const table = makeCRCTable();
  let crc = 0 ^ -1;

  for (let i = 0; i < buf.length; i++) {
    crc = (crc >>> 8) ^ table[(crc ^ buf[i]) & 0xff];
  }

  crc = (crc ^ -1) >>> 0;

  // Convert to 4 bytes (big-endian)
  return [
    (crc >> 24) & 0xff,
    (crc >> 16) & 0xff,
    (crc >> 8) & 0xff,
    crc & 0xff,
  ];
}

/**
 * Generate CRC32 lookup table
 */
function makeCRCTable(): number[] {
  let c: number;
  const crcTable: number[] = [];

  for (let n = 0; n < 256; n++) {
    c = n;
    for (let k = 0; k < 8; k++) {
      c = c & 1 ? 0xedb88320 ^ (c >>> 1) : c >>> 1;
    }
    crcTable[n] = c;
  }

  return crcTable;
}

/**
 * Format balance from smallest unit to human-readable format
 */
export function formatTokenBalance(balance: bigint, decimals: number): string {
  const divisor = BigInt(10 ** decimals);
  const integerPart = balance / divisor;
  const fractionalPart = balance % divisor;

  const fractionalStr = fractionalPart.toString().padStart(decimals, "0");
  return `${integerPart}.${fractionalStr}`;
}

/**
 * Parse human-readable amount to smallest unit
 */
export function parseTokenAmount(amount: string, decimals: number): bigint {
  const parts = amount.split(".");
  const integerPart = parts[0] || "0";
  const fractionalPart = (parts[1] || "")
    .padEnd(decimals, "0")
    .slice(0, decimals);

  return BigInt(integerPart + fractionalPart);
}
