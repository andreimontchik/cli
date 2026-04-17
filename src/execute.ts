import BN from "bn.js";
import { getToken } from "./tokens";
import { OrderRequest } from "./jup";
import { jupiterApi } from "./common";

export async function execute(args: string[]) {

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

    console.log(`Executing the ${inputAmountStr} ${inputToken} to ${outputToken} swap...`);
    const orderRequest: OrderRequest = {
        inputMint: inputMint.mint,
        outputMint: outputMint.mint,
        amount: inputAmount,
    };
    const orderResponse = await jupiterApi.getOrder(orderRequest);
    if (orderResponse.errorCode != undefined) {
        throw new Error(`Invalid order response: ${orderResponse.errorCode} ${orderResponse.errorMessage}`);
    }
    console.log("--- Order Response ---");
    console.log(JSON.stringify(orderResponse));
    console.log("-------------");

    const executeResponse = await jupiterApi.executeOrder(orderResponse);
    console.log("--- Order Execute Response ---");
    console.log(JSON.stringify(executeResponse));
    console.log("-------------");
}