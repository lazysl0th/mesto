export default class Api {
  constructor({baseUrl, headers},) {
    this._baseUrl = baseUrl;
    this._headers = headers;
  }

  downloadInformationAboutUser() {
    return fetch(`${this._baseUrl}/users/me`, {
      headers: this._headers
    })
      .then(res => {
        if (res.ok) {
          return res.json();
        }
        return Promise.reject(`Ошибка: ${res.status}`);
      })
  }
}


