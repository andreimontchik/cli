import { swapTokens } from '../src/swap';

async function main() {
    await swapTokens(["USDC", "1", "USDT"]);
}

main();