import BN from 'bn.js';
import { jupiterApi } from './common';
import { getToken } from './tokens';
import { OrderRequest, OrderResponse } from './jup';

export async function getOrder(args: string[]): Promise<OrderResponse> {

    const [inputToken, inputAmountStr, outputToken] = args;

    if (!inputToken) {
        throw new Error("Missing input token");
    }
    const inputMint = getToken(inputToken);
    if (!inputMint) {
        throw new Error(`Unsupported input token: ${inputToken}`);
    }

    if (!outputToken) {
        throw new Error("Missing output token");
    }
    const outputMint = getToken(outputToken);
    if (!outputMint) {
        throw new Error(`Unsupported output token: ${outputToken}`);
    }
    const inputAmount = new BN(Math.round(parseFloat(inputAmountStr) * 10 ** inputMint.decimals));

    console.log(`Requesting and order for swapping ${inputAmountStr} ${inputToken} to ${outputToken}... `);

    const orderRequest: OrderRequest = {
        inputMint: inputMint.mint,
        outputMint: outputMint.mint,
        amount: inputAmount,
    };
    const orderResponse = await jupiterApi.getOrder(orderRequest);
    if (!orderResponse) {
        throw new Error("Order response is empty");
    }

    console.log("--- Order Response ---");
    console.log(JSON.stringify(orderResponse));
    console.log("-------------");

    return orderResponse;
}