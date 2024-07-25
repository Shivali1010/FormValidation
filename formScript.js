const nameField = document.querySelector("#name");
const addressField = document.querySelector("#address");
const ageField = document.querySelector("#age");  
const checkboxes = document.querySelectorAll(".checkbox");
const radioBtns = document.querySelectorAll("input[type='radio']");
const submit = document.querySelector("#submit-btn");


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

function removeWarning(msgId) {
    let checkEl = document.getElementById(msgId);
    if(checkEl) checkEl.remove();
}

function isNameValid(inputName) {
    let regex = /^[a-zA-Z]+$/;
    return regex.test(inputName);
}

let timeOutId;

nameField.addEventListener("input", (evt) => {

    clearTimeout(timeOutId);
    let input = evt.target.value;
    timeOutId = setTimeout(() => {

        if(input) {
            removeWarning("no-name");
            if(!isNameValid(input)) {
                removeWarning("short-name");
                createWarning("#name", "Numbers and special characters are not allowed", "invalid-name");
            }
            else if(input.length <= 3 || input.length > 30) {
                removeWarning("invalid-name");
                createWarning("#name", "Please enter 4-15 characters", "short-name");
            }
            else {
                removeWarning("short-name");
                removeWarning("invalid-name");
            }
        }
        else {
            removeWarning("short-name");
            removeWarning("invalid-name");
        }
       
    }, 800);

});

addressField.addEventListener("input", (evt) => {

    clearTimeout(timeOutId);
    let input = evt.target.value;
    timeOutId = setTimeout(() => {

        if(input) {
            removeWarning("no-address");
            if(input.length < 10 || input.length > 100) {
                createWarning("#address", "Please enter 10-100 characters", "invalid-address");
            }
            else {
                removeWarning("invalid-address");
            }
        }
        else {
            removeWarning("invalid-address");
        }
       
    }, 800);

});


ageField.addEventListener("input", (evt) => {

    clearTimeout(timeOutId);
    let input = evt.target.value;
    timeOutId = setTimeout(() => {

        if(input) {
            removeWarning("no-age");
            if(input < 16) {
                createWarning("#age", "Age should be more than 16 years", "invalid-age");
            }
            else {
                removeWarning("invalid-age");
            }
        }
        else {
            removeWarning("invalid-age");
        }

    }, 800);

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

function validateCheckbox() {
    let isChecked;
    let final = 0;
    for(box of checkboxes) {
        isChecked = box.checked;
        final = final || isChecked;
    }
    return final;
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
function validateRadio() {
    let selRadio = document.querySelector('input[name="gender"]:checked');
    if(selRadio) {
        return true;
    }
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