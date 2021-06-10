const spawn = require('cross-spawn')

let target = process.argv[2]
const alias = {}
target = alias[target] || target

if (!target) {
  spawn('lerna', ['run', 'build', '--stream'], { stdio: 'inherit' })
} else {
  spawn('lerna', ['run', 'build', '--scope', target, '--stream'], { stdio: 'inherit' })
}
