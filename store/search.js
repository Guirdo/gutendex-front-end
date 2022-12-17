/* eslint-disable require-jsdoc */
class SearchDataBase {
  constructor() {
    this.searches = JSON.parse(localStorage.getItem('searches')) || [];
  }

  addSearch(search) {
    this.searches.push(search);
    localStorage.setItem('searches', JSON.stringify(this.searches));
  }

  getTotalSearches() {
    return this.searches.length;
  }

  getAttributeFrequency(item) {
    const attributeFrequency = [];

    for (const search of this.searches) {
      const coincidence = attributeFrequency.findIndex(
          (element) => element.name.toLowerCase() === search[item].toLowerCase()
      );
      if (coincidence >= 0) {
        attributeFrequency[coincidence].frequency += 1;
      } else if (search[item] !== '') {
        attributeFrequency.push({name: search[item], frequency: 1});
      }
    }

    return attributeFrequency;
  }
}

export default SearchDataBase;
