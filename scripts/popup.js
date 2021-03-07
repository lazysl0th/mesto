const elementTemplate = document.querySelector('#element-template').content;
const content = document.querySelector('.content');
const buttonEdit = content.querySelector('.profile__button-edit');
const buttonAdd = content.querySelector('.profile__button-add');
const popup = content.querySelector('.popup');
const elementsList = content.querySelector('.elements__list');

const popups = [
  {
    type: 'image',
    className: 'popup_type_figure',
    buttons: [''],
  },
  {
    type: 'form',
    className: 'popup_type_form',
    buttons: ['button-edit', 'button-add',]
  },
];

const forms = [
  {
    formName: 'popupFormEditProfile',
    formHeading: 'Редактирование профиля',
    inputName:
    {
      1: 'profileName',
      2: 'profileAbout',
    },
    placeholderName:
    {
      1: '',
      2: '',
    },
    inputValue:
    {
      1: '',
      2: '',
    },
    buttonText: 'Сохранить',
    buttonName: 'button-edit',
  },
  {
    formName: 'popupFormAddElement',
    formHeading: 'Новое место',
    inputName:
    {
      1: 'elementText',
      2: 'elementImage',
    },
    placeholderName:
    {
      1: 'Название',
      2: 'Ссылка на картинку',
    },
    inputValue:
    {
      1: '',
      2: '',
    },
    buttonText: 'Создать',
    buttonName: 'button-add',
  },
];

const elements = [
  {
    elementText: 'гора Архыз, Карачаево-Черкессия',
    elementImage: './images/arkhyz.jpg',
  },
  {
    elementText: 'Полуостров Камчатка',
    elementImage: './images/kamchatka.jpg',
  },
  {
    elementText: 'Красная поляна, Краснодарский край',
    elementImage: './images/krasnaya-polyana.jpg',
  },
  {
    elementText: 'Северная Осетия - Алания',
    elementImage: './images/north-ossetia-alania.jpg',
  },
  {
    elementText: 'Остров Ольхон',
    elementImage: './images/olkhon-island.jpg',
  },
  {
    elementText: 'Усть-Ленский Заповедник',
    elementImage: './images/ust-lenskiy-zapovednik.jpg',
  },
];

function openPopup (evt) {
  const target = evt.target;
  const buttonCancel = popup.querySelector('.popup__button-cancel');
  const popupType = popups.filter((popup) => (Array.from(popup.buttons).find((button) => (button.includes(target.name))) || '') === target.name);

  Array.from(popupType).forEach ((type) => (popup.classList.add(type.className)));

  if (target.name) {
    createForm(forms, target, popupType);
  }
  else {
    createFigure(target, popupType)
  }
  buttonCancel.addEventListener ('click', disabledPopup);
  return popup.classList.remove('popup_disabled');
}

function createForm(forms, target, popupType) {
  const popupFormTemplate = document.querySelector('#popup__form-template').content;
  const popupForm = popupFormTemplate.querySelector('.popup__content').cloneNode(true);
  const popupItems = popupForm.querySelectorAll('.popup__item');
  const popupInputs = Array.from(popupForm.querySelectorAll('.popup__item'));
  const form = forms.filter((form) => (form.buttonName === target.name));

  if (target.name === 'button-edit') {
    form[0].inputValue[1] = content.querySelector('.profile__name').textContent;
    form[0].inputValue[2] = content.querySelector('.profile__about').textContent;
  }

  form.forEach(function(form){
    popupForm.name = form.formName;
    popupForm.querySelector('.popup__heading').textContent = form.formHeading;
    Array.from(popupForm.querySelectorAll('.popup__item')).forEach(function(input, index) {
      input.name = form.inputName[index + 1];
      input.value = form.inputValue[index + 1];
      input.placeholder = form.placeholderName[index + 1];
    });
    popup.prepend(popupForm);
  });
  popupForm.addEventListener('submit', formSubmitHandler);
}

function createFigure(target, popupType) {
  const popupFigureTemplate = document.querySelector('#popup__figure-template').content;
  const popupFigure = popupFigureTemplate.querySelector('.popup__content').cloneNode(true);
  popupFigure.querySelector('.popup__image').src = target.src;
  popupFigure.querySelector('.popup__text').textContent = target.alt;
  popup.prepend(popupFigure);
}

function disabledPopup() {
  const popupTypeClass = popups.map((popup) => (popup.className));
  popupTypeClass.forEach((className) => (popup.classList.remove(className)));
  /*popup.querySelector('.popup__content').remove();*/
  return popup.classList.add('popup_disabled');
}

function formSubmitHandler(evt) {
  evt.preventDefault();
  const popupItems = popup.querySelectorAll('.popup__item');
  popupInputs = Array.from(popupItems).reduce((previousValue, item) => ({[previousValue.name]: previousValue.value, [item.name]: item.value,}));
  if (popup.querySelector('.popup__content').name === 'popupFormEditProfile') {
      content.querySelector('.profile__name').textContent = popupInputs.profileName;
      content.querySelector('.profile__about').textContent = popupInputs.profileAbout;
    }
  else {
    addElement(popupInputs)
  }
  disabledPopup();
}

function openElement(elements) {
  elements.forEach(function (el) {
    const element = elementTemplate.querySelector('.element').cloneNode(true);
    element.querySelector('.element__button-delete').addEventListener('click', deleteElement);
    element.querySelector('.element__image').src = el.elementImage;
    element.querySelector('.element__image').alt = el.elementText;
    element.querySelector('.element__text').textContent = el.elementText;
    element.querySelector('.element__image').addEventListener('click', openPopup);
    element.querySelector('.element__button-like').addEventListener('click', likeElement);
    elementsList.append(element);
  })
}

function addElement(popupInputs) {
  const newElement = elementTemplate.querySelector('.element').cloneNode(true);
  newElement.querySelector('.element__button-delete').addEventListener('click', deleteElement);
  newElement.querySelector('.element__image').src = popupInputs.elementImage;
  newElement.querySelector('.element__image').alt = popupInputs.elementText;
  newElement.querySelector('.element__text').textContent = popupInputs.elementText;
  newElement.querySelector('.element__image').addEventListener('click', openPopup);
  newElement.querySelector('.element__button-like').addEventListener('click', likeElement);
  elementsList.prepend(newElement);
}

function likeElement(evt) {
  evt.target.classList.toggle('element__button-like_active');
}

function deleteElement(evt) {
  const element = evt.target.closest(`.${evt.target.parentElement.className}`)
  element.remove();
}

openElement(elements);

buttonEdit.addEventListener('click', openPopup);

buttonAdd.addEventListener('click', openPopup);

