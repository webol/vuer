find . -name 'node_modules' -type d -prune -print -exec rm -rf '{}' \;
find . -name 'package-lock.json' -type d -print -exec rm -rf '{}' \;
