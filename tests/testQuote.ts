import { getQuote } from '../src/quote';

async function main() {
    const quote = await getQuote(["WSOL", "USDC", "1000000000"]);
}

main();