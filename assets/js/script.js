var regexRestrictSpecialChar = /^[a-zA-Z0-9]*([ ][a-zA-Z0-9]*)*$/;

const restrictSpecialCharacters = (event) => {
  // don't allow to type special chars
  var input = event.target.value;
  var isValid = regexRestrictSpecialChar.test(input);
  if (!isValid) {
    event.target.value = input.replace(/[^a-zA-Z0-9]/g, (input) =>
      input === " " ? input : ""
    );
  }
};

const restrictNonNumeric = (event) => {
  var input = event.target;
  var inputValue = input.value;
  var sanitizedValue = inputValue.replace(/\D/g, "");
  if (inputValue !== sanitizedValue) {
    input.value = sanitizedValue;
    return false;
  }
  return true;
};

const validateEmailOnTyping = (event) => {
  var input = event.target;
  var inputValue = input.value;
  var isValid = validateEmail(inputValue);

  if (isValid) {
    // Input is a valid email address
    input.classList.remove("border-danger");
  } else {
    // Input is not a valid email address
    input.classList.add("border-danger");
  }
};
// validate on submit
const validateSpecialChar = (value) => regexRestrictSpecialChar.test(value);
const validateNonNumeric = (value) => /^\d+$/.test(value);
const validateEmail = (email) => {
  var regex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  return regex.test(email);
};

// input field ID's
const input_first_party = document.getElementById("first_party");
const input_second_party = document.getElementById("second_party");
const input_article = document.getElementById("article");
const input_description = document.getElementById("description");
const input_paid_by = document.getElementById("paid_by");
const input_stamp_amount = document.getElementById("stamp_amount");
const input_qty = document.getElementById("qty");
const input_phone = document.getElementById("phone");
const input_email = document.getElementById("email");

// error fields ID's
// input field ID's
const err_first_party = document.getElementById("err_first_party");
const err_second_party = document.getElementById("err_second_party");
const err_article = document.getElementById("err_article");
const err_description = document.getElementById("err_description");
const err_paid_by = document.getElementById("err_paid_by");
const err_stamp_amount = document.getElementById("err_stamp_amount");
const err_qty = document.getElementById("err_qty");
const err_phone = document.getElementById("err_phone");
const err_email = document.getElementById("err_email");

const form = document.getElementById("eStampForm");

const DO_NOT_ENTER_SPECIAL = "Do not enter special characters";
const validateForm = (event) => {
  event.preventDefault();

  // input fields
  const first_party = input_first_party.value;
  const second_party = input_second_party.value;
  const article = input_article.value;
  const description = input_description.value;
  const paid_by = input_paid_by.value;
  const stamp_amount = input_stamp_amount.value;
  const qty = input_qty.value;
  const phone = input_phone.value;
  const email = input_email.value;

  // first party validation
  if (first_party === "") {
    addError(input_first_party, err_first_party);
    return false;
  } else if (first_party && !validateSpecialChar(first_party)) {
    addError(input_first_party, err_first_party, DO_NOT_ENTER_SPECIAL);
    return false;
  } else {
    removeError(input_first_party, err_first_party);
  }
  // second party validation
  if (second_party === "") {
    addError(
      input_second_party,
      err_second_party,
      "Required field if not applicable please enter NA "
    );
    return false;
  } else if (second_party && !validateSpecialChar(second_party)) {
    addError(input_second_party, err_second_party, DO_NOT_ENTER_SPECIAL);
    return false;
  } else {
    removeError(input_second_party, err_second_party);
  }

  // article validation
  if (article === "") {
    addError(input_article, err_article);
    return false;
  } else {
    removeError(input_article, err_article);
  }

  // description validation
  if (description === "") {
    addError(input_description, err_description);
    return false;
  } else {
    removeError(input_description, err_description);
  }

  // paid by validation
  if (paid_by === "") {
    addError(input_paid_by, err_paid_by);
    return false;
  } else if (paid_by && !validateSpecialChar(paid_by)) {
    addError(input_paid_by, err_paid_by, DO_NOT_ENTER_SPECIAL);
    return false;
  } else {
    removeError(input_paid_by, err_paid_by);
  }

  // stamp amount validation
  if (stamp_amount === "") {
    addError(input_stamp_amount, err_stamp_amount);
    return false;
  } else if (stamp_amount && !validateNonNumeric(stamp_amount)) {
    addError(input_stamp_amount, err_stamp_amount, "Use only 0-9");
    return false;
  } else if (
    stamp_amount &&
    validateNonNumeric(stamp_amount) &&
    stamp_amount < 10
  ) {
    addError(
      input_stamp_amount,
      err_stamp_amount,
      "Enter minimum amount of Rs 10"
    );
    return false;
  } else {
    removeError(input_stamp_amount, err_stamp_amount);
  }

  // qty validation
  if (qty === "" || qty < 1) {
    addError(input_qty, err_qty);
    return false;
  } else if (qty && !validateNonNumeric(qty)) {
    addError(input_qty, err_qty, "Use only 0-9");
    return false;
  } else {
    removeError(input_qty, err_qty);
  }

  // phone validation
  if (phone === "") {
    addError(input_phone, err_phone);
    return false;
  } else if (phone && !validateNonNumeric(phone)) {
    addError(input_phone, err_phone, "Use only 0-9");
    return false;
  } else if (
    phone &&
    validateNonNumeric(phone) &&
    (phone.length < 10 || phone.length > 10)
  ) {
    addError(input_phone, err_phone, "Enter valid 10 digit phone number");
    return false;
  } else {
    removeError(input_phone, err_phone);
  }

  // email validation
  if (email === "") {
    addError(input_email, err_email);
    return false;
  } else if (email && !validateEmail(email)) {
    addError(input_email, err_email, "Enter a valid email address");
    return false;
  } else {
    removeError(input_email, err_email);
  }

  form.submit();
  form.reset();
  return true; // form can submit now
};

const addError = (input, label, msg = "") => {
  input.focus();
  input.classList.add("border-danger");
  label.style.display = "block";
  label.textContent = msg || "Required field";
};

const removeError = (input, label, msg = "") => {
  input.classList.remove("border-danger");
  label.style.display = "none";
  label.textContent = msg;
};

$(document).ready(() => {
  $(".article-select").select2();
  console.log("docuemtn ready... !");
});

//video clip
// Get the modal

