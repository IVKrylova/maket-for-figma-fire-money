import * as utils from './modules/utils.js';
import BestOffer from './components/BestOffer.js';
import Section from './components/Section.js';
import Review from './components/Review.js';
import Faq from './components/Faq.js';
import {
  inputRangeSumFormHeader,
  valueRangeSumFormHeader,
  inputRangeTimeFormHeader,
  valueRangeTimeFormHeader,
  offerSelector,
  offerTemplateSelector,
  bestOffersListSelector,
  reviewSelector,
  reviewTemplateSelector,
  reviewsListSelector,
  clientRejeckt,
  clientSuccess,
  clientPaid,
  faqSelector,
  faqTemplateSelector,
  faqsListSelector,
} from './modules/constants.js';
import {
  bestOffers,
  reviews,
  clientsRejeckt,
  clientsSuccess,
  clientsPaid,
  faq,
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

/* reviews */
const createReview = data => {
  const reviewsList = new Section({
    items: data,
    renderer: item => {
      const review = new Review(item, reviewSelector, reviewTemplateSelector);

      return review.generateReview();
    }
    },
    reviewsListSelector
  );
  reviewsList.renderItems();
  return reviewsList;
}

createReview(reviews);

/* clients */
const createClient = (data, clientElement, action) => {
  const client = data[data.length - 1];
  const nameElement = clientElement.querySelector('.clients__name');
  const actionElement = clientElement.querySelector('.clients__action');
  const locationElement = clientElement.querySelector('.location__city');

  nameElement.textContent = client.name;
  if (action === 'rejeckt') {
    actionElement.textContent = client.gender === 'woman'
      ? `Получила отказ ${client.timeAction} назад`
      : `Получил отказ ${client.timeAction} назад`;
  } else if (action === 'success') {
    actionElement.textContent = client.gender === 'woman'
      ? `Взяла ${client.sum} ${client.timeAction} назад`
      : `Взял ${client.sum} ${client.timeAction} назад`;
  } else {
    actionElement.textContent = client.gender === 'woman'
      ? `Внесла на счет ${client.sum} ${client.timeAction} назад`
      : `Внес на счет ${client.sum} ${client.timeAction} назад`;
  }
  locationElement.textContent = client.location;
}

createClient(clientsRejeckt, clientRejeckt, 'rejeckt');
createClient(clientsSuccess, clientSuccess, 'success');
createClient(clientsPaid, clientPaid, 'paid');

/* faq */
const createFaq = data => {
  const faqList = new Section({
    items: data,
    renderer: item => {
      const faq = new Faq(item, faqSelector, faqTemplateSelector);

      return faq.generateFaq();
    }
    },
    faqsListSelector
  );
  faqList.renderItems();
  return faqList;
}

createFaq(faq);
