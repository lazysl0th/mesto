const content = document.querySelector('.content');
const buttonEdit = content.querySelector('.profile__button-edit');
const buttonAdd = content.querySelector('.profile__button-add');
const popup = content.querySelector('.popup');

const forms = [
  {
    formName: 'popupFormEditProfile',
    formHeading: 'Редактирование профиля',
    firstInputName: 'profileName',
    secondInputName: 'profileAbout',
    firstPlaceholderName: '',
    secondPlaceholderName: '',
    firstInputValue: '',
    secondInputValue: '',
    buttonText: 'Сохранить',
    buttonName: 'button-edit',
  },
  {
    formName: 'popupFormAddElement',
    formHeading: 'Новое место',
    firstInputName: 'elementText',
    secondInputName: 'elementImage',
    firstPlaceholderName: 'Название',
    secondPlaceholderName: 'Ссылка на картинку',
    firstInputValue: '',
    secondInputValue: '',
    buttonText: 'Создать',
    buttonName: 'button-add',
  },
];

const elementTemplate = document.querySelector('#element-template').content;
const elementsList = document.querySelector('.elements__list');

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
  const buttonCancel = popup.querySelector('.popup__button-cancel');
  const buttonName = evt.target.name;

  createForm(forms, buttonName);

  buttonCancel.addEventListener ('click', disabledPopup);
  return popup.classList.remove('popup_disabled');
}

function createForm(forms, buttonName) {
  form = forms.filter((item) => (item.buttonName === buttonName));
  if (buttonName === 'button-edit') {
    form[0].firstInputValue = content.querySelector('.profile__name').textContent;
    form[0].secondInputValue = content.querySelector('.profile__about').textContent;
  }
  const popupFormTemplate = document.querySelector('#popup__form-template').content;
  const popupForm = popupFormTemplate.querySelector('.popup__form').cloneNode(true);

  form.forEach(function(item){
    popupForm.name = item.formName;
    popupForm.querySelector('.popup__heading').textContent = item.formHeading;
    popupForm.querySelector('.popup__item_first-input').name = item.firstInputName;
    popupForm.querySelector('.popup__item_first-input').value = item.firstInputValue;
    popupForm.querySelector('.popup__item_first-input').placeholder = item.firstPlaceholderName;
    popupForm.querySelector('.popup__item_second-input').name = item.secondInputName;
    popupForm.querySelector('.popup__item_second-input').value = item.secondInputValue;
    popupForm.querySelector('.popup__item_second-input').placeholder = item.secondPlaceholderName;
    popup.prepend(popupForm);
  });

  popupForm.addEventListener('submit', formSubmitHandler);
}

function disabledPopup() {
  popup.querySelector('.popup__form').remove();
  return popup.classList.add('popup_disabled');
}

function formSubmitHandler(evt) {
  evt.preventDefault();
  const popupItems = popup.querySelectorAll('.popup__item');
  popupInputs = Array.from(popupItems).reduce((previousValue, item) => ({[previousValue.name]: previousValue.value, [item.name]: item.value,}));
  console.log(popupInputs);
  if (popup.querySelector('.popup__form').name === 'popupFormEditProfile') {
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
    element.querySelector('.element__image').src = el.elementImage;
    element.querySelector('.element__image').alt = el.elementText;
    element.querySelector('.element__text').textContent = el.elementText;
    elementsList.append(element);
  })
}

function addElement(popupInputs) {
  const newElement = elementTemplate.querySelector('.element').cloneNode(true);
  newElement.querySelector('.element__image').src = popupInputs.elementImage;
  newElement.querySelector('.element__image').alt = popupInputs.elementText;
  newElement.querySelector('.element__text').textContent = popupInputs.elementText;
  elementsList.prepend(newElement);

}

openElement(elements);

buttonEdit.addEventListener('click', openPopup);

buttonAdd.addEventListener('click', openPopup);

