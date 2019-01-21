#!/usr/bin/env node

require('yargs')
.usage('$0 <cmd> [args]')
.command('trieve [username]', 'Tcli - retrieve a twitter user\'s data!', (yargs) => {
  yargs.positional('username', {
    type: 'string',
    default: 'kvng_zeez',
    describe: 'the username whose detail is to be retrieved'
  })
}, function (argv) {
  console.log(argv.username, /* Twitter details should come here. */)
})
.help()
.argv