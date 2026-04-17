#!/usr/bin/env bash

if [ -z "$RESEARCH_CLI_PATH" ]; then
    echo "❌ RESEARCH_CLI_PATH is not set."
    exit 1  
else
    echo "RESEARCH_CLI_PATH is set to: $RESEARCH_CLI_PATH"
fi

if [ "$#" -lt 3 ]; then
    echo "⚠️ Usage: bash quote.sh <INPUT_TOKEN> <INPUT_AMOUNT> <OUTPOUT_TOKEN> [ONLY_DIRECT_ROUTES: true|false (default: true)]"
    exit 1
fi

source  "$RESEARCH_CLI_PATH/bin/common.sh"
run_research_cli quote "$@"