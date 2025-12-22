#!/usr/bin/env bash

if [ -z "$RESEARCH_CLI_PATH" ]; then
    echo "ERROR: RESEARCH_CLI_PATH is not set."
    exit 1  
else
    echo "RESEARCH_CLI_PATH is set to: $RESEARCH_CLI_PATH"
fi
if [ "$#" -ne 3 ]; then
    echo "Usage: bash swap.sh <INPUT_TOKEN> <OUTPOUT_TOKEN> <INPUT_AMOUNT>"
    exit 1
fi

set -euo pipefail

set -euo pipefail

pushd $RESEARCH_CLI_PATH > /dev/null

set -a
source .env
set +a

npm run build
npm run js "swap" "$@"

popd > /dev/null