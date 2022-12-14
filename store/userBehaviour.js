/* eslint-disable require-jsdoc */
class UserBehaviourDataBase {
  constructor() {
    this.searches = JSON.parse(localStorage.getItem('searches')) || [];
  }

  addSearch(search) {
    this.searches.push(search);
    localStorage.setItem('searches', JSON.stringify(this.searches));
  }
}

export default UserBehaviourDataBase;
