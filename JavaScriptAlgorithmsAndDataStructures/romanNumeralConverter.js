var romanNumerals = [
  [1000, "M"],
  [900, "CM"],
  [500, "D"],
  [400, "CD"],
  [100, "C"],
  [90, "XC"],
  [50, "L"],
  [40, "XL"],
  [10, "X"],
  [9, "IX"],
  [5, "V"],
  [4, "IV"],
  [1, "I"],
];

function convertToRoman(num) {
  var convertedNums = "";
  romanNumerals.forEach((numeral) => {
    var val = Math.floor(num / numeral[0]);
    if (val > 0) {
      num = num - numeral[0] * Math.floor(num / numeral[0]);
      while (val > 0) {
        convertedNums = convertedNums + numeral[1];
        val = val - 1;
      }
    }
  });
  return convertedNums;
}

convertToRoman(36);
