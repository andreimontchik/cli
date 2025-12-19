import { logger } from './common';
import { getQuote } from './quote';
import { swapTokens } from './swap';

const command = process.argv[2];
if (!command) {
    logger.error("Missing the command: quote | swap");
    process.exit(1);
}


function main() {
    switch (command) {
        case 'quote':
            getQuote();
            break;
        case 'swap':
            swapTokens();
            break;
        default:
            logger.error(`Unsupported command: ${command}`);
            process.exit(1);
    }
}

main();
