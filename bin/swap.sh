#!/usr/bin/env bash

if [ -z "$RESEARCH_CLI_PATH" ]; then
    echo "ERROR: RESEARCH_CLI_PATH is not set."
    exit 1  
else
    echo "RESEARCH_CLI_PATH is set to: $RESEARCH_CLI_PATH"
fi
if [ "$#" -lt 3 ]; then
    echo "Usage: bash swap.sh <INPUT_TOKEN> <OUTPUT_TOKEN> <INPUT_AMOUNT> [ONLY_DIRECT_ROUTES: true|false (default: false)]"
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