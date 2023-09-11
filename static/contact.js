const nameInput = document.querySelector('input[name="name"]');
const email = document.querySelector('input[name="email"]');
const message = document.querySelector('textarea[name="message"]');

window.onload = validateForm();

function validateForm() {
    nameInput.addEventListener('input', () => {
        if (nameInput.value.length > 0) {
            nameInput.style.border = '2px solid #242424';
        } else {
            nameInput.style.border = '2px solid #FA5B5B';

        }
    });

    email.addEventListener('input', () => {
        if (email.value.length > 0) {
            email.style.border = '2px solid #242424';
        } else {
            email.style.border = '2px solid #FA5B5B';
        }
    });

    message.addEventListener('input', () => {
        if (message.value.length > 0) {
            message.style.border = '2px solid #242424';
        } else {
            message.style.border = '2px solid #FA5B5B';
        }
    });
}

function checkForm() {
    if (nameInput.value.length > 0 && email.value.length > 0 && message.value.length > 0) {
        // Send a POST request to the server with the form data in JSON
        const xhr = new XMLHttpRequest();
        xhr.open('POST', 'https://contact.pkrm.dev', true);
        xhr.setRequestHeader("Content-Type", "application/json; charset=UTF-8");

        const body = JSON.stringify({
            name: nameInput.value,
            email: email.value,
            message: message.value
        });
        xhr.onload = () => {
            const response = document.querySelector('.response');
            if (xhr.status == 200) {
                response.innerHTML = 'Thank you for submitting your message. I will get back to you as soon as possible.';
                response.style.visibility = 'visible';
                response.style.color = "#73C276"
                nameInput.value = '';
                email.value = '';
                message.value = '';
            } else {
                response.innerHTML = "Sorry, there was an error when submitting your message. Please try again later.";
                response.style.visibility = 'visible';
                response.style.color = "#FA5B5B"
            }
        };
        xhr.send(body);

    } else {
        if (nameInput.value.length == 0) {
            nameInput.style.border = '2px solid #FA5B5B';
        }

        if (email.value.length == 0) {
            email.style.border = '2px solid #FA5B5B';
        }

        if (message.value.length == 0) {
            message.style.border = '2px solid #FA5B5B';
        }
    }
}