/*класс валидации формы*/
class FormValidator {
    constructor(form) {
      this._form = form;
    }

    /*проверить input*/
    _checkInput(input) {
      this._input = input;
      if (this._input.validity.valid) {
        this._hideInputError();
      } else {
        this._showInputError();
      }
    }

    /*проверить наличие невалидных полей*/
    _hasInvalidInput(){
      return this._inputList.some((input) => (!input.validity.valid));
    }

    /*получить поле ошибки*/
    _getItemError() {
      const itemError = this._form.querySelector(`.${this._input.id}-error`);
      return itemError;
    }

    /*скрыть ошибку*/
    _hideInputError() {
      this._itemError = this._getItemError();
      this._input.classList.remove(this._inputErrorClass);
      this._itemError.textContent = '';
      this._itemError.classList.remove(this._errorClass);
    }

    _resetValidate() {
      this._inputList.forEach((input) => {
        this._checkInput(input);
      })
      this._setStateButtonSave();
    }

    /*показать ошибку*/
    _showInputError() {
      this._itemError = this._getItemError();
      this._input.classList.add(this._inputErrorClass);
      this._itemError.textContent = this._input.validationMessage;
      this._itemError.classList.add(this._errorClass);
    }

    /*добавить слушатели*/
    _addEventListeners() {
      this._form.addEventListener('submit', (evt) => {evt.preventDefault()});
      this._inputList.forEach((input) => {
        input.addEventListener('input', () => {
          this._checkInput(input);
          this._setStateButtonSave();
        });
      });
    }

    /*установить состояние кнопки сохранить*/
    _setStateButtonSave() {
      if (!this._hasInvalidInput()) {
        this._buttonSave.disabled = false;
        this._buttonSave.classList.remove(this._inactiveButtonClass);
      } else {
        this._buttonSave.disabled = true;
        this._buttonSave.classList.add(this._inactiveButtonClass);
      }
    }

  /*включить валидацию*/
  _enableValidate() {
    this._addEventListeners();
    this._setStateButtonSave()
  }
}

export class EditFormValidator extends FormValidator {
  constructor(validationSetting, form) {
    super(form);
    this._formSelector = validationSetting.formSelector;
    this._inputSelector = validationSetting.inputSelector;
    this._submitButtonSelector = validationSetting.submitButtonSelector;
    this._inactiveButtonClass = validationSetting.inactiveButtonClass;
    this._inputErrorClass = validationSetting.inputErrorClass;
    this._errorClass = validationSetting.errorClass;
    this._inputList = Array.from(this._form.querySelectorAll(this._inputSelector));
    this._buttonSave = this._form.querySelector(this._submitButtonSelector)
  }

  /*включить валидацию*/
  enableValidate() {
    super._enableValidate();
  }

  resetValidate() {
    super._resetValidate();
  }
}

export class AddFormValidator extends FormValidator {
  constructor(validationSetting, form) {
    super(form);
    this._formSelector = validationSetting.formSelector;
    this._inputSelector = validationSetting.inputSelector;
    this._submitButtonSelector = validationSetting.submitButtonSelector;
    this._inactiveButtonClass = validationSetting.inactiveButtonClass;
    this._inputErrorClass = validationSetting.inputErrorClass;
    this._errorClass = validationSetting.errorClass;
    this._inputList = Array.from(this._form.querySelectorAll(this._inputSelector));
    this._buttonSave = this._form.querySelector(this._submitButtonSelector)
  }

  /*включить валидацию*/
  enableValidate() {
    super._enableValidate();
  }
}
