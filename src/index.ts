import { logger } from './common';
import { getQuote } from './quote';
import { swapTokens } from './swap';
import { ResponseError } from '@jup-ag/api';

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
                await swapTokens();
                break;
            default:
                logger.error(`Unsupported command: ${command}`);
                process.exit(1);
        }
    } catch (error) {
        console.error(`Failed to run the script: ${error}`);
        if (error instanceof ResponseError) {
            console.error(`Response status: ${error.response.status} - ${error.response.statusText}`);
        }
        process.exit(1);
    }
}

main();
