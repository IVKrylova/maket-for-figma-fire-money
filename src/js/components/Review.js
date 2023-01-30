export default class Review {
  constructor(data, reviewSelector, elementTemplateSelector) {
    this._reviewSelector = reviewSelector;
    this._elementTemplateSelector = elementTemplateSelector;
    this._photo = data.photo;
    this._name = data.name;
    this._age = data.age;
    this._text = data.text;
    this._rating = data.rating;
    this._location = data.location;
  }

  _getReview() {
  	const elementTemplate = document.querySelector(this._elementTemplateSelector).content;
    const review = elementTemplate.querySelector(this._reviewSelector).cloneNode(true);

    return review;
  }

  generateReview() {
    this._review = this._getReview();
    this._photoElement = this._review.querySelector('.review__photo');
    this._person = this._review.querySelector('.review__person');
    this._locationCity = this._review.querySelector('.location__city');
    this._reviewText = this._review.querySelector('.review__text');
    this._ratingElement = this._review.querySelector('.review__rating');

    this._photoElement.src = this._photo;
    this._photoElement.alt = this._name;
    this._person.textContent = `${this._name}, ${this._age}`;
    this._locationCity.textContent = this._location;
    this._reviewText.textContent = this._text;
    this._ratingElement.src = this._rating;

    return this._review;
  }
}
