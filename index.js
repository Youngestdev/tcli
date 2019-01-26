#!/usr/bin/env node

const Table = require("cli-table");
const client = require("./lib/client");
const Spinner = require("cli-spinner").Spinner;
const isoLangConverter = require("iso-language-converter")

/**Human Readable Error Messages */
const ERROR_MESSAGES = {
  ENOTFOUND: "Make Sure You have an Internet Connection"
  //TODO: ADD OTHERS
};

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
        `Wait while i fetch ${argv.f === true ? `Full` : `Basic`} details for ${argv.username} 🚀`
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
              { Verified: user[`verified`] ? `✔`: `✖` },
              { Favourites: user[`favourites_count`] },
              { Joined: user[`created_at`] },
              { Language: isoLangConverter(user[`lang`]) },
              { TweetCount: user["statuses_count"] },
              { Lists: user["listed_count"] }
            );
          } else {
            table.push(
              { Username: user[`screen_name`] },
              { Name: user[`name`] },
              { Biography: user[`description`] },
              { Verified: user[`verified`] ? `✔`: `✖` },
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
        .catch(error => {
          /**Also Stop spinner When error occurs */
          customSpinner.stop();

          process.stdout.write("\n \n");

          /**Log Error Message */
          console.error(`An error occured, ${ERROR_MESSAGES[error.code]}`);

          process.stdout.write("\n \n");
        });
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
