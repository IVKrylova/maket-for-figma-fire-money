export default class BestOffer {
  constructor(data, offerSelector, elementTemplateSelector) {
    this._type = data.type;
    this._sum = data.sum;
    this._timeNum = data.time.split(' ')[0];
    this._timeStr = data.time.split(' ')[1];
    this._returnDate = data.returnDate;
    this._repayment = data.repayment;
    this._offerSelector = offerSelector;
    this._elementTemplateSelector = elementTemplateSelector;
    this._data = data;
  }

  _getOffer() {
  	const elementTemplate = document.querySelector(this._elementTemplateSelector).content;
    const offer = elementTemplate.querySelector(this._offerSelector).cloneNode(true);

    return offer;
  }

  _setEventListeners() {
    this._offer.addEventListener('click', () => {
      console.log(this._data);
    });
  }

  generateOffer() {
    this._offer = this._getOffer();
    this._offerType = this._offer.querySelector('.offer__type');
    this._offerSum = this._offer.querySelector('.offer__sum');
    this._offertTimeNum = this._offer.querySelector('.offer__time-num');
    this._offerTimeStr = this._offer.querySelector('.offer__time-str');
    this._offerValueDate = this._offer.querySelector('.offer__value_date');
    this._offerValueSum = this._offer.querySelector('.offer__value_sum');

    this._setEventListeners();
    this._offerType.textContent = this._type;
    this._offerSum.textContent = this._sum;
    this._offertTimeNum.textContent = this._timeNum;
    this._offerTimeStr.textContent = this._timeStr;
    this._offerValueDate.textContent = this._returnDate;
    this._offerValueSum.textContent = this._repayment;

    if (this._type === 'lite') {
      this._offerType.classList.add('offer__type_background_lite');
    } else if (this._type === 'basic') {
      this._offerType.classList.add('offer__type_background_basic');
    } else if (this._type === 'pro') {
      this._offerType.classList.add('offer__type_background_pro');
    }

    return this._offer;
  }
}
