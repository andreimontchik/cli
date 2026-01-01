import { PublicKey } from "@solana/web3.js";

export interface TokenInfo {
    mint: PublicKey;
    decimals: number;
}

type TokenMap = Record<string, TokenInfo>;

// Token data including decimals (from on-chain / verified values)
const tokens: TokenMap = {
    WSOL: { mint: new PublicKey("So11111111111111111111111111111111111111112"), decimals: 9 },
    USDC: { mint: new PublicKey("EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v"), decimals: 6 },
    USDT: { mint: new PublicKey("Es9vMFrzaCERmJfrF4H2FYD4KCoNkY11McCe8BenwNYB"), decimals: 6 },
    USDS: { mint: new PublicKey("USDSwr9ApdHk5bvJKMjzff41FfuX8bSxdKcR81vTwcA"), decimals: 6 },
    PYUSD: { mint: new PublicKey("2b1kV6DkPAnxd5ixfnxCpjxmKwqjjaYmCZfHsFu24GXo"), decimals: 6 },
    cbBTC: { mint: new PublicKey("cbbtcf3aa214zXHbiAZQwf4122FBYbraNdFqgw4iMij"), decimals: 8 },
    WETH: { mint: new PublicKey("7vfCXTUXx5WJV5JADk17DUJ4ksgau7utNKj4b963voxs"), decimals: 8 },
    PUMP: { mint: new PublicKey("pumpCmXqMfrsAkQ5r49WcJnRayYRqmXz6ae8H7H9Dfn"), decimals: 6 },
    mSOL: { mint: new PublicKey("mSoLzYCxHdYgdzU16g5QSh3i5K3z3KZK7ytfqcJm7So"), decimals: 9 },
    jitoSOL: { mint: new PublicKey("J1toso1uCk3RLmjorhTtrVwY9HJ7X8V9yYac6Y7kGCPn"), decimals: 9 },
    HNT: { mint: new PublicKey("hntyVP6YFm1Hg25TN9WGLqM12b8TQmcknKrdu1oxWux"), decimals: 8 }
};

export function getToken(symbol: string): TokenInfo | undefined {
    return tokens[symbol];
}