#!/usr/bin/env bash
NODE_PATH="/export/server/node_modules"
baseDir="$(cd "$(dirname "$0")"; pwd)"
nodebin="/export/local/node-v6.9.1/bin/node"
pm2bin="/export/local/pm2-2.9.1/bin/pm2"
export PATH=$PATH:/export/local/node-v6.9.1/bin
export NODE_ENV=domain
export PORT=3000
export NODE_PATH

$nodebin $pm2bin stop 'www'
$nodebin $pm2bin delete 'www'
