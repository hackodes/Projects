let display = document.getElementById("display");
let secondDisplay = document.getElementById("display2");
let evaluated = false;

function clearDisplay() {
  display.innerHTML = 0;
  secondDisplay.innerHTML = 0;
}

function deleteDisplay() {
  let brk = false;
  if (secondDisplay.innerHTML.length == 1) {
    secondDisplay.innerHTML = 0;
    brk = true;
  }
  if (display.innerHTML.length == 1) {
    if (display.innerHTML != 0 && secondDisplay.innerHTML.length > 1) {
      secondDisplay.innerHTML = secondDisplay.innerHTML.slice(
        0,
        secondDisplay.innerHTML.length - 1
      );
    }
    display.innerHTML = 0;
    brk = true;
  }
  if (brk == false) {
    display.innerHTML = display.innerHTML.slice(
      0,
      display.innerHTML.length - 1
    );
    secondDisplay.innerHTML = secondDisplay.innerHTML.slice(
      0,
      secondDisplay.innerHTML.length - 1
    );
  }
}

function updateDisplay(x) {
  if (evaluated == true) {
    display.innerHTML = x;
    secondDisplay.innerHTML += "+" + x;
  } else if (display.innerHTML == "0" && x == 0) {
    display.innerHTML = 0;
    secondDisplay.innerHTML = 0;
  } else if (display.innerHTML == "0" && secondDisplay.innerHTML == 0) {
    display.innerHTML = x;
    secondDisplay.innerHTML = x;
  } else if (display.innerHTML == "0") {
    display.innerHTML = x;
    secondDisplay.innerHTML += x;
  } else {
    display.innerHTML += x;
    secondDisplay.innerHTML += x;
  }
  evaluated = false;
}

function updateAdd() {
  if (secondDisplay.innerHTML[secondDisplay.innerHTML.length - 1] == "-") {
    if (
      secondDisplay.innerHTML[secondDisplay.innerHTML.length - 2] == "+" ||
      secondDisplay.innerHTML[secondDisplay.innerHTML.length - 2] == "-" ||
      secondDisplay.innerHTML[secondDisplay.innerHTML.length - 2] == "*" ||
      secondDisplay.innerHTML[secondDisplay.innerHTML.length - 2] == "/"
    ) {
      secondDisplay.innerHTML = secondDisplay.innerHTML.slice(
        0,
        secondDisplay.innerHTML.length - 2
      );
      secondDisplay.innerHTML += "+";
    }
  }
  if (
    secondDisplay.innerHTML[secondDisplay.innerHTML.length - 1] == "+" ||
    secondDisplay.innerHTML[secondDisplay.innerHTML.length - 1] == "-" ||
    secondDisplay.innerHTML[secondDisplay.innerHTML.length - 1] == "*" ||
    secondDisplay.innerHTML[secondDisplay.innerHTML.length - 1] == "/" ||
    secondDisplay.innerHTML[secondDisplay.innerHTML.length - 1] == "."
  ) {
    secondDisplay.innerHTML = secondDisplay.innerHTML.slice(
      0,
      secondDisplay.innerHTML.length - 1
    );
    secondDisplay.innerHTML += "+";
    display.innerHTML = 0;
  } else {
    secondDisplay.innerHTML += "+";
    display.innerHTML = 0;
  }
  evaluated = false;
}

function updateSubtract() {
  if (
    secondDisplay.innerHTML[secondDisplay.innerHTML.length - 1] == "+" ||
    secondDisplay.innerHTML[secondDisplay.innerHTML.length - 1] == "-" ||
    secondDisplay.innerHTML[secondDisplay.innerHTML.length - 1] == "."
  ) {
    secondDisplay.innerHTML = secondDisplay.innerHTML.slice(
      0,
      secondDisplay.innerHTML.length - 1
    );
    secondDisplay.innerHTML += "-";
    display.innerHTML = 0;
  } else {
    secondDisplay.innerHTML += "-";
    display.innerHTML = 0;
  }
  evaluated = false;
}

function updateMultiply() {
  if (secondDisplay.innerHTML[secondDisplay.innerHTML.length - 1] == "-") {
    if (
      secondDisplay.innerHTML[secondDisplay.innerHTML.length - 2] == "+" ||
      secondDisplay.innerHTML[secondDisplay.innerHTML.length - 2] == "-" ||
      secondDisplay.innerHTML[secondDisplay.innerHTML.length - 2] == "*" ||
      secondDisplay.innerHTML[secondDisplay.innerHTML.length - 2] == "/"
    ) {
      secondDisplay.innerHTML = secondDisplay.innerHTML.slice(
        0,
        secondDisplay.innerHTML.length - 2
      );
      secondDisplay.innerHTML += "*";
    }
  }
  if (
    secondDisplay.innerHTML[secondDisplay.innerHTML.length - 1] == "+" ||
    secondDisplay.innerHTML[secondDisplay.innerHTML.length - 1] == "-" ||
    secondDisplay.innerHTML[secondDisplay.innerHTML.length - 1] == "*" ||
    secondDisplay.innerHTML[secondDisplay.innerHTML.length - 1] == "/" ||
    secondDisplay.innerHTML[secondDisplay.innerHTML.length - 1] == "."
  ) {
    secondDisplay.innerHTML = secondDisplay.innerHTML.slice(
      0,
      secondDisplay.innerHTML.length - 1
    );
    secondDisplay.innerHTML += "*";
    display.innerHTML = 0;
  } else {
    secondDisplay.innerHTML += "*";
    display.innerHTML = 0;
  }
  evaluated = false;
}

function updateDivide() {
  if (secondDisplay.innerHTML[secondDisplay.innerHTML.length - 1] == "-") {
    if (
      secondDisplay.innerHTML[secondDisplay.innerHTML.length - 2] == "+" ||
      secondDisplay.innerHTML[secondDisplay.innerHTML.length - 2] == "-" ||
      secondDisplay.innerHTML[secondDisplay.innerHTML.length - 2] == "*" ||
      secondDisplay.innerHTML[secondDisplay.innerHTML.length - 2] == "/"
    ) {
      secondDisplay.innerHTML = secondDisplay.innerHTML.slice(
        0,
        secondDisplay.innerHTML.length - 2
      );
      secondDisplay.innerHTML += "/";
    }
  }
  if (
    secondDisplay.innerHTML[secondDisplay.innerHTML.length - 1] == "+" ||
    secondDisplay.innerHTML[secondDisplay.innerHTML.length - 1] == "-" ||
    secondDisplay.innerHTML[secondDisplay.innerHTML.length - 1] == "*" ||
    secondDisplay.innerHTML[secondDisplay.innerHTML.length - 1] == "/" ||
    secondDisplay.innerHTML[secondDisplay.innerHTML.length - 1] == "."
  ) {
    secondDisplay.innerHTML = secondDisplay.innerHTML.slice(
      0,
      secondDisplay.innerHTML.length - 1
    );
    secondDisplay.innerHTML += "/";
    display.innerHTML = 0;
  } else {
    secondDisplay.innerHTML += "/";
    display.innerHTML = 0;
  }
  evaluated = false;
}

function updateDecimal() {
  if (evaluated == true) {
    secondDisplay.innerHTML = 0 + ".";
    display.innerHTML = 0 + ".";
  } else if (
    secondDisplay.innerHTML[secondDisplay.innerHTML.length - 1] == "+" ||
    secondDisplay.innerHTML[secondDisplay.innerHTML.length - 1] == "-" ||
    secondDisplay.innerHTML[secondDisplay.innerHTML.length - 1] == "*" ||
    secondDisplay.innerHTML[secondDisplay.innerHTML.length - 1] == "/"
  ) {
    secondDisplay.innerHTML += 0 + ".";
    display.innerHTML = 0 + ".";
  }
  if (display.innerHTML.indexOf(".") > -1) {
  } else {
    secondDisplay.innerHTML += ".";
    display.innerHTML += ".";
  }
  evaluated = false;
}

function equal() {
  secondDisplay.innerHTML = eval(secondDisplay.innerHTML);
  display.innerHTML = secondDisplay.innerHTML;
  evaluated = true;
}

window.document.onkeypress = function (event) {
  let key = event.key;
  if (key === "1") {
    $("#one").trigger("click");
  } else if (key === "2") {
    $("#two").trigger("click");
  } else if (key === "3") {
    $("#three").trigger("click");
  } else if (key === "4") {
    $("#four").trigger("click");
  } else if (key === "5") {
    $("#five").trigger("click");
  } else if (key === "6") {
    $("#six").trigger("click");
  } else if (key === "7") {
    $("#seven").trigger("click");
  } else if (key === "8") {
    $("#eight").trigger("click");
  } else if (key === "9") {
    $("#nine").trigger("click");
  } else if (key === "+") {
    $("#add").trigger("click");
  } else if (key === "-") {
    $("#subtract").trigger("click");
  } else if (key === "*" || key === "x" || key === "X") {
    $("#multiply").trigger("click");
  } else if (key === "/") {
    $("#divide").trigger("click");
  } else if (key === ".") {
    $("#decimal").trigger("click");
  } else if (key === "=" || key === "Enter") {
    $("#equals").trigger("click");
  } else if (key === "Backspace" || key === "Delete") {
    $("#del").trigger("click");
  }
};
