import { getQuote } from './quote';
import { wallet, connection, jupiterApi } from './common';
import { BlockheightBasedTransactionConfirmationStrategy, VersionedTransaction } from "@solana/web3.js";
import { QuoteResponse, SwapResponse } from './jup';

export async function swapTokens(args: string[]) {

    const quote: QuoteResponse = await getQuote(args);

    console.log(`Swapping  ${quote.inAmount} ${quote.inputMint}} to ${quote.outAmount} ${quote.outputMint}...`);

    const swapResponse: SwapResponse = await jupiterApi.getSwap(quote);

    console.log("--- Swap Response ---");
    console.log(JSON.stringify(swapResponse));
    console.log("---------------------");

    // Sign the txn
    const txnBuf = Uint8Array.from(
        Buffer.from(swapResponse.swapTransaction, "base64")
    );
    const transaction: VersionedTransaction = VersionedTransaction.deserialize(txnBuf);
    transaction.sign([wallet]);

    // Send the txn
    const latestBlockhash = await connection.getLatestBlockhash();

    console.log(`Sending the transaction...`);
    const signature = await connection.sendTransaction(transaction);
    console.log(`Tx sig: ${signature}`);

    const strategy: BlockheightBasedTransactionConfirmationStrategy = {
        signature,
        blockhash: latestBlockhash.blockhash,
        lastValidBlockHeight: latestBlockhash.lastValidBlockHeight,

    };

    console.log("Waiting for tx confirmation...");
    const confirmation = await connection.confirmTransaction(strategy, "confirmed");

    console.log("--- Tx Confirmation ---");
    console.log(confirmation);
    console.log("------------------------");
}