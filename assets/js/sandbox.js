"use strict";

// Add default styles to show which input is not valid
var products = [
  {name:"Wristwatch",
    description:"Mobile wrist watch that tells time.",
    image_url:"image_url",
    price:""},
  {name:"Wristwatch",
    description:"Mobile wrist watch that tells time.",
    image_url:"image_url",
    price:""},
  {name:"Wristwatch",
    description:"Mobile wrist watch that tells time.",
    image_url:"image_url",
    price:""},
  {name:"Wristwatch",
    description:"Mobile wrist watch that tells time.",
    image_url:"image_url",
    price:""},
  {name:"Wristwatch",
    description:"Mobile wrist watch that tells time.",
    image_url:"image_url",
    price:""},
  {name:"Wristwatch",
    description:"Mobile wrist watch that tells time.",
    image_url:"image_url",
    price:""},
  {name:"Wristwatch",
    description:"Mobile wrist watch that tells time.",
    image_url:"image_url",
    price:""},
  {name:"Wristwatch",
    description:"Mobile wrist watch that tells time.",
    image_url:"image_url",
    price:""}
];
// Default selector in the event every object in array is needed e.g home page
var default_selector = [1, 2, 3, 4, 5, 6, 7, 8];
var main = document.querySelector("main");
var counte, formDataReset, formDataBill, billCount;

if( sessionStorage.getItem("formData") === null){
  sessionStorage.setItem("billingShippingCheck", "false");
}

if( sessionStorage.getItem("formData") === null){
  sessionStorage.setItem("formData",
    JSON.stringify(
      {
        formSubmission : {
          shipping : {
            country : "",
            fullName: "",
            phoneNumber : "",
            address1 : "",
            address2 : "",
            state : "",
            city : "",
            zip : ""
          },
          billing : {
            country : "",
            fullName: "",
            phoneNumber : "",
            address1 : "",
            address2 : "",
            state : "",
            city : "",
            zip : ""
          },
          payment : {
            name : "",
            number : "",
            expiry : "",
            cvv : ""
          }
        },
        formInput : {
          shipping : {
            country : "",
            fullName: "",
            phoneNumber : "",
            address1 : "",
            address2 : "",
            state : "",
            city : "",
            zip : ""
          },
          billing : {
            country : "",
            fullName: "",
            phoneNumber : "",
            address1 : "",
            address2 : "",
            state : "",
            city : "",
            zip : ""
          },
          payment : {
            name : "",
            number : "",
            expiry : "",
            cvv : ""
          }
        }
      }
    )
  );
}

function makeOL(object, id, selected){
  var i;
  var listItems;

  // Add appropriate number of list
  for ( i = 0; i < selected.length; i++) {
    document.getElementById(id).appendChild(document.createElement('li'));
  }

  listItems = document.getElementById(id).getElementsByTagName('li');
  for ( i in selected ) {
    listItems[i].appendChild(document.createElement('img'));
    listItems[i].querySelector('img').src = object[i].image_url;
    listItems[i].appendChild(document.createElement('p'));
    listItems[i].querySelector('p').className = "name";
    listItems[i].querySelector('p').innerHTML = object[i].name;
    listItems[i].appendChild(document.createElement('p'));
    listItems[i].querySelector('p:not(.name)').className = "description";
    listItems[i].querySelector('p:not(.name)').innerHTML = object[i].description;
    listItems[i].appendChild(document.createElement('p'));
    listItems[i].querySelector('p:not(.name, .description)').className = "price";
    listItems[i].querySelector('p:not(.name, .description)').innerHTML = object[i].price;
    listItems[i].appendChild(document.createElement('button'));
    listItems[i].querySelector('button').className = "cart";
    listItems[i].querySelector('button').innerHTML = "Add cart";
  }
}

function cartFunction(item) {
  var cart_selc;
  if (!sessionStorage.getItem("cart_selector").includes(item)){
    cart_selc = sessionStorage.getItem("cart_selector").split(",");
    cart_selc.push(item);
    sessionStorage.setItem("cart_selector", cart_selc);
  }
}

function makeP(id, dataId){
  var i, paragraphItems;
  var formData = JSON.parse(sessionStorage.getItem("formData"));

  // Add appropriate number of list
  for ( i = 0; i < Object.keys(formData.formSubmission[dataId]).length; i++) {
    document.getElementById(id).appendChild(document.createElement('p'));
  }

  paragraphItems = document.getElementById(id).getElementsByTagName('p');

  for ( i = 0; i < Object.keys(formData.formSubmission[dataId]).length; i++ ) {
    paragraphItems[i].innerHTML = Object.values(formData.formSubmission[dataId])[i];
  }
}

// Getting form fields data
function doForm() {
  var formData;
  var errorlog;
  var listNode;
  var i;
  if(document.forms[0].checkValidity()) {
    formData = JSON.parse(sessionStorage.getItem("formData"));
    if(document.querySelector("main").id === "shipping") {
      if(document.querySelector("#bill").checked) {
        formData.formSubmission.shipping = {
          country : document.forms[0].country.value,
          fullName : document.forms[0].fullname.value,
          phoneNumber : document.forms[0].telephone.value,
          address1 : document.forms[0].address[0].value,
          address2 : document.forms[0].address[1].value,
          city : document.forms[0].city.value,
          state : document.forms[0].state.value,
          zip : document.forms[0].zip.value
        };
        formData.formInput.shipping = formData.formSubmission.shipping;
        formData.formSubmission.billing = formData.formSubmission.shipping;
        formData.formInput.billing = formData.formSubmission.shipping;
        location.assign("../payment");
      } else {
        formData.formSubmission.shipping = {
          country : document.forms[0].country.value,
          fullName : document.forms[0].fullname.value,
          phoneNumber : document.forms[0].telephone.value,
          address1 : document.forms[0].address[0].value,
          address2 : document.forms[0].address[1].value,
          city : document.forms[0].city.value,
          state : document.forms[0].state.value,
          zip : document.forms[0].zip.value
        };
        formData.formInput.shipping = formData.formSubmission.shipping;
        location.assign("../billing");
      }
    } else if (document.querySelector("main").id === "billing") {
      formData.formSubmission.billing = {
        country : document.forms[0].country.value,
        fullName : document.forms[0].fullname.value,
        phoneNumber : document.forms[0].telephone.value,
        address1 : document.forms[0].address[0].value,
        address2 : document.forms[0].address[1].value,
        city : document.forms[0].city.value,
        state : document.forms[0].state.value,
        zip : document.forms[0].zip.value
      };
      formData.formInput.billing = formData.formSubmission.billing;
      location.assign("../payment");
    } else {
      formData.formSubmission.payment = {
        name : document.forms[0].cardname.value,
        number : document.forms[0].cardnumber.value,
        expiry : document.forms[0].expirationdate.value,
        cvv : document.forms[0].cvv.value
      };
      formData.formInput.payment = formData.formSubmission.payment;
      location.assign("../cart");
    }
    sessionStorage.setItem("formData", JSON.stringify(formData));
  } else {
    errorlog = document.querySelectorAll("form input");
    listNode = document.querySelectorAll("form li:not(.notInput)");
    for ( i = 0; i < errorlog.length; i++) {
      if(!errorlog[i].checkValidity()){
        listNode[i].setAttribute('data-before', errorlog[i].validationMessage);
      }
    }
  }
}

function storeUserInput(element, id) {
  var formData;
  if (element.tagName !== "INPUT") {
    return;
  }
  formData = JSON.parse(sessionStorage.getItem("formData"));
  formData.formInput[id][element.id] = element.value;
  sessionStorage.setItem("formData", JSON.stringify(formData));
}

function populate(){
  var formData = JSON.parse(sessionStorage.getItem("formData"));
  var mainId = document.querySelector("main").id;
  if(mainId === "shipping") {
    document.forms[0].country.value = formData.formInput[mainId].country;
    document.forms[0].fullname.value = formData.formInput[mainId].fullName;
    document.forms[0].telephone.value = formData.formInput[mainId].phoneNumber;
    document.forms[0].address[0].value = formData.formInput[mainId].address1;
    document.forms[0].address[1].value = formData.formInput[mainId].address2;
    document.forms[0].city.value = formData.formInput[mainId].city;
    document.forms[0].state.value = formData.formInput[mainId].state;
    document.forms[0].zip.value = formData.formInput[mainId].zip;
  } else if(mainId === "billing"){// billing
    document.forms[0].country.value = formData.formInput[mainId].country;
    document.forms[0].fullname.value = formData.formInput[mainId].fullName;
    document.forms[0].telephone.value = formData.formInput[mainId].phoneNumber;
    document.forms[0].address[0].value = formData.formInput[mainId].address1;
    document.forms[0].address[1].value = formData.formInput[mainId].address2;
    document.forms[0].city.value = formData.formInput[mainId].city;
    document.forms[0].state.value = formData.formInput[mainId].state;
    document.forms[0].zip.value = formData.formInput[mainId].zip;
  } else if(mainId === "payment"){ // payment
    document.forms[0].cardname.value = formData.formInput[mainId].name;
    document.forms[0].cardnumber.value = formData.formInput[mainId].number;
    document.forms[0].expirationdate.value = formData.formInput[mainId].expiry;
    document.forms[0].cvv.value = formData.formInput[mainId].cvv;
  }
}

// toggle nav pop up
function toggletransform(){
  document.querySelector(".hide:not(button)").classList.toggle("translate");
  document.querySelector("html").classList.toggle("overflow");
}

// reset nav pop up
function transform(){
  if(document.querySelector(".hide:not(button)").classList.contains("translate")){
    toggletransform();
  }
}

document.querySelectorAll("button.hide")[0].addEventListener("click", function(){
  toggletransform();
});
document.querySelectorAll("button.hide")[1].addEventListener("click", function(){
  toggletransform();
});

populate();
transform();
if(sessionStorage.getItem("cart_selector") === null){
  sessionStorage.setItem("cart_selector", []);
}

// I have been losing track of my javascript functions. I will slowly reorder the already made functions

// Sections

// Home
if(document.querySelector("main#home") !== null) {
  makeOL(products, 'product-list', default_selector);
  main.addEventListener('click', function(event) {
    for (counte = 0; counte < document.querySelector("ol").childElementCount; counte++) {
      if ( event.target === document.querySelector("ol li:nth-of-type("+(counte+1)+") button")) {
        cartFunction(counte);
      }
    }
  });
}

// Shipping
if(document.querySelector("main#shipping") !== null) {
  main.addEventListener('change', function(event) {
    storeUserInput(event.target, document.querySelector("main").id);
  });
  main.addEventListener('click', function(event) {
    if (event.target === document.querySelector("#shipping form button")) {
      doForm(0);
      event.preventDefault();
    }
  });
}

// Billing
if(document.querySelector("main#billing") !== null) {
  if(sessionStorage.getItem("billingShippingCheck") === "true"){
    document.querySelector("#billShipCheck").checked = true;
    for ( billCount = 0; billCount < document.querySelectorAll("form ol li:not(.notInput)").length; billCount++) {
      document.querySelectorAll("form ol li:not(.notInput)")[billCount].classList.toggle("hideinp");
    }
  }
  main.addEventListener('click', function(event) {
    formDataBill = JSON.parse(sessionStorage.getItem("formData"));
    if (event.target === document.querySelector("#billing form button[type='submit']")) {
      doForm(1);
      event.preventDefault();
    }
  });
  main.addEventListener('change', function(event) {
    storeUserInput(event.target, document.querySelector("main").id);
    formDataBill = JSON.parse(sessionStorage.getItem("formData"));
    if(event.target.id === "billShipCheck"){
      if(event.target.checked && JSON.stringify(formDataBill.formSubmission.shipping) !== JSON.stringify(formDataBill.formSubmission.billing)){
        document.forms[0].country.value = formDataBill.formInput.shipping.country;
        document.forms[0].fullname.value = formDataBill.formInput.shipping.fullName;
        document.forms[0].telephone.value = formDataBill.formInput.shipping.phoneNumber;
        document.forms[0].address[0].value = formDataBill.formInput.shipping.address1;
        document.forms[0].address[1].value = formDataBill.formInput.shipping.address2;
        document.forms[0].city.value = formDataBill.formInput.shipping.city;
        document.forms[0].state.value = formDataBill.formInput.shipping.state;
        document.forms[0].zip.value = formDataBill.formInput.shipping.zip;
        sessionStorage.setItem("billingShippingCheck", "true");
        doForm(1);
      } else if(event.target.checked){
        for ( billCount = 0; billCount < document.querySelectorAll("form ol li:not(.notInput)").length; billCount++) {
          document.querySelectorAll("form ol li:not(.notInput)")[billCount].classList.toggle("hideinp");
        }
        sessionStorage.setItem("billingShippingCheck", "true");
      } else{
        for ( billCount = 0; billCount < document.querySelectorAll("form ol li:not(.notInput)").length; billCount++) {
          document.querySelectorAll("form ol li:not(.notInput)")[billCount].classList.toggle("hideinp");
        }
        sessionStorage.setItem("billingShippingCheck", "false");
      }
    }
  });
}

// Payment
if(document.querySelector("main#payment") !== null) {
  main.addEventListener('click', function(event) {
    if (event.target === document.querySelector("#payment form button")) {
      doForm(2);
      event.preventDefault();
    }
  });
  main.addEventListener('change', function(event) {
    storeUserInput(event.target, document.querySelector("main").id);
  });
}

// Cart
if(document.querySelector("main#cart") !== null) {
  formDataReset = JSON.parse(sessionStorage.getItem("formData"));
  if(formDataReset.formSubmission.shipping.country !== ""){
    formDataReset.formInput.shipping = formDataReset.formSubmission.shipping;
  }
  if(formDataReset.formSubmission.billing.country !== ""){
    formDataReset.formInput.billing = formDataReset.formSubmission.billing;
  }
  if(formDataReset.formSubmission.payment.name !== ""){
    formDataReset.formInput.payment = formDataReset.formSubmission.payment;
  }
  sessionStorage.setItem("formData", JSON.stringify(formDataReset));
  makeP("shipping-address", "shipping");
  makeP("billing-address", "billing");
  makeP("payment-info", "payment");
}
