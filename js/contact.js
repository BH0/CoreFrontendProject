
console.log("Contact Form Script running");

function invalidInput() {
    var invalidCharCount = "Please use more characters.";
    var output = document.createElement("p");

    output.style.color = "red";
    output.innerHTML = invalidCharCount;
    document.getElementById("form-output").appendChild(output);
    // alert("Form submitted");
}

function successfulValidation() {
    var successOutput = "Thankyou for contacting us.";
    var output = document.createElement("p");

    output.style.color = "green";
    output.innerHTML = successOutput;
    document.getElementById("form-output").appendChild(output);
    // Pause / Delay form-submission so user can see output
}

function validateForm() {
    var name = document.forms["contactForm"]["contactName"].value;
    var email = document.forms["contactForm"]["emailAddress"].value;

    var minCharNum = 2;

    if (name == null || name == "" || name.length < minCharNum
    && email == null || email == "" || email.length < minCharNum) {
        invalidInput();
        return false;
    } else {
        var invalidCharCount = "Thanks.";
        var output = document.createElement("p");

        output.style.color = "green";
        output.innerHTML = invalidCharCount;
        document.getElementById("form-output").appendChild(output);
    }
}
