# scripts
A collection of useful TypeScript scripts

## Run
### Dev
1. switch to the required NodeJS version: `nvm use`
1. [Optional] install dependencies from the [package.json](./package.json) file: `npm install`
1. Run TypeScript scripts: `npm run ts`
1. Build JavaScript from TypeScript: `npm run build`. The command generates JavaScript scripts in the `./dist` directory.
1. Run JavaScrtipt scripts: `npm run js`

### Host
1. Make sure that scripts in the `./bin` directory are executable by using `chmod +x`.
1. Set the "RESEARCH_SCRIPTS_PATH" env variable in `.bashrc`: `export RESEARCH_SCRIPTS_PATH="$HOME/work/src/research/scripts"`
1. Configure aliases for running shell scripts in `.bashrc`: 
   ```
   alias quote="$RESEARCH_SCRIPTS_PATH/bin/quote.sh"
   ```   
## Maintain
## Upgrade Dependencies
1. `npm outdated`
1. `npm install @jup-ag/api`
1. `rm -rf dist`
1. `npm run build`