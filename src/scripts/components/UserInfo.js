export default class UserInfo {
  constructor({nameSelector, aboutSelector}){
    this._name = document.querySelector(nameSelector);
    this._about = document.querySelector(aboutSelector);
  }
  getUserInfo() {
    const profileName = this._name.textContent;
    const profileAbout = this._about.textContent;
    return { profileName, profileAbout };
  }

  setUserInfo( {name, about} ) {
    this._name.textContent = name;
    this._about.textContent = about;
  }
}
