const moment = require("moment");
module.exports = {
  format_date: (date) => {
    const momentDate = moment(date);
    momentDate.format("MMMM Do YYYY, h:mm:ss a");
    const dateFromNow = momentDate.fromNow();
    return dateFromNow;
    // return moment(time).fromNow();
  },
  format_plural: (word, amount) => {
    if (amount !== 1) {
      return `${word}s`;
    }

    return word;
  },
};
