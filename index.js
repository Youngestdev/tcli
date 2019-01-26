#!/usr/bin/env node

var Table = require("cli-table");
const client = require("./lib/client");
const Spinner = require("cli-spinner").Spinner;

require("yargs")
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
        describe:
          "The username of the twitter user whose details is to be retrieved"
      });
    },

    function(argv) {
      var params = { screen_name: argv.username };
      var table = new Table();
      var customSpinner = spinner(
        `Wait while i fetch details for ${argv.username} 🚀`
      );

      customSpinner.start();
      /** Fetch user data from twitter */
      client
        .get("users/show", params)
        .then(user => {
          if (argv.full) {
            table.push(
              { Username: user[`screen_name`] },
              { Name: user[`name`] },
              { Location: user[`location`] },
              { Biography: user[`description`] },
              { Followers: user[`followers_count`] },
              { Following: user[`friends_count`] },
              { Favourites: user[`favourites_count`] },
              { Joined: user[`created_at`] },
              { Language: user[`lang`] },
              { TweetCount: user["statuses_count"] },
              { Lists: user["listed_count"] }
            );
          } else {
            table.push(
              { Username: user[`screen_name`] },
              { Name: user[`name`] },
              { Biography: user[`description`] },
              { Followers_Count: user[`followers_count`] },
              { Following: user[`friends_count`] },
              {
                Additional_Details: `To get the full data on ${
                  user["screen_name"]
                }, use the --full option`
              }
            );
          }

          process.stdout.write("\n \n");

          console.log(table.toString());

          process.stdout.write("\n");

          /**Stop the spinner */
          customSpinner.stop();
        })
        .catch(error => console.log(error));
    }
  )
  .help().argv;

function spinner(msg) {
  return new Spinner({
    text: `${msg} %s`,
    stream: process.stderr,
    onTick: function(msg) {
      this.clearLine(this.stream);
      this.stream.write(msg);
    }
  });
}
