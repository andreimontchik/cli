
import BN from 'bn.js';
import { logger, jupApiClient, SLIPPAGE_BPS, tokens } from './common';
import { QuoteGetRequest, QuoteResponse } from '@jup-ag/api';

export async function getQuote(args: string[]) {

    const [inputToken, outputToken, inputAmountStr] = args;

    if (!inputToken) {
        throw new Error("Missing input token");
    }
    const inputMint = tokens[inputToken];
    if (!inputMint) {
        throw new Error(`Unsupported input token: ${inputToken}`);
    }

    if (!outputToken) {
        throw new Error("Missing output token");
    }
    const outputMint = tokens[outputToken];
    if (!outputMint) {
        throw new Error(`Unsupported output token: ${outputToken}`);
    }
    const inputAmount = new BN(inputAmountStr);

    console.log(`Quoting ${inputAmount.toString()} of ${inputToken} in ${outputToken}... `);

    const params: QuoteGetRequest = {
        inputMint: inputMint.toString(),
        outputMint: outputMint.toString(),
        amount: inputAmount.toNumber(),
        slippageBps: SLIPPAGE_BPS
    };
    const quote: QuoteResponse = await jupApiClient.quoteGet(params);

    if (!quote) {
        throw new Error("Failed to get a quote");
    }

    console.log("--- Quote ---");
    console.log(quote);
    console.log("-------------");

    return quote;
}