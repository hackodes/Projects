function countryCodeCheck(str) {
  if (
    (str.charAt(1) === " " || str.charAt(1) === "(") &&
    !isNaN(str.charAt(0))
  ) {
    return str.charAt(0);
  } else if (str.charAt(0) === "-") {
    return false;
  }
  return undefined;
}

function telephoneCheck(str) {
  var regex = /[0-9]*/g;
  var validChars = /^[0-9-()" "]*$/;
  if (validChars.test(str) == true) {
    if (countryCodeCheck(str) == "1" || countryCodeCheck(str) == undefined) {
      var telephoneNum = str.match(regex).join("");
      if (
        telephoneNum.length == 10 ||
        (countryCodeCheck(str) == "1" && telephoneNum.length == 11)
      ) {
        var containPar = /[()]/;
        var validPar = /\([0-9]{3}\)/;
        if (containPar.test(str) == true) {
          if (validPar.test(str) == true) {
            return true;
          }
          return false;
        }
        return true;
      }
      return false;
    }
  }
  return false;
}
telephoneCheck("555-555-5555");
