import { getQuote } from '../src/quote';

async function main() {
    await getQuote(["WSOL", "1", "USDC"]);
}

main();