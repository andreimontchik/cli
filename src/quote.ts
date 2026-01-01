
import BN from 'bn.js';
import { jupApiClient, SLIPPAGE_BPS } from './common';
import { QuoteGetRequest, QuoteResponse } from '@jup-ag/api';
import { getToken } from './mints';

export async function getQuote(args: string[]): Promise<QuoteResponse> {

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

    console.log(`Quoting ${inputAmountStr} of ${inputToken} in ${outputToken}... `);

    const params: QuoteGetRequest = {
        inputMint: inputMint.mint.toString(),
        outputMint: outputMint.mint.toString(),
        amount: inputAmount.toNumber(),
        slippageBps: SLIPPAGE_BPS
    };
    const quote: QuoteResponse = await jupApiClient.quoteGet(params);
    if (!quote) {
        throw new Error("Quote response is empty");
    }

    console.log("--- Quote ---");
    console.log(quote);
    console.log("-------------");

    return quote;
}