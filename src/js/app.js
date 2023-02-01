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
  creditorSelector,
  creditorTemplateSelector,
  creditorsListSelector,
  currentYear,
  creditForm,
  headerWomanImg,
  SHIFT_HEADER_WOMAN_IMG_1280,
  SHIFT_HEADER_WOMAN_IMG_1920,
  buttonHeader,
  MAX_CREDIT_SUM,
  INITIAL_RANGE_SUM,
  SHIFT_RANGE_SUM,
  MAX_CREDIT_TIME,
  INITIAL_RANGE_TIME,
  SHIFT_RANGE_TIME,
  SHIFT_RANGE_SUM_246,
  SHIFT_RANGE_TIME_220,
  burgerMenu,
  headerMenu,
} from './modules/constants.js';
import {
  bestOffers,
  reviews,
  clientsRejeckt,
  clientsSuccess,
  clientsPaid,
  faq,
  creditors,
} from './modules/data.js';
import Creditor from './components/Creditor.js';

/* img conversion */
utils.isWebp();

/* header */
const calcLeftHeaderWomanImg = () => {
  if (document.documentElement.clientWidth >= 1920) {
    headerWomanImg.style.left = `39.5%`;
  } else if (document.documentElement.clientWidth < 1920 && document.documentElement.clientWidth > 1280) {
    const creditFormPosition = creditForm.getBoundingClientRect().left - SHIFT_HEADER_WOMAN_IMG_1920;
    headerWomanImg.style.left = `${creditFormPosition}px`;
  } else if (document.documentElement.clientWidth <= 1280 && document.documentElement.clientWidth > 740) {
    const creditFormPosition = creditForm.getBoundingClientRect().left - SHIFT_HEADER_WOMAN_IMG_1280;
    headerWomanImg.style.left = `${creditFormPosition}px`;
  }
}

burgerMenu.addEventListener('click', () => {
  if (headerMenu.closest('.menu__list-link_mobile')) {
    headerMenu.classList.remove('menu__list-link_mobile');
  } else {
    headerMenu.classList.add('menu__list-link_mobile');
  }

});

const createTextButtonHeader = () => {
  if (document.documentElement.clientWidth <= 1280) buttonHeader.textContent = 'войти в кабинет';
}
calcLeftHeaderWomanImg();
createTextButtonHeader();

window.onresize = function() {
  calcLeftHeaderWomanImg();
  createTextButtonHeader();
}

/* form-credit */
const changeProgressSum = (sum) => {
  const value = sum / 99000 * 100;
  document.documentElement
    .style.setProperty('--progress-sum', `linear-gradient(81.55deg, #FFC83E 0%, #FF9F47 ${value}%, #ECECEC ${value}%, #ECECEC 100%)`);
}

const changeProgressTime = (time) => {
  const value = (time - 3) / 27 * 100;
  document.documentElement
    .style.setProperty('--progress-time', `linear-gradient(81.55deg, #FFC83E 0%, #FF9F47 ${value}%, #ECECEC ${value}%, #ECECEC 100%)`);
}

valueRangeSumFormHeader.style.left = `${(INITIAL_RANGE_SUM / MAX_CREDIT_SUM * inputRangeSumFormHeader.clientWidth) - SHIFT_RANGE_SUM}px`
inputRangeSumFormHeader.addEventListener("input", function() {
  const value = this.value.toString().slice(0, (this.value.length - 3)) + ' 000 ₽';
  const coordinatesSum = (this.value / MAX_CREDIT_SUM * inputRangeSumFormHeader.clientWidth) - SHIFT_RANGE_SUM;
  valueRangeSumFormHeader.textContent = value;

  if (coordinatesSum > 246) {
    valueRangeSumFormHeader.style.left = `${coordinatesSum - SHIFT_RANGE_SUM_246}px`;
  } else {
    valueRangeSumFormHeader.style.left = `${coordinatesSum}px`;
  }

  changeProgressSum(this.value);
});

valueRangeTimeFormHeader.style.left = `${(INITIAL_RANGE_TIME / MAX_CREDIT_TIME * inputRangeTimeFormHeader.clientWidth - SHIFT_RANGE_TIME)}px`
inputRangeTimeFormHeader.addEventListener("input", function() {
  const coordinatesTime = (this.value / MAX_CREDIT_TIME * inputRangeTimeFormHeader.clientWidth) - SHIFT_RANGE_TIME;

  if (this.value === '3' || this.value === '4') {
    valueRangeTimeFormHeader.textContent = `${this.value} дня`;
  } else {
    valueRangeTimeFormHeader.textContent = `${this.value} дней`;
  }

  if (coordinatesTime > 220) {
    valueRangeTimeFormHeader.style.left = `${coordinatesTime - SHIFT_RANGE_TIME_220}px`
  } else {
    valueRangeTimeFormHeader.style.left = `${coordinatesTime}px`
  }

  changeProgressTime(this.value);
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

/* footer */
const createCreditor = data => {
  const creditorList = new Section({
    items: data,
    renderer: item => {
      const creditor = new Creditor(item, creditorSelector, creditorTemplateSelector);

      return creditor.generateCreditor();
    }
    },
    creditorsListSelector
  );
  creditorList.renderItems();
  return creditorList;
}

createCreditor(creditors);

currentYear.textContent = new Date().getFullYear();
