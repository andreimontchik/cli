# cli

A collection of useful command-line scripts for interacting with the Solana ecosystem.

- **tokens** - list of supported [tokens]
- **quote** - qoute token swap
- **swap** - quote and swap tokens
- **order** - get the tokens swap order
- **execute** - get and exectute the tokens swap order

## Setup

1. Install [NodeJS](https://github.com/andreimontchik/research/wiki/JavaScript#nodejs) and [TypeScript](https://github.com/andreimontchik/research/wiki/JavaScript#typescript)
1. Clone the repository and navigate into it.
1. Switch to the required NodeJS version specified in the [.nvmrc](./.nvmrc) file: `nvm use`
1. Install dependencies from the [package.json](./package.json) file: `npm install`
1. Create the `.env` file, use [env.template](env.template) as a guide.
1. Make sure that scripts in the `./bin` directory are executable: `chmod +x`
1. Set the "RESEARCH_CLI_PATH" env variable in `.bashrc`: `export RESEARCH_CLI_PATH="$HOME/work/src/research/cli"`
1. Configure aliases for running shell scripts in `.bashrc`:

   ```
   alias tokens="cat $RESEARCH_CLI_PATH/tokens.json"
   alias quote="$RESEARCH_CLI_PATH/bin/quote.sh"
   alias swap="$RESEARCH_CLI_PATH/bin/swap.sh"
   alias order="$RESEARCH_CLI_PATH/bin/order.sh"
   alias execute="$RESEARCH_CLI_PATH/bin/execute.sh"
   ```
