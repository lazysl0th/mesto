/*класс валидации формы*/
export default class FormValidator {
      constructor(validationSetting, form) {
      this._formSelector = validationSetting.formSelector;
      this._inputSelector = validationSetting.inputSelector;
      this._submitButtonSelector = validationSetting.submitButtonSelector;
      this._inactiveButtonClass = validationSetting.inactiveButtonClass;
      this._inputErrorClass = validationSetting.inputErrorClass;
      this._errorClass = validationSetting.errorClass;
      this._form = form;
      this._inputList = Array.from(this._form.querySelectorAll(this._inputSelector));
      this._buttonSave = this._form.querySelector(this._submitButtonSelector)

    }

    /*проверить input*/
    _checkInput(input) {
      if (input.validity.valid) {
        this._hideInputError(input);
      } else {
        this._showInputError(input);
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
    _hideInputError(input) {
      this._input = input;
      this._itemError = this._getItemError();
      this._input.classList.remove(this._inputErrorClass);
      this._itemError.textContent = '';
      this._itemError.classList.remove(this._errorClass);
    }

    /*показать ошибку*/
    _showInputError(input) {
      this._input = input;
      this._itemError = this._getItemError();
      this._input.classList.add(this._inputErrorClass);
      this._itemError.textContent = this._input.validationMessage;
      this._itemError.classList.add(this._errorClass);
    }

    /*добавить слушатели*/
    _addEventListeners() {
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
        this._enabledButtonSave()
      } else {
        this._disabledButtonSave()
      }
    }

    _enabledButtonSave() {
      this._buttonSave.disabled = false;
      this._buttonSave.classList.remove(this._inactiveButtonClass);
    }

    _disabledButtonSave() {
      this._buttonSave.disabled = true;
      this._buttonSave.classList.add(this._inactiveButtonClass);
    }

  /*сброс валидации*/
  resetValidate() {
    this._inputList.forEach((input) => {
      this._hideInputError(input);
    });
    (this._form.id === 'form-add-element')
    ? this._disabledButtonSave()
    : this._enabledButtonSave();
  }

  /*включить валидацию*/
  enableValidate() {
    this._addEventListeners();
  }
}
