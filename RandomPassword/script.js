document.addEventListener("DOMContentLoaded", function () {
    const generateButton = document.getElementById("generate-btn");
    const passwordDisplay = document.getElementById("password-output");
    const lengthInput = document.getElementById("length");
    const uppercaseCheckbox = document.getElementById("include-uppercase");
    const lowercaseCheckbox = document.getElementById("include-lowercase");
    const numbersCheckbox = document.getElementById("include-numbers");
    const symbolsCheckbox = document.getElementById("include-symbols");
    const copyButton = document.getElementById("copyButton");

    function generatePassword() { 
        const length = parseInt(lengthInput.value);
        const useUppercase = uppercaseCheckbox.checked;
        const useLowercase = lowercaseCheckbox.checked;
        const useNumbers = numbersCheckbox.checked;
        const useSymbols = symbolsCheckbox.checked;
        const uppercaseChars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
        const lowercaseChars = "abcdefghijklmnopqrstuvwxyz";
        const numberChars = "0123456789";
        const symbolChars = "!@#$%^&*()_+~`|}{[]:;?><,./-=";
        let allChars = "";
        let password = "";
        if (useUppercase) allChars += uppercaseChars;
        if (useLowercase) allChars += lowercaseChars;
        if (useNumbers) allChars += numberChars;
        if (useSymbols) allChars += symbolChars;    
        if (allChars === "") {
            alert("Please select at least one character type.");
            return;
        }
        for (let i = 0; i < length; i++) {
            const randomIndex = Math.floor(Math.random() * allChars.length);
            password += allChars[randomIndex];
        }
        passwordDisplay.value = password;
    }   
    function copyPassword() {
        const password = passwordDisplay.value;
        if (!password) {
            alert("No password to copy!");
            return;
        }
        navigator.clipboard.writeText(password).then(() => {
            alert("Password copied to clipboard!");
        }).catch(err => {
            alert("Failed to copy password: " + err);
        });
    }
    generateButton.addEventListener("click", generatePassword);
    // copyButton.addEventListener("click", copyPassword);
});
