# cli

Collection of useful command line scripts:

- **quote** - get supported [solana token](./src/tokens.ts) value
- **swap** - trade supported [solana tokens](./src/tokens.ts)

## Setup

1. Install [NodeJS](https://github.com/andreimontchik/research/wiki/JavaScript#nodejs) and [TypeScript](https://github.com/andreimontchik/research/wiki/JavaScript#typescript)
1. Switch to the required NodeJS version specified in the [.nvmrc](./.nvmrc) file: `nvm use`
1. Install dependencies from the [package.json](./package.json) file: `npm install`
1. Make sure that scripts in the `./bin` directory are executable: `chmod +x`.
1. Set the "RESEARCH_CLI_PATH" env variable in `.bashrc`: `export RESEARCH_CLI_PATH="$HOME/work/src/research/cli"`
1. Configure aliases for running shell scripts in `.bashrc`:
   ```
   alias quote="$RESEARCH_CLI_PATH/bin/quote.sh"
   alias swap="$RESEARCH_CLI_PATH/bin/swap.sh"
   ```
1. Create the `.env` file, use [env.template](env.template) as a guide.

## Run

- Quote: `quote <INPUT_TOKEN> <INPUT_AMOUNT> <OUTPOUT_TOKEN>`
- Swap: `swap <INPUT_TOKEN> <INPUT_AMOUNT> <OUTPUT_TOKEN> [ONLY_DIRECT_ROUTES: true|false (default: false)]`
