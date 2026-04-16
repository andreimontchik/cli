#!/usr/bin/env bash

if [ -z "$RESEARCH_CLI_PATH" ]; then
    echo "❌ RESEARCH_CLI_PATH is not set."
    exit 1  
else
    echo "RESEARCH_CLI_PATH is set to: $RESEARCH_CLI_PATH"
fi
if [ "$#" -lt 3 ]; then
    echo "⚠️ Usage: bash swap.sh <INPUT_TOKEN> <INPUT_AMOUNT> <OUTPUT_TOKEN>  [ONLY_DIRECT_ROUTES: true|false (default: true)]"
    exit 1
fi

set -euo pipefail

pushd $RESEARCH_CLI_PATH > /dev/null

set -a
source .env
set +a

echo "Compiling TypeScript sources"
npx tsc

echo "Running the swap"
npm run js "swap" "$@"

popd > /dev/null