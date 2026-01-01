import { swapTokens } from '../src/swap';

async function main() {
    const swapResponse = await swapTokens(["USDC", "1", "WSOL"]);
}

main();