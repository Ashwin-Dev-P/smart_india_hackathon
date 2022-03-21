//convert day to timestamp
function GetTimeStampOfSelectedDay(date) {
  var now = new Date(date);

  var startOfDay = new Date(now.getFullYear(), now.getDate(), now.getMonth());

  startOfDay = new Date(date).getTime();
  var timestamp = startOfDay / 1000;

  return timestamp;
}
module.exports = GetTimeStampOfSelectedDay;
