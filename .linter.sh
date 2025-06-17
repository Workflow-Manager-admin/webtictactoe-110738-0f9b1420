#!/bin/bash
cd /home/kavia/workspace/code-generation/webtictactoe-110738-0f9b1420/webtic_tac_toe_web
npm run build
EXIT_CODE=$?
if [ $EXIT_CODE -ne 0 ]; then
   exit 1
fi

