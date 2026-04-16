#!/usr/bin/env bash

if [ -z "$RESEARCH_CLI_PATH" ]; then
    echo "❌ RESEARCH_CLI_PATH is not set."
    exit 1  
else
    echo "RESEARCH_CLI_PATH is set to: $RESEARCH_CLI_PATH"
fi

if [ "$#" -ne 3 ]; then
    echo "⚠️ Usage: bash quote.sh <INPUT_TOKEN> <INPUT_AMOUNT> <OUTPOUT_TOKEN>"
    exit 1
fi

set -euo pipefail

pushd $RESEARCH_CLI_PATH > /dev/null

set -a
source .env
set +a

npm run build
npm run js "quote" "$@"

popd > /dev/null
