export default class UserInfo {
  constructor({ userNameSelector, userDescriptionSelector }) {
    this._userNameElement = userNameSelector;
    this._userDescriptionElement = userDescriptionSelector;
  }

  getUserInfo() {
    return {
      userName: this._userNameElement.textContent,
      userDescription: this._userDescriptionElement.textContent,
    };
  }

  setUserInfo(data) {
    this._userNameElement.textContent = data.title;
    this._userDescriptionElement.textContent = data.description;
  }
}
