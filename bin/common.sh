# common.sh
run_research_cli() {
set -euo pipefail

pushd $RESEARCH_CLI_PATH > /dev/null

set -a
source .env
set +a

echo "Compiling TypeScript sources"
npm run build

npm run js "$@"

popd > /dev/null
}