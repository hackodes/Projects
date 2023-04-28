var values = [
  ["ONE HUNDRED", 10000],
  ["TWENTY", 2000],
  ["TEN", 1000],
  ["FIVE", 500],
  ["ONE", 100],
  ["QUARTER", 25],
  ["DIME", 10],
  ["NICKEL", 5],
  ["PENNY", 1],
];

function getChange(index, change, registerCash, holderCash) {
  while (change > 0 && index < values.length) {
    var name = values[index][0];
    var val = values[index][1];
    if (registerCash[name] > 0 && change - val > 0) {
      holderCash[name] = 0;
      while (registerCash[name] > 0 && change - val >= 0) {
        holderCash[name] = holderCash[name] + val / 100;
        registerCash[name] = parseInt(registerCash[name] - val);
        change = change - val;
      }
    }
    index++;
  }
  return change;
}

function isChangeZero(change) {
  if (change == 0) {
    return {
      status: "CLOSED",
      change: cid,
    };
  }
}

function checkCashRegister(price, cash, cid) {
  var change = cash * 100 - price * 100;
  var holderCash = {};
  var registerCash = {};
  var index = 0;
  isChangeZero();
  cid.forEach((money) => {
    registerCash[money[0]] = parseInt(money[1] * 100);
  });
  change = getChange(index, change, registerCash, holderCash);
  if (change == 0) {
    var hasCash = false;
    Object.keys(registerCash).forEach((key) => {
      if (registerCash[key] > 0) {
        hasCash = true;
      }
    });
    if (hasCash == true) {
      return {
        status: "OPEN",
        change: Object.keys(holderCash).map((key) => {
          var object = [key, holderCash[key]];
          console.log(JSON.stringify(object));
          return object;
        }),
      };
    } else {
      return {
        status: "CLOSED",
        change: cid,
      };
    }
  }
  return {
    status: "INSUFFICIENT_FUNDS",
    change: [],
  };
}

checkCashRegister(19.5, 20, [
  ["PENNY", 1.01],
  ["NICKEL", 2.05],
  ["DIME", 3.1],
  ["QUARTER", 4.25],
  ["ONE", 90],
  ["FIVE", 55],
  ["TEN", 20],
  ["TWENTY", 60],
  ["ONE HUNDRED", 100],
]);
