import { getQuote } from '../src/quote';

async function main() {
    const quote = await getQuote(["USDC", "WSOL", "1000000"]);
}

main();