var fs = require("fs");

function tryMakeUserDataFile(user) {
  const userString = JSON.stringify(user);
  fs.writeFile(`${user.screen_name}.json`, userString, err => console.log(err));
}

module.exports = tryMakeUserDataFile;
