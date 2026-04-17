import BN from 'bn.js';
import { PublicKey, VersionedTransaction } from "@solana/web3.js";
import { wallet } from "./common";

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
            throw new Error(`Unexpected response: ${response.status} ${response.statusText}: ${errorText}`);
        }

        const result: Order = await response.json();
        return result;
    }

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
            throw new Error(`Unexpected response: ${response.status} ${response.statusText}: ${errorText}`);
        }

        const result: OrderExecuteResponse = await response.json();
        return result;
    }
}
