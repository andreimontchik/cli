import { order } from '../src/order';

async function main() {
    await order(["USDC", "1", "WSOL"]);
}

main();