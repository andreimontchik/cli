import { execute } from '../src/execute';

async function main() {
    await execute(["USDC", "1", "WSOL"]);
}

main();