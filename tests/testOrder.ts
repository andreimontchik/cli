import { getOrder } from '../src/order';

async function main() {
    const order = await getOrder(["WSOL", "1", "USDC"]);
}

main();