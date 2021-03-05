const content = document.querySelector('.content');
const profileName = content.querySelector('.profile__name');
const profileAbout = content.querySelector('.profile__about');
const buttonEdit = content.querySelector('.profile__button-edit');
const buttonAdd = content.querySelector('.profile__button-add');
const popup = content.querySelector('.popup');
const buttonCancel = popup.querySelector('.popup__button-cancel');

const forms = [
 {
    formName: 'popupFormEditProfile',
    formHeading: 'Редактирование профиля',
    firstInputName: 'profile_name',
    secondInputName: 'profile_about',
    buttonText: 'Сохранить',
  },
  {
    formName: 'popupFormAddElement',
    formHeading: 'Новое место',
    firstInputName: 'element_name',
    secondInputName: 'element_image',
    firstPlaceholderName: 'Название',
    secondPlaceholderName: 'Ссылка на картинку',
    buttonText: 'Создать',
  },
];

const elementTemplate = document.querySelector('#element-template').content;
const elementsList = document.querySelector('.elements__list');

const elements = [
  {
    elementText: 'гора Архыз, Карачаево-Черкессия',
    elementImageSrc: './images/arkhyz.jpg'
  },
  {
    elementText: 'Полуостров Камчатка',
    elementImageSrc: './images/kamchatka.jpg'
  },
  {
    elementText: 'Красная поляна, Краснодарский край',
    elementImageSrc: './images/krasnaya-polyana.jpg'
  },
  {
    elementText: 'Северная Осетия - Алания',
    elementImageSrc: './images/north-ossetia-alania.jpg'
  },
  {
    elementText: 'Остров Ольхон',
    elementImageSrc: './images/olkhon-island.jpg'
  },
  {
    elementText: 'Усть-Ленский Заповедник',
    elementImageSrc: './images/ust-lenskiy-zapovednik.jpg'
  },
];

function openPopup (evt) {
  const popupFormTemplate = document.querySelector('#popup__form-template').content;
  const popupForm = popupFormTemplate.querySelector('.popup__form').cloneNode(true);

  if (evt.target.name === 'button-edit') {
    popupForm.name = forms[0].formName;
    popupForm.querySelector('.popup__heading').textContent = forms[0].formHeading;
    popupForm.querySelectorAll('.popup__item')[0].name = forms[0].firstInputName;
    popupForm.querySelectorAll('.popup__item')[0].value = profileName.textContent;
    popupForm.querySelectorAll('.popup__item')[1].name = forms[0].secondInputName;
    popupForm.querySelectorAll('.popup__item')[1].value = profileAbout.textContent;
    popupForm.querySelector('.popup__button-save').textContent = forms[0].buttonText;
  }

  else {
    popupForm.name = forms[1].formName;
    popupForm.querySelector('.popup__heading').textContent = forms[1].formHeading;
    popupForm.querySelectorAll('.popup__item')[0].name = forms[1].firstInputName;
    popupForm.querySelectorAll('.popup__item')[0].placeholder = forms[1].firstPlaceholderName;
    popupForm.querySelectorAll('.popup__item')[1].name = forms[1].secondInputName;
    popupForm.querySelectorAll('.popup__item')[1].placeholder = forms[1].secondPlaceholderName;
    popupForm.querySelector('.popup__button-save').textContent = forms[1].buttonText;
  }

  popup.prepend(popupForm);
  popupForm.addEventListener('submit', formSubmitHandler);
  return popup.classList.remove('popup_disabled');
}

function disabledPopup() {
  popup.querySelector('.popup__form').remove();
  return popup.classList.add('popup_disabled');
}

function formSubmitHandler(evt) {
  evt.preventDefault();
  if (popup.querySelector('.popup__form').name === 'popupFormEditProfile') {
    profileName.textContent = popup.querySelectorAll('.popup__item')[0].value;
    profileAbout.textContent = popup.querySelectorAll('.popup__item')[1].value;;
  }
  else {

  }
  disabledPopup();
}

elements.forEach(function (el) {
  const element = elementTemplate.querySelector('.element').cloneNode(true);

  element.querySelector('.element__image').src = el.elementImageSrc;
  element.querySelector('.element__image').alt = el.elementText;
  element.querySelector('.element__text').textContent = el.elementText;

  elementsList.append(element);
})

buttonEdit.addEventListener('click', openPopup);

buttonAdd.addEventListener('click', openPopup);

buttonCancel.addEventListener ('click', disabledPopup);

