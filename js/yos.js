const countdown = (() => {
  // Set the date we're counting down to
  const countDownDate = new Date("May 1, 2021 23:59:00").getTime();

  // Update the count down every 1 second
  const x = setInterval(function() {

    // Get today's date and time
    const now = new Date().getTime();

    // Find the distance between now and the count down date
    const distance = countDownDate - now;

    // Time calculations for days, hours, minutes and seconds
    const days = Math.floor(distance / (1000 * 60 * 60 * 24));
    const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((distance % (1000 * 60)) / 1000);

    // Output the result
    document.getElementById('cs-days').innerHTML = days;
    document.getElementById('cs-hours').innerHTML = hours;
    document.getElementById('cs-minutes').innerHTML = minutes;
    document.getElementById('cs-seconds').innerHTML = seconds;

    // when countdown is over
    if (distance < 0) {
      clearInterval(x);
      document.getElementById("application-deadline").innerHTML = "EXPIRED";
    }
  }, 1000);
})();

const contactContainer = document.querySelector('#contact');
const submitBtn = document.getElementById('contact-submit');
const emailTooltip = document.querySelector('.tooltp-email');
const nameTooltip = document.querySelector('.tooltp-name');
const numberTooltip = document.querySelector('.tooltp-number');
const messageTooltip = document.querySelector('.tooltp-message');
const spinner = document.querySelector('.spinner');
const form = document.getElementById('contact');
const resultHeader = document.getElementById('exampleModalLabel');
const resultMesssage = document.getElementById('form-outcome');

let formUserName;
let formUserEmail;
let formUserPhone;
let formUserMessage;

const clearToolTips = () => {
  // reset tooltips
  emailTooltip.classList.add('d-none');
  nameTooltip.classList.add('d-none');
  numberTooltip.classList.add('d-none');
  messageTooltip.classList.add('d-none');
};


const validate = (email, nm, phone, message) => {
  clearToolTips();
  const validateEmail = () => {
    const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if (!re.test(String(email).toLowerCase())) {
      emailTooltip.textContent = '*enter valid email address';
      emailTooltip.classList.remove('d-none');
      return false;
    }

    return true;
  };

  const validateName = () => {
    const re = /^[a-zA-Z,. -]{2,40}$/;
    if (!re.test(nm)) {
      nameTooltip.textContent = '*must be 2-40 characters & only (.,-) symbols allowed';
      nameTooltip.classList.remove('d-none');
      return false;
    }

    return true;
  };

  const validateNumber = () => {
    const re =/^\+?[0-9]{1}[0-9]{3,14}$/im;
    if(!re.test(phone)) {
      numberTooltip.textContent = '*enter valid phone number';
      numberTooltip.classList.remove('d-none');
      return false;
    }

    return true;
  };

  const validateMessage = () => {
    if(message.length < 1) {
      messageTooltip.textContent = '*message box cannot be empty';
      messageTooltip.classList.remove('d-none');
      return false;
    }

    return true;
  };

  const emailisValid = validateEmail();
  const nameisValid = validateName();
  const numberisValid = validateNumber();
  const messageisValid = validateMessage();
  if (emailisValid && nameisValid && numberisValid && messageisValid) { return true; }
  return false;
};

const revealModal = () => $('#exampleModal').modal('show');

const submitForm = () => {
  const XHR = new XMLHttpRequest();
  const FD = new FormData(form);

  const send = () => {
    // set up request
    XHR.open('POST', 'https://formspree.io/f/mgepjkrk');
    XHR.setRequestHeader('Accept', 'application/json');

    // send data
    XHR.send(FD);
  };

  // succesful
  XHR.addEventListener('load', () => {
    // what should happen
    resultHeader.textContent = 'Messent Sent!!!';
    resultMesssage.textContent = 'Your message have been delievered. We will reach out to you as soon possible.';
    revealModal();
    spinner.classList.add('d-none');
    form.reset();
  });

  // unsuccesful
  XHR.addEventListener('error', () => {
    // what should happen
    resultHeader.textContent = 'Ooops!';
    resultMesssage.textContent = 'Sorry, Your message could not be delievered. Please try again or send us an email at nkhangfieduc@gmail.com';
  });

  send();
};

submitBtn.addEventListener('click', (e) => {
  e.preventDefault();

  formUserName = document.getElementById('name').value;
  formUserEmail = document.getElementById('email').value;
  formUserMessage = document.getElementById('message').value;
  formUserPhone = document.getElementById('phone').value;

  if (validate(formUserEmail, formUserName, formUserPhone, formUserMessage)) {
    spinner.classList.remove('d-none');
    submitForm();
  }
});