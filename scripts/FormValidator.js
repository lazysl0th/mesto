/*класс валидации формы*/
export default class FormValidator {
  constructor(validationSetting, popup) {
    this._formSelector = validationSetting.formSelector;
    this._inputSelector = validationSetting.inputSelector;
    this._submitButtonSelector = validationSetting.submitButtonSelector;
    this._inactiveButtonClass = validationSetting.inactiveButtonClass;
    this._inputErrorClass = validationSetting.inputErrorClass;
    this._errorClass = validationSetting.errorClass;
    this._popup = popup;
  }

  /*получить форму*/
  _getForm() {
    const form = this._popup.querySelector(this._formSelector);
    return form;
  }

  /*получит список input*/
  _getInputList() {
    const inputList = Array.from(this._popup.querySelectorAll(this._inputSelector));
    return inputList;
  }

  /*проверить input*/
  checkInput(input) {
    this._input = input;
    if (this._input.validity.valid) {
      this._hideInputError();
    } else {
      this._showInputError();
    }
  }

  /*проверить наличие невалидных полей*/
  _hasInvalidInput(){
    this._inputList = this._getInputList();
    return this._inputList.some((input) => (!input.validity.valid));
  }

  /*получить поле ошибки*/
  _getItemError() {
    const itemError = this._popup.querySelector(`.${this._input.id}-error`);
    return itemError;
  }

  /*скрыть ошибку*/
  _hideInputError() {
    this._itemError = this._getItemError();
    this._input.classList.remove(this._inputErrorClass);
    this._itemError.textContent = '';
    this._itemError.classList.remove(this._errorClass);
  }

  /*показать ошибку*/
  _showInputError() {
    this._itemError = this._getItemError();
    this._input.classList.add(this._inputErrorClass);
    this._itemError.textContent = this._input.validationMessage;
    this._itemError.classList.add(this._errorClass);
  }

  /*получить кнопку сохранить*/
  _getButtonSave() {
    const buttonSave = this._popup.querySelector(this._submitButtonSelector);
    return buttonSave;
  }

  /*слушатели слушатели*/
  _addEventListeners() {
    this._form.addEventListener('submit', (evt) => {evt.preventDefault()});
    this._inputList = this._getInputList();
    this._inputList.forEach((input) => {
      input.addEventListener('input', () => {
        this.checkInput(input);
        this._setStateButtonSave();
      });
    });
  }

  /*установить состояние кнопки сохранить*/
  _setStateButtonSave() {
    this._buttonSave = this._getButtonSave();
    if (!this._hasInvalidInput()) {
      this._buttonSave.disabled = false;
      this._buttonSave.classList.remove(this._inactiveButtonClass);
    } else {
      this._buttonSave.disabled = true;
      this._buttonSave.classList.add(this._inactiveButtonClass);
    }
  }

  /*включить валидацию*/
  enableValidate() {
    this._form = this._getForm();
    this._addEventListeners();
    this._setStateButtonSave();
  }
}
