#!/bin/bash
findnm="find . -name 'node_modules' -type d -prune -print -exec rm -rf '{}' ;"
findpl="find . -name 'package-lock.json' -type f -prune -print "

${findnm}
${findpl}




