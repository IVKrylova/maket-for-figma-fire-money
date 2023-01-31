export default class Creditor {
  constructor(data, creditorSelector, elementTemplateSelector) {
    this._creditorSelector = creditorSelector;
    this._elementTemplateSelector = elementTemplateSelector;
    this._company = data.company;
  }

  _getCreditor() {
  	const elementTemplate = document.querySelector(this._elementTemplateSelector).content;
    const creditor = elementTemplate.querySelector(this._creditorSelector).cloneNode(true);

    return creditor;
  }

  generateCreditor() {
    this._creditor = this._getCreditor();

    this._creditor.textContent = this._company;

    return this._creditor;
  }
}
