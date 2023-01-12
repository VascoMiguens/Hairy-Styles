var moment = require("moment");
module.exports = {
  format_date: (date) => {
    return date.toLocaleDateString();
    // return moment(time).fromNow();
  },
  format_plural: (word, amount) => {
    if (amount !== 1) {
      return `${word}s`;
    }

    return word;
  },
};
