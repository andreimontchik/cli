import { getQuote } from '../src/quote';

async function main() {
    const quote = await getQuote(["USDC", "1", "WSOL"]);
}

main();