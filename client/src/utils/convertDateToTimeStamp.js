async function convertDateToTimeStamp(date) {
  var myDate = date;

  myDate = myDate.split("-");
  var newDate = new Date(myDate[0], myDate[1] - 1, myDate[2] + 1);
  console.log(newDate.getTime());
}
module.exports = convertDateToTimeStamp;
