const form = document.getElementById("contact-form");
const successMessage = document.getElementById("success");

const fields = {
  name: document.getElementById("name"),
  email: document.getElementById("email"),
  message: document.getElementById("message"),
};

form.noValidate = true;

function getOrCreateErrorElement(field) {
  const currentError = field.nextElementSibling;

  if (currentError && currentError.classList.contains("field-error")) {
    return currentError;
  }

  const errorElement = document.createElement("small");
  errorElement.className = "field-error";
  errorElement.style.color = "#b91c1c";
  errorElement.style.textAlign = "left";
  errorElement.style.display = "none";
  field.insertAdjacentElement("afterend", errorElement);

  return errorElement;
}

function showFieldError(field, message) {
  const errorElement = getOrCreateErrorElement(field);
  errorElement.textContent = message;
  errorElement.style.display = "block";
  field.style.borderColor = "#b91c1c";
}

function clearFieldError(field) {
  const errorElement = getOrCreateErrorElement(field);
  errorElement.textContent = "";
  errorElement.style.display = "none";
  field.style.borderColor = "";
}

function validateName(value) {
  const trimmedValue = value.trim();

  if (!trimmedValue) {
    return "Informe seu nome.";
  }

  if (trimmedValue.length < 3) {
    return "O nome deve ter pelo menos 3 caracteres.";
  }

  return "";
}

function validateEmail(value) {
  const trimmedValue = value.trim();
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

  if (!trimmedValue) {
    return "Informe seu email.";
  }

  if (!emailRegex.test(trimmedValue)) {
    return "Digite um email valido.";
  }

  return "";
}

function validateMessage(value) {
  const trimmedValue = value.trim();

  if (!trimmedValue) {
    return "Escreva uma mensagem.";
  }

  if (trimmedValue.length < 10) {
    return "A mensagem deve ter pelo menos 10 caracteres.";
  }

  return "";
}

function validateField(fieldName) {
  let error = "";

  if (fieldName === "name") {
    error = validateName(fields.name.value);
  }

  if (fieldName === "email") {
    error = validateEmail(fields.email.value);
  }

  if (fieldName === "message") {
    error = validateMessage(fields.message.value);
  }

  if (error) {
    showFieldError(fields[fieldName], error);
    return false;
  }

  clearFieldError(fields[fieldName]);
  return true;
}

Object.keys(fields).forEach(function (fieldName) {
  const field = fields[fieldName];

  field.addEventListener("input", function () {
    validateField(fieldName);
  });

  field.addEventListener("blur", function () {
    validateField(fieldName);
  });
});

form.addEventListener("submit", function (event) {
  event.preventDefault();

  const isNameValid = validateField("name");
  const isEmailValid = validateField("email");
  const isMessageValid = validateField("message");
  const isFormValid = isNameValid && isEmailValid && isMessageValid;

  if (!isFormValid) {
    successMessage.classList.add("hidden");
    return;
  }

  console.log("Nome:", fields.name.value.trim());
  console.log("Email:", fields.email.value.trim());
  console.log("Mensagem:", fields.message.value.trim());

  form.reset();
  Object.keys(fields).forEach(function (fieldName) {
    clearFieldError(fields[fieldName]);
  });

  successMessage.classList.remove("hidden");
  setTimeout(function () {
    successMessage.classList.add("hidden");
  }, 3000);
});
