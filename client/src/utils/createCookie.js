function createCookie(name, value, minutes, secure, SameSite) {
  var expires;
  if (minutes) {
    var date = new Date();
    date.setTime(date.getTime() + minutes * 60 * 1000);
    expires = "; expires=" + date.toGMTString();
  } else {
    expires = "";
  }

  var my_cookie = name + "=" + value + expires + "; path=/;";

  if (SameSite) {
    my_cookie = my_cookie + ";SameSite=" + SameSite;
  }

  if (process.env.NODE_ENV === "production" && secure) {
    my_cookie = my_cookie + ";secure";
  }
  document.cookie = my_cookie;
}

export default createCookie;
