export default class Faq {
  constructor(data, faqSelector, elementTemplateSelector) {
    this._faqSelector = faqSelector;
    this._elementTemplateSelector = elementTemplateSelector;
    this._question = data.question;
    this._answer = data.answer;
  }

  _getFaq() {
  	const elementTemplate = document.querySelector(this._elementTemplateSelector).content;
    const faq = elementTemplate.querySelector(this._faqSelector).cloneNode(true);

    return faq;
  }

  _setEventListeners() {
    this._button.addEventListener('click', () => {
      if (this._button.closest('.faq__button_pressed')) {
        this._faq.classList.remove('faq__item_bacfground_gradient');
        this._button.classList.remove('faq__button_pressed');
        this._questionElement.classList.remove('faq__question_color_white');
        this._answerElement.classList.remove('faq__answer_visible');
      } else {
        this._faq.classList.add('faq__item_bacfground_gradient');
        this._button.classList.add('faq__button_pressed');
        this._questionElement.classList.add('faq__question_color_white');
        this._answerElement.classList.add('faq__answer_visible');
      }
    });
  }

  generateFaq() {
    this._faq = this._getFaq();
    this._questionElement = this._faq.querySelector('.faq__question');
    this._answerElement = this._faq.querySelector('.faq__answer');
    this._button = this._faq.querySelector('.faq__button');

    this._setEventListeners();
    this._questionElement.textContent = this._question;
    this._answerElement.textContent = this._answer;

    return this._faq;
  }
}
