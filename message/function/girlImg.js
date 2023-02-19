const fs = require("fs");
var path = require("path");
const filename = path.join(__dirname, "../../config/img.txt");

async function girlImg(message) {
  fs.readFile(filename, "utf8", function (err, data) {
    if (err) throw err;
    const myList = data.split("\n");
    const res = myList[Math.floor(Math.random() * myList.length)];
    message.channel.send(res);
  });
}

module.exports = girlImg;
