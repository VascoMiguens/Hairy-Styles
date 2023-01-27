const moment = require("moment");
module.exports = {
  format_date: (date) => {
    const momentDate = moment(date);
    //convert date retrieved to this format
    momentDate.format("MMMM Do YYYY, h:mm:ss a");
    // use moment.js to convert the date to date from now
    const dateFromNow = momentDate.fromNow();
    return dateFromNow;
    // return moment(time).fromNow();
  },
  // returns the plural form of the word if the amount is not equal to 1
  format_plural: (word, amount) => {
    if (amount !== 1) {
      return `${word}s`;
    }

    return word;
  },
};
