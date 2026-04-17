
import BN from 'bn.js';
import { jupiterApi, SLIPPAGE_BPS } from './common';
import { getToken } from './tokens';
import { QuoteRequest, QuoteResponse } from './jup';

export async function getQuote(args: string[]): Promise<QuoteResponse> {

    const [inputToken, inputAmountStr, outputToken, onlyDirectRoutesStr = "true"] = args;
    const onlyDirectRoutes = onlyDirectRoutesStr.toLowerCase() === "true";

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

    console.log(`Quoting ${inputAmountStr} of ${inputToken} in ${outputToken}... `);

    const params: QuoteRequest = {
        inputMint: inputMint.mint.toString(),
        outputMint: outputMint.mint.toString(),
        amount: inputAmount.toNumber(),
        onlyDirectRoutes,
        slippageBps: SLIPPAGE_BPS
    };
    const quote: QuoteResponse = await jupiterApi.getQuote(params);
    if (!quote) {
        throw new Error("Quote response is empty");
    }

    console.log("--- Quote Response ---");
    console.log(JSON.stringify(quote));
    console.log("-------------");

    return quote;
}