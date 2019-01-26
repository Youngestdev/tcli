#!/usr/bin/env node

const yargs = require("yargs");
const handler = require("./lib/handler")

yargs
  .usage("$0 <cmd> [args]")
  .option("f", {
    alias: "full",
    demandOption: true,
    default: false,
    describe: "Specifies if full details should be fetched",
    type: "boolean"
  })
  .demandOption(
    ["username"],
    `Please provide the <username> of the user you want to fetch \n
     For Example: 
     \t trieve marvinjudehk
    `
  ) /** Username is required */
  .command(
    "$0 [username]",
    "Trieve - retrieve a twitter user's data!",
    yargs => {
      yargs.positional("--username", {
        type: "string",
        alias: "u",
        describe: "The username of the twitter user whose details is to be retrieved"
      });
    },

    handler
  )
  .help().argv;