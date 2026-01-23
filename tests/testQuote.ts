import { getQuote } from '../src/quote';

async function main() {
    const quote = await getQuote(["WSOL", "1", "USDC"]);
}

main();