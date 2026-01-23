import { swapTokens } from '../src/swap';

async function main() {
    const swapResponse = await swapTokens(["WSOL", "0.01", "USDC"]);
}

main();