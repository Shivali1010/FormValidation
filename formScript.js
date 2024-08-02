const nameField = document.querySelector("#name");
const addressField = document.querySelector("#address");
const ageField = document.querySelector("#age");  
const checkboxes = document.querySelectorAll("input[type='checkbox']");
const radioBtns = document.querySelectorAll("input[type='radio']");
const submit = document.querySelector("#submit-btn");

let warningMsg;

function showWarning(id, message) {
    
    warningMsg = document.querySelector(`#${id}`);
    warningMsg.innerText = message;
}

function createWarning(prevElId, msg, msgId) {

    let checkEl = document.getElementById(msgId);
    if(!checkEl) {
        let prevEl = document.querySelector(prevElId);
        const msgEl = document.createElement("p");
        msgEl.setAttribute("id", msgId);
        msgEl.innerText = msg;
        prevEl.after(msgEl);
    }
}

// function removeWarning(msgId) {
//     let checkEl = document.getElementById(msgId);
//     if(checkEl) checkEl.remove();
// }

function removeWarning(id) {
    warningMsg = document.querySelector(`#${id}`);
    warningMsg.innerText = "";
}



// nameField.addEventListener("input", (evt) => {

//     let input = evt.target.value;

//     if (input) {
//         removeWarning("no-name");
//         if (!isNameValid(input)) {
//             removeWarning("short-name");
//             createWarning("#name", "Numbers and special characters are not allowed", "invalid-name");
//         }
//         else if (input.length <= 3 || input.length > 30) {
//             removeWarning("invalid-name");
//             createWarning("#name", "Please enter 4-15 characters", "short-name");
//         }
//         else {
//             removeWarning("short-name");
//             removeWarning("invalid-name");
//         }
//     }
//     else {
//         removeWarning("short-name");
//         removeWarning("invalid-name");
//     }
       
// });

nameField.addEventListener("input", (evt) => {
    let input = evt.target.value;
    if(input) {
        // if(validateName(input) === "invalid") showWarning("name-warning", "Numbers and special characters are not allowed");
        // else removeWarning("name-warning");
        
        if(validateName(input)) {
            console.log("name-warning");
            showWarning("name-warning", "Please enter 4-30 letters");
        }
    }
    else removeWarning("name-warning");
       
});


// addressField.addEventListener("input", (evt) => {

//     let input = evt.target.value

//     if (input) {
//         removeWarning("no-address");
//         if (input.length < 10 || input.length > 100) {
//             createWarning("#address", "Please enter 10-100 characters", "invalid-address");
//         }
//         else {
//             removeWarning("invalid-address");
//         }
//     }
//     else {
//         removeWarning("invalid-address");
//     }


// });

addressField.addEventListener("input", (evt) => {
    let input = evt.target.value;
    if(input) {
        if(!validateAddress(input)) showWarning("address-warning", "Please enter 10-100 characters");
    }
    
});


ageField.addEventListener("input", (evt) => {

    let input = evt.target.value;

    if (input) {
        removeWarning("no-age");
        if (input < 16) {
            createWarning("#age", "Age should be more than 16 years", "invalid-age");
        }
        else {
            removeWarning("invalid-age");
        }
    }
    else {
        removeWarning("invalid-age");
    }

});

for(box of checkboxes) {
    box.addEventListener("change", (evt) => {
        if(evt.target.checked) {
            removeWarning("no-hobby");
        }
        else if(isSubmit) {
            createWarning("#hobby-options", "Please select at least one hobby", "no-hobby");
        }
    });
}


for(btn of radioBtns) {
    btn.addEventListener("change", (evt) => {
        if(evt.target.checked) {
            removeWarning("no-gender");
        }
        // else if(isSubmit) {
        //     createWarning("#gender-options", "Please select your gender", "no-gender");
        // }
    });
}

function validateName(name) {
    let regex = /^[a-zA-Z]+$/;

    if(!regex.test(name)) {
        console.log("invalid");
        return "invalid";
    }   
    else if(name.length <= 3 && name.length > 30) {
        console.log("out of range");
        return true;
    }
}

function validateAddress(address) {
    if(address >= 10 && address <= 100) return true;
}

function validateAge(age) {
    if(age > 16) return true;
}

function validateCheckbox() {
    let selCheckbox = document.querySelector("input[name='hobby']:checked");
    if(selCheckbox) return true;
    return false;
}

function validateRadio() {
    let selRadio = document.querySelector("input[name='gender']:checked");
    if(selRadio) return true;
    return false;
}








let isSubmit;
submit.addEventListener("click", (evt) => {
   
    
    if(!(validateCheckbox() && validateRadio() && nameField.value && addressField.value && ageField.value)) {
        isSubmit = true;
        evt.preventDefault();

        if(!nameField.value) createWarning("#name", "Please enter your name", "no-name");
        
        if(!addressField.value) createWarning("#address", "Please enter your address", "no-address");
        
        if(!validateCheckbox()) createWarning("#hobby-options", "Please select at least one hobby", "no-hobby");
       
        if(!validateRadio()) createWarning("#gender-options", "Please select your gender", "no-gender");
        
        if(!ageField.value) createWarning("#age", "Please enter your age", "no-age");
        
    }
});