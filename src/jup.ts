import BN from 'bn.js';
import { PublicKey, VersionedTransaction } from "@solana/web3.js";
import { wallet } from "./common";

declare const SwapMode: {
    readonly ExactIn: "ExactIn";
    readonly ExactOut: "ExactOut";
};
type SwapMode = typeof SwapMode[keyof typeof SwapMode];

declare const InstructionVersion: {
    readonly V1: "V1";
    readonly V2: "V2";
};
type InstructionVersion = typeof InstructionVersion[keyof typeof InstructionVersion];


export interface QuoteRequest {
    inputMint: string;
    outputMint: string;
    amount: number;
    slippageBps?: number;
    swapMode?: SwapMode;
    dexes?: Array<string>;
    excludeDexes?: Array<string>;
    restrictIntermediateTokens?: boolean;
    onlyDirectRoutes?: boolean;
    asLegacyTransaction?: boolean;
    platformFeeBps?: number;
    maxAccounts?: number;
    instructionVersion?: InstructionVersion;
    dynamicSlippage?: boolean;
}


interface PlatformFee {
    amount?: string;
    feeBps?: number;
}

interface SwapInfo {
    ammKey: string;
    label?: string;
    inputMint: string;
    outputMint: string;
    inAmount: string;
    outAmount: string;
}

interface RoutePlanStep {
    swapInfo: SwapInfo;
    percent?: number | null;
    bps?: number;
}

export interface QuoteResponse {
    inputMint: string;
    inAmount: string;
    outputMint: string;
    outAmount: string;
    otherAmountThreshold: string;
    instructionVersion?: InstructionVersion;
    swapMode: SwapMode;
    slippageBps: number;
    platformFee?: PlatformFee;
    priceImpactPct: string;
    routePlan: Array<RoutePlanStep>;
    contextSlot?: number;
    timeTaken?: number;
}

export interface SwapResponse {
    swapTransaction: string;
    lastValidBlockHeight: number;
    prioritizationFeeLamports?: number;
}

export type OrderRequest = {
    inputMint: PublicKey;
    outputMint: PublicKey;
    amount: BN;
}

export type Order = {
    mode: string;
    inputMint: string;
    outputMint: string;
    inAmount: string;
    outAmount: string;
    inUsdValue: number;
    outUsdValue: number;
    priceImpact: number;
    swapUsdValue: number;
    otherAmountThreshold: string;
    swapMode: string;
    slippageBps: number;
    priceImpactPct: string;
    feeBps: number;
    platformFee?: {
        amount: string;
        feeBps: number;
        feeMint: string;
    };
    router?: string;
    transaction?: string;
    lastValidBlockHeight?: string;
    requestId?: string;
    totalTime?: number;
    expireAt?: string;
    errorCode?: number;
    errorMessage?: string;
}

export type OrderExecuteResponse = {
    status: string;
    signature: string;
    slot: string;
    error?: string;
    code: number;
    totalInputAmount: string;
    totalOutputAmount: string;
    inputAmountResult: string;
    outputAmountResult: string;
}

export class JupiterApi {

    private baseUrl: string;
    private apiKey: string;
    private slippageBps: number;

    constructor(baseUrl: string, apiKey: string, slippageBps: number) {
        this.baseUrl = baseUrl;
        this.apiKey = apiKey;
        this.slippageBps = slippageBps;
    }

    /**
     * Docs: https://developers.jup.ag/docs/api-reference/swap/v2/order
     */
    async getOrder(request: OrderRequest): Promise<Order> {

        const params = new URLSearchParams({
            inputMint: request.inputMint.toString(),
            outputMint: request.outputMint.toString(),
            amount: request.amount.toString(),
            taker: wallet.publicKey.toString(),
            slippageBps: this.slippageBps.toString(),
        });

        const response = await fetch(`${this.baseUrl}/swap/v2/order?` + params, {
            headers: {
                "x-api-key": `${this.apiKey}`
            },
        });
        if (!response.ok) {
            const errorText = await response.text();
            throw new Error(`Unexpected order response: ${response.status} ${response.statusText}: ${errorText}`);
        }

        const result: Order = await response.json();
        return result;
    }

    /**
     * Docs: https://developers.jup.ag/docs/api-reference/swap/v2/execute
     */
    async executeOrder(order: Order): Promise<OrderExecuteResponse> {
        if (!order.transaction) {
            throw new Error(`No transaction in the order: ${JSON.stringify(order)}`);
            process.exit(1);
        }

        const tx = VersionedTransaction.deserialize(
            Buffer.from(order.transaction, "base64"),
        );
        tx.sign([wallet]);

        const signedTxBuffer = Buffer.from(tx.serialize()).toString("base64");

        const response = await fetch(`${this.baseUrl}/swap/v2/execute`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "x-api-key": `${this.apiKey}`,
            },
            body: JSON.stringify({
                signedTransaction: signedTxBuffer,
                requestId: order.requestId,
                lastValidBlockHeight: order.lastValidBlockHeight
            }),
        });
        if (!response.ok) {
            const errorText = await response.text();
            throw new Error(`Unexpected execute order response: ${response.status} ${response.statusText}: ${errorText}`);
        }

        const result: OrderExecuteResponse = await response.json();
        return result;
    }

    /**
     * Docs: https://developers.jup.ag/docs/api-reference/swap/v1/swap
     */
    async getSwap(quote: QuoteResponse): Promise<SwapResponse> {
        const response = await fetch(`${this.baseUrl}/swap/v1/swap`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "x-api-key": `${this.apiKey}`,
            },
            body: JSON.stringify({
                userPublicKey: wallet.publicKey.toBase58(),
                quoteResponse: quote,
                dynamicComputeUnitLimit: true,
                wrapAndUnwrapSol: false,
            }),
        });
        if (!response.ok) {
            const errorText = await response.text();
            throw new Error(`Unexpected swap response: ${response.status} ${response.statusText}: ${errorText}`);
        }

        const result: SwapResponse = await response.json();
        return result;
    }

    /**
     * Docs: https://developers.jup.ag/docs/api-reference/swap/v1/quote
     */
    async getQuote(request: QuoteRequest): Promise<QuoteResponse> {
        const params = new URLSearchParams({
            inputMint: request.inputMint.toString(),
            outputMint: request.outputMint.toString(),
            amount: request.amount.toString(),
            taker: wallet.publicKey.toString(),
            slippageBps: this.slippageBps.toString(),
        });

        const response = await fetch(`${this.baseUrl}/swap/v1/quote?` + params, {
            headers: {
                "Content-Type": "application/json",
                "x-api-key": `${this.apiKey}`,
            },
        });
        if (!response.ok) {
            const errorText = await response.text();
            throw new Error(`Unexpected quote response: ${response.status} ${response.statusText}: ${errorText}`);
        }

        const result: QuoteResponse = await response.json();
        return result;
    }
}
