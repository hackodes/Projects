function ConvertHandler() {
  this.getNum = function (input) {
    const regex = /([.\d\/]+)([a-zA-Z]+)/;
    let match = input.match(regex);
    let result = match ? match[1] : "1";
    
    const nums = result.split("/");
    
    let numerator = nums.length <= 2 ? nums[0] : undefined;
    let denominator = nums.length <= 2 ? (nums[1] || "1") : undefined;
  
    if (isNaN(numerator) || isNaN(denominator)) {
      return undefined;
    }
    
    result = parseFloat(numerator) / parseFloat(denominator);
    return result;
  };

  this.getUnit = function (input) {
    const regex = /[a-zA-Z]+/g;
    let match = input.match(regex);
    let string = match ? match[0] : "";
  
    let unit = string.toLowerCase();
  
    const units = { km: "km", gal: "gal", lbs: "lbs", mi: "mi", l: "L", kg: "kg" };
    return units[unit] || undefined;
  };

  this.getReturnUnit = function (initUnit) {
    const unitConversions = { km: "mi", gal: "L", lbs: "kg", mi: "km", l: "gal", kg: "lbs" };
    return unitConversions[initUnit.toLowerCase()] || undefined;
  };

  this.spellOutUnit = function (initUnit) {
    const unitSpellings = {km: "kilometers", gal: "gallons", lbs: "pounds", mi: "miles", l: "liters", kg: "kilograms" };
    return unitSpellings[initUnit.toLowerCase()] || undefined;
  };

  this.convert = function (initNum, initUnit) {
    const galToL = 3.78541;
    const lbsToKg = 0.453592;
    const miToKm = 1.60934;

    initNum = initNum ? eval(initNum) : 1;
    let unit = initUnit.toLowerCase();
 
    const unitConversions = {
      "km": (num) => num / miToKm,
      "gal": (num) => num * galToL,
      "lbs": (num) => num * lbsToKg,
      "mi": (num) => num * miToKm,
      "l": (num) => num / galToL,
      "kg": (num) => num / lbsToKg
    }
    
    let result = unitConversions[unit] ? unitConversions[unit](initNum) : undefined;
    return parseFloat(result.toFixed(5));
  };

  this.getString = function (initNum, initUnit, returnNum, returnUnit) {
    const initUnitSpell = this.spellOutUnit(initUnit);
    const returnUnitSpell = this.spellOutUnit(returnUnit);
    
    return `${initNum} ${initUnitSpell} converts to ${returnNum} ${returnUnitSpell}`;
  };
}

module.exports = ConvertHandler;
