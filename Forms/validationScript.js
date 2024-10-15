// JavaScript code for form validation

// Retrieve the input field element and its value, and then automatically
// focus on the input field when the page loads.
let inputField = document.getElementById("inputField");
onload = () => {
  inputField.focus();
}

// Reference the form and attach the event listener to submit the form
let myForm = document.getElementById("myForm");
myForm.addEventListener("submit", validateAlphaNum);

// Clears error message when user starts typing again
inputField.addEventListener("input", () => {
  inputField.setCustomValidity("");
})

function validateAlphaNum(event) {
  // Regular expression pattern for alphanumeric input
  let alphanumRegex = /^[a-zA-Z0-9]+$/;

  // Retrieve value of inputField to test with our regular expression
  let myInput = inputField.value;

  // Check if the input value matches the pattern
  if (alphanumRegex.test(myInput)) {
    // Valid input: Clear any error messages and submit the form
    inputField.setCustomValidity("");

    // Display success message
    alert("Thank you for your submission :)")

    // Submit the form
    myForm.submit();
  } else {
    // Invalid input: display error message and prevent form from submitting
    inputField.setCustomValidity("Please enter valid numbers or letters.");
    inputField.reportValidity();
    event.preventDefault();
  }
}
