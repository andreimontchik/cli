import { SendTransactionError } from '@solana/web3.js';
import { logger } from './common';
import { getQuote } from './quote';
import { swapTokens } from './swap';
import { ResponseError } from '@jup-ag/api';
import { getOrder } from './order';

const command = process.argv[2];
if (!command) {
    logger.error("Missing the command: quote | swap");
    process.exit(1);
}

const [, , , ...args] = process.argv;

async function main() {
    try {
        switch (command) {
            case 'quote':
                await getQuote(args);
                break;
            case 'swap':
                await swapTokens(args);
                break;
            case 'order':
                await getOrder(args);
                break;
            default:
                logger.error(`Unsupported command: ${command}`);
                process.exit(1);
        }
    } catch (error) {
        console.error(`Failed to run the script:`);
        if (error instanceof ResponseError) {
            console.error(await error.response.json());
        } else if (error instanceof SendTransactionError) {
            console.error(error.message);
        } else {
            console.error(error);
        }
        process.exit(1);
    }
}

main();
