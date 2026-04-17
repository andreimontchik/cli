import { getQuote } from './quote';
import { swapTokens } from './swap';
import { order } from './order';
import { execute } from './execute';

const command = process.argv[2];
if (!command) {
    console.error("Missing the command: quote | swap");
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
                await order(args);
                break;
            case 'execute':
                await execute(args);
                break;
            default:
                console.error(`Unsupported command: ${command}`);
                process.exit(1);
        }
    } catch (error) {
        console.error(`Failed to run the script:`);
        console.error(error);

        process.exit(1);
    }
}

main();
