#!/usr/bin/env bash

if [ "$#" -ne 3 ]; then
    echo "Usage: bash quote.sh <INPUT_TOKEN> <OUTPOUT_TOKEN> <INPUT_AMOUNT>"
    exit 1
fi

if [ -z "$RESEARCH_SCRIPTS_PATH" ]; then
    echo "ERROR: RESEARCH_SCRIPTS_PATH is not set."
    exit 1  
else
    echo "RESEARCH_SCRIPTS_PATH is set to: $RESEARCH_SCRIPTS_PATH"
fi

set -euo pipefail

pushd $RESEARCH_SCRIPTS_PATH > /dev/null

set -a
source .env
set +a

npm run build
npm run js "quote" "$@"

popd > /dev/null
