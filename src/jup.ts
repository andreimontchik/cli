import BN from 'bn.js';
import { PublicKey } from "@solana/web3.js";
import { wallet } from "./common";

export type OrderRequest = {
    inputMint: PublicKey;
    outputMint: PublicKey;
    amount: BN;
}

export type OrderResponse = {
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
    requestId?: string;
    totalTime?: number;
    expireAt?: string;
    errorCode?: number;
    errorMessage?: string;
    error?: string;
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

    async getOrder(request: OrderRequest): Promise<OrderResponse> {

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
            throw new Error(`Order failed! Response: HTTP ${response.status} ${response.statusText}: ${errorText}`);
        }

        const orderResponse: OrderResponse = await response.json();
        return orderResponse;
    }
}
