function Last7Days() {
  return "0123456".split("").map(function (n) {
    var d = new Date();
    d.setDate(d.getDate() - n);

    return (function (day, month, year) {
      month = month + 1;
      return [
        month < 10 ? "0" + month : month,
        day < 10 ? "0" + day : day,

        year,
      ].join("/");
    })(d.getDate(), d.getMonth(), d.getFullYear());
  });
}

module.exports = Last7Days;
