window.onload = initfunction;

function initfunction() {
  document.getElementById("roundOption").classList.add("hide");
}

var validName;
var validAddress;
var validPhone;
var validPostal;
var validEmail;
var validLength;
var validWidth;
var validRadius;
var cakeTotal;
var cakeTotalWithAddition = 0;

function validateName() {
  var clientName = document.getElementById("clientName").value;
  var isName = isNaN(clientName);
  if (isName == false) {
    document.getElementById("clientName").classList.add("is-invalid");
    document.getElementById("clientName").classList.remove("is-valid");
    validName = false;
  } else {
    document.getElementById("clientName").classList.add("is-valid");
    document.getElementById("clientName").classList.remove("is-invalid");
    validName = true;
  }
}

function validateAddress() {
  var address = document.getElementById("address").value;
  var pattern = new RegExp("^[a-zA-Z0-9- ]+$");
  if (pattern.test(address)) {
    document.getElementById("address").classList.add("is-valid");
    document.getElementById("address").classList.remove("is-invalid");
    validAddress = true;
  } else {
    document.getElementById("address").classList.add("is-invalid");
    document.getElementById("address").classList.remove("is-valid");
    validAddress = false;
  }
}

function validatePhone() {
  var telephone = document.getElementById("telephone").value;
  // Regex found here https://stackoverflow.com/questions/9776231/regular-expression-to-validate-us-phone-numbers
  var pattern = new RegExp("^[0-9]{3}-[0-9]{3}-[0-9]{4}$");
  if (pattern.test(telephone)) {
    document.getElementById("telephone").classList.add("is-valid");
    document.getElementById("telephone").classList.remove("is-invalid");
    validPhone = true;
  } else {
    document.getElementById("telephone").classList.add("is-invalid");
    document.getElementById("telephone").classList.remove("is-valid");
    validPhone = false;
  }
}

function validatePostalCode() {
  var postalCode = document.getElementById("postalCode").value;
  var pattern = new RegExp("^[a-zA-Z][0-9][a-zA-Z][0-9][a-zA-Z][0-9]$");
  if (pattern.test(postalCode)) {
    document.getElementById("postalCode").classList.add("is-valid");
    document.getElementById("postalCode").classList.remove("is-invalid");
    validPostal = true;
  } else {
    document.getElementById("postalCode").classList.add("is-invalid");
    document.getElementById("postalCode").classList.remove("is-valid");
    validPostal = false;
  }
}

function validateEmail() {
  var email = document.getElementById("email").value;
  var pattern = new RegExp("^[a-zA-Z0-9_.-]+@[a-zA-Z]+[.][a-zA-Z]{2,}$");
  if (pattern.test(email)) {
    document.getElementById("email").classList.add("is-valid");
    document.getElementById("email").classList.remove("is-invalid");
    validEmail = true;
  } else {
    document.getElementById("email").classList.add("is-invalid");
    document.getElementById("email").classList.remove("is-valid");
    validEmail = false;
  }
}

function displayCakeOptions() {
  var selection = document.querySelector("input[name=cakeType]:checked").value;
  if (selection == "round") {
    document.getElementById("sheetOption").classList.add("hide");
    document.getElementById("roundOption").classList.remove("hide");
  } else {
    document.getElementById("roundOption").classList.add("hide");
    document.getElementById("sheetOption").classList.remove("hide");
  }
}

function validateSheetSize() {
  var length = document.getElementById("length").value;
  var width = document.getElementById("width").value;

  length = parseFloat(length);
  if (length >= 30 && length <= 60) {
    document.getElementById("length").classList.add("is-valid");
    document.getElementById("length").classList.remove("is-invalid");
    validLength = true;
  } else {
    document.getElementById("length").classList.remove("is-valid");
    document.getElementById("length").classList.add("is-invalid");
    validLength = false;
  }

  width = parseFloat(width);
  if (width >= 30 && width <= 45) {
    document.getElementById("width").classList.add("is-valid");
    document.getElementById("width").classList.remove("is-invalid");
    validWidth = true;
  } else {
    document.getElementById("width").classList.remove("is-valid");
    document.getElementById("width").classList.add("is-invalid");
    validWidth = false;
  }
}

function validateRoundSize() {
  var radius = document.getElementById("radius").value;

  radius = parseFloat(radius);
  if (radius >= 15 && radius <= 30) {
    document.getElementById("radius").classList.add("is-valid");
    document.getElementById("radius").classList.remove("is-invalid");
    validRadius = true;
  } else {
    document.getElementById("radius").classList.remove("is-valid");
    document.getElementById("radius").classList.add("is-invalid");
    validRadius = false;
  }
}

function validateForm() {
  var cakeSelection = document.querySelector(
    "input[name=cakeType]:checked"
  ).value;
  if (validName && validAddress && validPostal && validPhone && validEmail) {
    if (cakeSelection == "sheet" && validLength && validWidth) {
      calcOrder("sheet");
    } else if (cakeSelection == "round" && validRadius) {
      calcOrder("round");
    }
  }
}

function calcOrder(cakeSelect) {
  var cakeLength = document.getElementById("length").value;
  var cakeWidth = document.getElementById("width").value;
  var cakeRadius = document.getElementById("radius").value;
  var cakeLayers = document.getElementById("cakeLayer").value;
  var additionalLayer;
  var cakeDimension;
  if (cakeSelect == "sheet") {
    cakeDimension = cakeLength * cakeWidth;
    cakeTotal = (cakeDimension - 900) * 0.02 + 18;
  } else {
    cakeDimension = cakeRadius * cakeRadius * 3.14;
    cakeTotal = (cakeDimension - 707) * 0.02 + 15;
  }

  if (cakeLayers == 1) {
    cakeTotal = cakeTotal;
  } else if (cakeLayers == 2) {
    additionalLayer = cakeTotal / 2;
    cakeTotal = cakeTotal + additionalLayer;
  } else if (cakeLayers == 3) {
    additionalLayer = cakeTotal / 2;
    cakeTotal = cakeTotal + additionalLayer * 2;
  }

  cakeTotalWithAddition = cakeTotal;

  if (document.querySelector("input[name=creamCheese]:checked")) {
    cakeTotalWithAddition += 5;
  }
  if (document.querySelector("input[name=fruitAlmond]:checked")) {
    cakeTotalWithAddition += 7;
  }
  if (document.querySelector("input[name=fruitJam]:checked")) {
    cakeTotalWithAddition += 4;
  }

  displayOrder();
}

function displayOrder() {
  var message = "";
  var clientName = document.getElementById("clientName").value;
  var address = document.getElementById("address").value;
  var postalCode = document.getElementById("postalCode").value;
  var telephone = document.getElementById("telephone").value;
  var email = document.getElementById("email").value;
  var length = document.getElementById("length").value;
  var width = document.getElementById("width").value;
  var radius = document.getElementById("radius").value;
  var selection = document.querySelector("input[name=cakeType]:checked").value;
  var cakeLayers = document.getElementById("cakeLayer").value;
  var cakeAddition = [];
  var cakeAdditionPrice = [];
  var cakeTotal = cakeTotal;

  message += "<h4>Customer Details</h4>";
  message += "<hr>";
  message += "<h6>" + clientName + "</h6>";
  message += "<h6>" + address + "</h6>";
  message += "<h6>" + postalCode + "</h6>";
  message += "<h6>" + telephone + "</h6>";
  message += "<h6>" + email + "</h6><br>";
  message += "<div class='row align-items-center'>";
  message += "<div class='col-8'>";
  message += "<h4>Order Details</h4><hr>";

  if (validLength && validWidth) {
    message +=
      selection +
      " cake " +
      length +
      "cm x " +
      width +
      "cm with " +
      cakeLayers +
      " layers:";
    cakeAdditionPrice.push(this.cakeTotal.toFixed(2));
  } else {
    message +=
      "<br>" +
      selection +
      " cake " +
      radius +
      "cm with " +
      cakeLayers +
      " layers:";
    cakeAdditionPrice.push(this.cakeTotal.toFixed(2));
  }

  if (document.querySelector("input[name=creamCheese]:checked")) {
    cakeAddition.push("Cream Cheese icing");
    cakeAdditionPrice.push("5");
  }

  if (document.querySelector("input[name=fruitAlmond]:checked")) {
    cakeAddition.push("Fruit and Almonds topping");
    cakeAdditionPrice.push("7");
  }

  if (document.querySelector("input[name=fruitJam]:checked")) {
    cakeAddition.push("Fruit jam filling between layers");
    cakeAdditionPrice.push("4");
  }

  for (let i = 0; i < cakeAddition.length; i++) {
    message += "<br>" + cakeAddition[i];
  }

  message += "<hr>";

  message += "<div class='text-end fw-bold'>Total:</div>";

  message += "</div>";
  message += "<div class='col-4'><h4>Price</h4><hr>";

  for (let i = 0; i < cakeAdditionPrice.length; i++) {
    message += "$" + cakeAdditionPrice[i] + "<br>";
  }

  message += "<hr>";

  message += "$" + cakeTotalWithAddition.toFixed(2);

  message += "</div></div>";

  document.getElementById("order").innerHTML = message;
  document.getElementById("section1").scrollIntoView();
}
