const formElement = document.getElementById('form');
const nameErrorElement = document.getElementById('name-error');
const numberErrorElement = document.getElementById('number-error');
const monthErrorElement = document.getElementById('month-error');
const yearErrorElement = document.getElementById('year-error');
const cvcErrorElement = document.getElementById('cvc-error');

const formInitialValues = {
  name: 'Jane Appleseed',
  number: '1234 5678 9123 0000',
  month: '00',
  year: '00',
  cvc: '123'
};

const formValues = {
  name: '',
  number: '',
  month: '',
  year: '',
  cvc: ''
};

const formKeys = ['name', 'number', 'month', 'year', 'cvc'];

const formatCreditCardNumber = cardNumber => {
  const formattedCreditCardNumber = cardNumber.match(/.{1,4}/g);
  return formattedCreditCardNumber.join(' ');
};

const updateSpanContent = () => {
  formKeys.forEach(key => {
    const cardElement = document.getElementById(`card-${key}`);
    const value = formValues[key];

    if (value) {
      if (key === 'number') {
        cardElement.textContent = formatCreditCardNumber(value);
      } else {
        cardElement.textContent = value.toUpperCase();
      }
    } else {
      cardElement.textContent = formInitialValues[key];
    }
  });
};

const validateForm = () => {
  let formIsValid = true;

  formKeys.forEach(key => {
    const errorElement = document.getElementById(`${key}-error`);
    const value = formValues[key];

    if (!value) {
      errorElement.classList.remove('hide');
      formIsValid = false;
    } else if (!/^[a-zA-Z0-9\s]+$/.test(value)) {
      alert(
        `El campo ${key} contiene caracteres no permitidos. Por favor, utilice solo letras, números y espacios.`
      );
      formIsValid = false;
    } else {
      errorElement.classList.add('hide');
    }
  });

  return formIsValid;
};

const getFieldChanged = event => {
  const value = event.target.value;
  formValues[event.target.id] = value;
  updateSpanContent();
};

formElement.addEventListener('input', getFieldChanged);

formElement.addEventListener('submit', event => {
  event.preventDefault();

  if (validateForm()) {
    alert('Formulario enviado con éxito.');
  }
});
