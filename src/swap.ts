import { QuoteResponse, SwapPostRequest, SwapResponse } from '@jup-ag/api';
import { getQuote } from './quote';
import { wallet, jupApiClient, connection } from './common';
import { BlockheightBasedTransactionConfirmationStrategy, VersionedTransaction } from "@solana/web3.js";

export async function swapTokens(args: string[]) {
    const quote: QuoteResponse = await getQuote(args);

    console.log(`Swapping  ${quote.inAmount} of ${quote.inputMint}} to ${quote.outAmount} of ${quote.outputMint}...`);

    const swapRequest: SwapPostRequest = {
        swapRequest: {
            quoteResponse: quote,
            userPublicKey: wallet.publicKey.toBase58(),
            dynamicComputeUnitLimit: true,
            wrapAndUnwrapSol: false,
        }
    };

    const swapResponse: SwapResponse = await jupApiClient.swapPost(swapRequest);

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

    const strategy: BlockheightBasedTransactionConfirmationStrategy = {
        signature,
        blockhash: latestBlockhash.blockhash,
        lastValidBlockHeight: latestBlockhash.lastValidBlockHeight,
    };
    const confirmation = await connection.confirmTransaction(strategy, "confirmed");

    console.log("--- Txn Confirmation ---");
    console.log(confirmation);
    console.log("------------------------");

    console.log(`Transaction is confirmed: ${JSON.stringify(confirmation)}`)
}