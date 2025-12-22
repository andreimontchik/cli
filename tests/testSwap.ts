import { swapTokens } from '../src/swap';

async function main() {
    const swapResponse = await swapTokens(["WSOL", "USDC", "10000000"]);
}

main();