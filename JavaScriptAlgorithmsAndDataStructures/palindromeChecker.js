function palindrome(str) {
  var string = str.replace(/[^A-Za-z0-9]/g, "");
  var string = string.toUpperCase();
  for (var i = 0; i < string.length; i++) {
    if (string[i] != string[string.length - 1 - i]) {
      return false;
    }
  }
  return true;
}

palindrome("eye");
