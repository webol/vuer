#!/bin/bash
find . -name 'node_modules' -type d -prune -print -exec rm -rf '{}' + ;
find . -name '.nuxt' -type d -prune -print -exec rm -rf '{}' + ;

find . -name 'package-lock.json' -type f -print -exec rm -rf '{}' + ;
find . -name 'yarn.lock' -type f -print -exec rm -rf '{}' + ;
find . -name '.DS_Store' -type f -print -exec rm -rf '{}' + ;
