const Table = require("cli-table");
const client = require("./client");
const isoLangConverter = require("iso-language-converter");
const Spinner = require("cli-spinner").Spinner;
const tryMakeUserDataFile = require("./trymakeuserdatafile");

/**Human Readable Error Messages */
const ERROR_MESSAGES = {
  ENOTFOUND: "Make Sure You have an Internet Connection"
  //TODO: ADD OTHERS
};

/**
 * @param {yargs} argv
 */
function handler({ argv, terminalWidth }) {
  var params = { screen_name: argv.username };
  var table = new Table();
  var customSpinner = spinner(
    `Wait while i fetch ${argv.f === true ? `Full` : `Basic`} details for ${
      argv.username
    } 🚀`
  );

  customSpinner.start();
  /** Fetch user data from twitter */
  client
    .get("users/show", params)
    .then(user => {
      /**Create file if --tf or --to-file option was specified */
      if (argv.tf) {
        tryMakeUserDataFile(user);
      }

      if (argv.full) {
        table.push(
          { Username: user[`screen_name`] },
          { Name: user[`name`] },
          { Location: user[`location`] },
          { Biography: formatText(user[`description`], terminalWidth) },
          { Followers: user[`followers_count`] },
          { Following: user[`friends_count`] },
          { Verified: user[`verified`] ? `✔` : `✖` },
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
          { Biography: formatText(user[`description`], terminalWidth) },
          { Verified: user[`verified`] ? `✔` : `✖` },
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

//Look Into this 😝
function formatText(text, terminalWidth) {
  let termCol = terminalWidth / 12;
  /** if text only covers <= 2/3  of the terminal space */
  if (text.length < termCol * 6) return text;

  let formattedString = "";
  for (char of text) {
    if (formattedString.length % (termCol * 6) === 0)
      formattedString = formattedString.concat(`\n`);

    formattedString = formattedString.concat(char);
  }
  return formattedString.trim();
}

module.exports = handler;
