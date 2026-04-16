# cli

Collection of useful command line scripts:

- **tokens** - list of [tokens] supported by the CLI
- **quote** - qoute tokens
- **swap** - trade tokens
- **order** - get the tokens swap order

## Setup

1. Install [NodeJS](https://github.com/andreimontchik/research/wiki/JavaScript#nodejs) and [TypeScript](https://github.com/andreimontchik/research/wiki/JavaScript#typescript)
1. Switch to the required NodeJS version specified in the [.nvmrc](./.nvmrc) file: `nvm use`
1. Install dependencies from the [package.json](./package.json) file: `npm install`
1. Clone the repo.
1. Make sure that scripts in the `./bin` directory are executable: `chmod +x`
1. Set the "RESEARCH_CLI_PATH" env variable in `.bashrc`: `export RESEARCH_CLI_PATH="$HOME/work/src/research/cli"`
1. Configure aliases for running shell scripts in `.bashrc`:

   ```
   alias tokens="cat $RESEARCH_CLI_PATH/tokens.json"
   alias quote="$RESEARCH_CLI_PATH/bin/quote.sh"
   alias swap="$RESEARCH_CLI_PATH/bin/swap.sh"
   alias order="$RESEARCH_CLI_PATH/bin/order.sh"
   ```

1. Create the `.env` file, use [env.template](env.template) as a guide.

## Run

- Tokens: `tokens`
- Quote: `quote <INPUT_TOKEN> <INPUT_AMOUNT> <OUTPOUT_TOKEN> [ONLY_DIRECT_ROUTES: true|false (default: true)]`
- Swap: `swap <INPUT_TOKEN> <INPUT_AMOUNT> <OUTPUT_TOKEN> [ONLY_DIRECT_ROUTES: true|false (default: true)]`
- Order: `swap <INPUT_TOKEN> <INPUT_AMOUNT> <OUTPUT_TOKEN>`
