# cli

A collection of useful command line scripts

## Run

### Dev

1. Switch to the required NodeJS version specifice in the [.nvmrc](./.nvmrc) file: `nvm use`
1. [Optional] install dependencies from the [package.json](./package.json) file: `npm install`
1. Run TypeScript scripts: `npm run ts`
1. Build JavaScript from TypeScript: `npm run build`. The command generates JavaScript scripts in the `./dist` directory.
1. Run JavaScrtipt scripts: `npm run js`

### Host

1. Make sure that scripts in the `./bin` directory are executable: `chmod +x`.
1. Set the "RESEARCH_CLI_PATH" env variable in `.bashrc`: `export RESEARCH_CLI_PATH="$HOME/work/src/research/cli"`
1. Configure aliases for running shell scripts in `.bashrc`:
   ```
   alias quote="$RESEARCH_CLI_PATH/bin/quote.sh"
   alias swap="$RESEARCH_CLI_PATH/bin/swap.sh"
   ```

## Maintain

### Upgrade Dependencies

1. Review outdated dependencies: `npm outdated`
1. Update the [.package.json](./package.json)
1. `npm install`
1. `rm -rf dist`
1. `npm run build`
