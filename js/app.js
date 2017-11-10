
document.addEventListener('DOMContentLoaded', () => {
//define gloabl variables for this app
let total = 0;
let activities = document.querySelector(".activities");
let div = document.createElement('div');
let form = document.getElementsByTagName('form')[0];
const creditCard = document.getElementById('credit-card');
const emailField = document.getElementById('mail');
const nameField = document.getElementById('name');
const ccField = document.getElementById('cc-num');
const zipField = document.getElementById('zip');
const cvvField = document.getElementById('cvv');

//OTHER JOB ROLE CONTROL
//function for hiding the "Your job role" text field and if statement for activating it when 'Other' is chosen in the Job role menu
function hideField() {
    let jobRoleTitle = document.getElementById('title');
    let otherTitle = document.getElementById('other-title');
    otherTitle.style.display = 'none';
    jobRoleTitle.addEventListener('change',(e)=>{
      let jobRoleTitle_name = jobRoleTitle.options[jobRoleTitle.selectedIndex].value;
      if(jobRoleTitle_name === 'other') {
      otherTitle.style.display = '';
    } else {
      otherTitle.style.display = 'none';
    }
  });
}

//T-SHIRT THEME AND COLOR OPTIONS CONTROL
//function for hiding all Color options until a theme is selected and showing colors according to theme
function showColorOptions() {
  let design = document.getElementById('design');
  let colorsDiv = document.getElementById('colors-js-puns');
  let colors = document.getElementById('color');
  colorsDiv.style.display = "none";
    design.addEventListener('change', function() {
        colorsDiv.style.display = "";
      if(design.value === 'js puns') {
      	colors.innerHTML = '<option value="cornflowerblue">Cornflower Blue</option>' + '<option value="darkslategrey">Dark Slate Grey</option>' + '<option value="gold">Gold</option>';
    } else if (design.value === 'heart js') {
      	colors.innerHTML ='<option value="tomato">Tomato</option>' + '<option value="steelblue">Steel Blue</option>' + '<option value="dimgrey">Dim Grey</option>';
    } else {
     	colorsDiv.style.display = "none";
  }
    });
  }

//ACTIVITIES CONTROL
//function to call the updateTotal function whenever activities are changed AND to inactivate clashing events
function activityBrains() {
  const jsFW = document.querySelector("input[name ='js-frameworks']");
  const express = document.querySelector("input[name ='express']");
  const jsLibs = document.querySelector("input[name ='js-libs']");
  const node = document.querySelector("input[name ='node']");
  const buildTools = document.querySelector("input[name ='build-tools']");
  const npm = document.querySelector("input[name ='npm']");
  activities.addEventListener('change', (e) => {
    const checkbox = event.target;
    const checked = checkbox.checked;
    if(checked && checkbox.name == "all") {
      total += 200;
      updateTotal(total);
    } else if (checked && checkbox.name == "js-frameworks") {
        total += 100;
        updateTotal(total);
        express.disabled = true;
        parent = express.parentNode;
        parent.setAttribute('class', 'clash');
    } else if (checked == false && checkbox.name == "js-frameworks") {
        total -= 100;
        updateTotal(total);
        express.disabled = false;
        parent = express.parentNode;
        parent.removeAttribute("class");
    } else if (checked && checkbox.name == "express") {
        total += 100;
        updateTotal(total);
        jsFW.disabled = true;
        parent = jsFW.parentNode;
        parent.setAttribute('class', 'clash');
    } else if (checked == false && checkbox.name == "express") {
        total -= 100;
        updateTotal(total);
        jsFW.disabled = false;
        parent = jsFW.parentNode;
        parent.removeAttribute("class");
    } else if (checked && checkbox.name == "js-libs") {
        total += 100;
        updateTotal(total);
        node.disabled = true;
        parent = node.parentNode;
        parent.setAttribute('class', 'clash');
    } else if (checked == false && checkbox.name == "js-libs") {
        total -= 100;
        updateTotal(total);
        node.disabled = false;
        parent = node.parentNode;
        parent.removeAttribute("class");
    } else if (checked && checkbox.name == "node") {
        total += 100;
        updateTotal(total);
        jsLibs.disabled = true;
        parent = jsLibs.parentNode;
        parent.setAttribute('class', 'clash');
    } else if (checked == false && checkbox.name == "node") {
        total -= 100;
        updateTotal(total);
        jsLibs.disabled = false;
        parent = jsLibs.parentNode;
        parent.removeAttribute("class");
    }  else if (checked == false && checkbox.name == "all") {
        total -= 200;
        updateTotal(total);
    } else if (checked) {
        total += 100;
        updateTotal(total);
    } else {
        total -= 100;
        updateTotal(total);
    } if (checked == false && total == 0) {
        div.setAttribute('class', 'errorText');
    } else {
        div.removeAttribute('class');
    }
  })
}

//function for updating the total sum
function updateTotal(total) {
  div.innerHTML = '<h3>' + 'Total : ' + total + '</h3>';
  activities.appendChild(div);
}

//PAYMENT METHOD CONTROL
//function for showing payment content according to chosen payment method
function showPaymentDetails() {
  let payment = document.getElementById('payment');
  let paypal = document.getElementById('paypal');
  let bitcoin = document.getElementById('bitcoin');
  paypal.style.display = "none";
  bitcoin.style.display = "none";
  payment.addEventListener('change', function() {
    if(payment.value === 'paypal') {
      creditCard.style.display = "none";
      paypal.style.display = "";
      bitcoin.style.display = "none";
    } else if (payment.value === 'bitcoin'){
        creditCard.style.display = "none";
        paypal.style.display = "none";
        bitcoin.style.display = "";
    } else {
        creditCard.style.display = "";
        paypal.style.display = "none";
        bitcoin.style.display = "none";
    }
  });
}

//FORMVALIDATION
//validate name field
function validateName() {
    if (nameField.value.trim().length > 0) {
      return true;
    } else {
      return false;
    }
}

//validate email field
function validateEmail() {
    var filter = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;
    if (filter.test(emailField.value)) {
      return true;
    } else {
    return false;
 }
}

//control that at least one checkbox(activity) is checked
function validateActivity() {
    if (total > 0){
      return true;
    } else {
      return false;
    }
}

//control for chosen payment method, is credit card is chosen
function ccActive() {
  if (creditCard.style.display === 'none') {
  return false;
  } else {
  return true;
  }
}

//if credit card is chosen, validate credit card number
function validateCcNumber() {
  if (!ccActive()) {
    return true;
  } else if (ccActive() && !isNaN(ccField.value) && ccField.value.length >= 13 && ccField.value.length <= 16) {
  return true;
  } else {
  return false;
  }
}

//if credit card is chosen, validate ZIP information
function validateZip() {
  if(!ccActive()) {
    return true;
  } else if (ccActive() && !isNaN(zipField.value) && zipField.value.length === 5) {
  return true;
  } else {
  return false;
  }
}

//if credit card is chosen, validate CVV number
function validateCvv() {
  if(!ccActive()) {
    return true;
  } else if (ccActive() && !isNaN(cvvField.value) && cvvField.value.length === 3) {
  return true;
  } else {
  return false;
  }
}

//call validation functions when the user leaves the field
form.addEventListener("focusout", () => {
      if (event.target == nameField && !validateName()) {
        activateError();
      } else if (event.target == emailField && !validateEmail()) {
        activateError();
      } else if (event.target == ccField && !validateCcNumber()) {
        activateError();
      } else if (event.target == zipField && !validateZip())  {
        activateError();
      } else if (event.target == cvvField && !validateCvv())  {
        activateError();
      } else {
        event.target.removeAttribute("class");
      }
    })

//function for adding red field borders on validation error
function activateError() {
  event.target.setAttribute('class', 'errorColor');
}

//function for validating all necessary fields on call
function formValidation() {
    if (validateName() && validateEmail() && validateActivity() && validateCcNumber() && validateZip() && validateCvv()) {
      return true;
    }  else {
      return false;
    }
  }

//on submit, call the formValidation function - can the form be submitted? if not, validate all fields to be marked red if the input is invalid
form.addEventListener('submit', () => {
  if (formValidation()) {
    alert('Thank you for your registeration, see you soon!');
  } else if (!formValidation()) {
    alert('Oups! Some information is missing or incorrect. Any incorrect fields will be marked with red. You also need to select at least one activity to participate in.');
    event.preventDefault();
  }
  if (!validateName()) {
    nameField.setAttribute('class', 'errorColor');
  }
  if (!validateEmail()) {
    emailField.setAttribute('class', 'errorColor');
  }
  if (!validateCcNumber()) {
    ccField.setAttribute('class', 'errorColor');
  }
  if (!validateZip())  {
    zipField.setAttribute('class', 'errorColor');
  }
  if (!validateCvv())  {
    cvvField.setAttribute('class', 'errorColor');
  }
  if (total < 100) {
    div.innerHTML = '<h3>' + 'Total : ' + total + '</h3>';
    activities.appendChild(div);
    div.setAttribute('class', 'errorText');
  }
})

// on load add the cursor in the name field and call the funcions to hide some of the fields or options
window.onload = function() {
  let input = document.getElementById('name').focus();
  hideField();
  showColorOptions();
  showPaymentDetails();
  activityBrains();
}

})
