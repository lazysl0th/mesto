const validationSetting = {
  formSelector: '.popup__content_type_form',
  inputSelector: '.popup__item',
  submitButtonSelector: '.popup__button-save',
  inactiveButtonClass: 'popup__button-save_disabled',
  inputErrorClass: 'popup__item_type_error',
  errorClass: 'popup__error_active'
}

/*выбрать элемент ошибки*/
const selectItemError = (form, formInput) => {
 return form.querySelector(`.${formInput.id}-error`);
}

/*показать ошибку*/
const showInputError = (form, formInput, inputErrorClass, errorClass) => {
  itemError = selectItemError(form, formInput);
  formInput.classList.add(inputErrorClass);
  itemError.textContent = formInput.validationMessage;
  itemError.classList.add(errorClass);
}

/*скрыть ошибку*/
const hideInputError = (form, formInput, inputErrorClass, errorClass) => {
  const formError = form.querySelector(`.${formInput.id}-error`);
  formInput.classList.remove(inputErrorClass);
  formError.textContent = '';
  formError.classList.remove(errorClass);
}

/*проверка валидности полей ввода формы*/
const checkInput = (form, formInput, inputErrorClass, errorClass) => {
  if (formInput.validity.valid) {
    hideInputError(form, formInput, inputErrorClass, errorClass);
  } else {
    showInputError(form, formInput, inputErrorClass, errorClass);
  }
}

/*проверить наличие невалидных полей*/
const hasInvalidInput = (inputList) => {
  return inputList.some(input => !input.validity.valid);
}

/*установить состояние кнопки*/
const setStateButtonSave = (inputList, buttonSave, inactiveButtonClass) => {
  if (!hasInvalidInput(inputList)  ) {
    buttonSave.removeAttribute('disabled');
    buttonSave.classList.remove(inactiveButtonClass);
  } else {
    buttonSave.setAttribute('disabled', true);
    buttonSave.classList.add(inactiveButtonClass);
  }
}

/*установить слушатели на поля ввода*/
const setInputListeners = (form, inputSelector, submitButtonSelector, inactiveButtonClass, inputErrorClass, errorClass) => {
  const inputList = Array.from(form.querySelectorAll(inputSelector));
  const buttonSave = form.querySelector(submitButtonSelector);
  inputList.forEach(function(formInput){
    formInput.addEventListener('input', function(){
      checkInput(form, formInput, inputErrorClass, errorClass);
      setStateButtonSave(inputList, buttonSave, inactiveButtonClass);
    });
  })
}

/*валидация форм*/
const enableValidation = ({formSelector, inputSelector, submitButtonSelector, inactiveButtonClass, inputErrorClass, errorClass}) => {
  const forms = Array.from(content.querySelectorAll(formSelector));
  forms.forEach(function(form){
    form.addEventListener('submit', (evt) => {evt.preventDefault()});
    setInputListeners(form, inputSelector, submitButtonSelector, inactiveButtonClass, inputErrorClass, errorClass);
  });
}

enableValidation(validationSetting);
