#!/usr/bin/env node
var Table = require("cli-table");
const client = require("./client");
const Spinner = require("cli-spinner").Spinner;

/**Future improvement to code */

// const FULL = [
//   "created_at",
//   "name",
//   "screen_name",
//   "followers_count",
//   "description",
//   "friends_count",
//   "favourites_count",
//   "statuses_count",
//   "statuses_count",
//   "lang",
//   "listed_count"
// ];

// const BASIC = [
//   "created_at",
//   "name",
//   "screen_name",
//   "followers_count",
//   "description",
//   "friends_count"
// ];

require("yargs")
  .usage("$0 <cmd> [args]")
  .boolean("full") /**To specify if full data should be fetched or not */
  .demandOption(["username"]) /** Username is required */
  .command(
    "trieve [username]",
    "Tcli - retrieve a twitter user's data!",
    yargs => {
      yargs.positional("username", {
        type: "string",
        alias: "u",
        describe:
          "The username of the twitter user whose details is to be retrieved"
      });
    },

    function(argv) {
      /**Debugging */
      // console.log(argv);

      let params = { screen_name: argv.username };
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
              // { description: user[`description`] },
              { Followers: user[`followers_count`] },
              { Following: user[`friends_count`] },
              { Favourites: user[`favourites_count`] },
              { Joined: user[`created_at`] },
              { Language: user[`lang`] },
            );
          } else {
            table.push(
              { Username: user[`screen_name`] },
              { Name: user[`name`] },
              { Location: user[`location`] },
              // { description: user[`description`] },
              { Followers_Count: user[`followers_count`] },
              { Followers: user[`followers_count`] },
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


