import { getQuote } from '../src/quote';

async function main() {
    const quote = await getQuote(["USDC", "USDC", "1000000"]);
}

main();