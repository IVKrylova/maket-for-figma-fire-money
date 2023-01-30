import * as utils from './modules/utils.js';
import BestOffer from './components/BestOffer.js';
import Section from './components/Section.js';
import {
  inputRangeSumFormHeader,
  valueRangeSumFormHeader,
  inputRangeTimeFormHeader,
  valueRangeTimeFormHeader,
  offerSelector,
  offerTemplateSelector,
  bestOffersListSelector,
} from './modules/constants.js';
import {
  bestOffers,
} from './modules/data.js';

utils.isWebp();

/* form-credit */
inputRangeSumFormHeader.addEventListener("change", function() {
  const value = this.value.toString().slice(0, (this.value.length - 3)) + ' 000 ₽';
  valueRangeSumFormHeader.textContent = value;
});

inputRangeTimeFormHeader.addEventListener("change", function() {
  if (this.value === '3' || this.value === '3') {
    valueRangeTimeFormHeader.textContent = `${this.value} дня`;
  } else {
    valueRangeTimeFormHeader.textContent = `${this.value} дней`;
  }
});


/* best offer */
const createBestOffers = data => {
  const bestOffersList = new Section({
    items: data,
    renderer: item => {
      const offer = new BestOffer(item, offerSelector, offerTemplateSelector);

      return offer.generateOffer();
    }
    },
    bestOffersListSelector
  );
  bestOffersList.renderItems();
  return bestOffersList;
}

createBestOffers(bestOffers);
