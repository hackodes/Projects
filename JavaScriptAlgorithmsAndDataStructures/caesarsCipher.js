function rot13(str) {
  const alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  const alphabetRot13 = "NOPQRSTUVWXYZABCDEFGHIJKLM";
  var message = "";
  var skip;

  for (var i = 0; i < str.length; i++) {
    skip = false;
    if (str.charAt(i) == " ") {
      message = message + " ";
      skip = true;
    }

    if (skip == false) {
      for (var j = 0; j < alphabet.length; j++) {
        if (str.charAt(i) == alphabet[j]) {
          skip = false;
          message = message + alphabetRot13[j];
        }
        if (str.charAt(i) == str.charAt(str.length - 1) && skip == true) {
          if (str.charAt(i) == alphabet[j]) {
            break;
          } else {
            skip = true;
            message = message + str.charAt(i);
          }
        }
      }
    }
  }
  skip = false;
  console.log(str.charAt(str.length - 1));
  for (var i = 0; i < alphabet.length; i++) {
    if (str.charAt(str.length - 1) == alphabet[i]) {
      skip = true;
      break;
    }
  }
  if (!skip) {
    message = message + str.charAt(str.length - 1);
  }

  return message;
}

rot13("SERR PBQR PNZC");
