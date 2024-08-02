const nameField = document.querySelector("#name");
const addressField = document.querySelector("#address");
const ageField = document.querySelector("#age");  
const checkboxes = document.querySelectorAll("input[type='checkbox']");
const radioBtns = document.querySelectorAll("input[type='radio']");
const submit = document.querySelector("#submit-btn");

let warningMsg;
let isSubmit;

function showWarning(id, message) {
    warningMsg = document.querySelector(`#${id}`);
    warningMsg.innerHTML = message;
}

function removeWarning(id) {
    warningMsg = document.querySelector(`#${id}`);
    warningMsg.innerText = "";
}

nameField.addEventListener("input", (evt) => {
    let input = evt.target.value;
    validateName(input);    
});

addressField.addEventListener("input", (evt) => {
    let input = evt.target.value;
    validateAddress(input);
});

ageField.addEventListener("input", (evt) => {
    let input = evt.target.value;
    validateAge(input); 
});

for(box of checkboxes) {
    box.addEventListener("change", (evt) => {
        validateCheckbox();
    });
}

for(btn of radioBtns) {
    btn.addEventListener("change", (evt) => {
        validateRadio();
    });
}

function validateName(name) {
    let regex = /^[a-zA-Z]+$/;
    if(name) {
        if(!regex.test(name)) showWarning("name-warning", "Numbers and special characters are not allowed");  
        else if(name.length <= 3 || name.length > 30) showWarning("name-warning", "Please enter 4-30 letters");
        else {
            removeWarning("name-warning");
            return true;
        }
    }
    else if(isSubmit) showWarning("name-warning", "Please enter your name");
    else removeWarning("name-warning");
    
}

function validateAddress(address) {
    if(address && (address.length < 10 || address.length > 100)) showWarning("address-warning", "Please enter 10-100 characters");
    else if(!address && isSubmit) showWarning("address-warning", "Please enter your address");
    else {
        removeWarning("address-warning");
        return true;
    }
}

function validateAge(age) {
    if(age && age < 16) showWarning("age-warning", "Age should be more than 16 years");
    else if(!age && isSubmit) showWarning("age-warning", "Please enter your age");
    else {
        removeWarning("age-warning");
        return true;
    }
}

function validateCheckbox() {
    let selCheckbox = document.querySelector("input[name='hobby']:checked");
    if(!selCheckbox && isSubmit) showWarning("hobby-warning", "Please select at least one hobby");
    else {
        removeWarning("hobby-warning");
        return true;
    }
}

function validateRadio() {
    let selRadio = document.querySelector("input[name='gender']:checked");
    if(!selRadio && isSubmit) showWarning("gender-warning", "Please select your gender");
    else {
        removeWarning("gender-warning");
        return true;
    }
}

submit.addEventListener("click", (evt) => {

    isSubmit = true;
    let isNameValid = validateName(nameField.value);
    let isAddressValid = validateAddress(addressField.value);
    let isAgeValid = validateAge(ageField.value);
    let isHobbyValid = validateCheckbox();
    let isGenderValid = validateRadio();
    
    if(!(isNameValid && isAddressValid && isAgeValid && isHobbyValid && isGenderValid)) evt.preventDefault();
});