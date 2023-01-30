import * as utils from './modules/utils.js';
import {
  inputRangeSumFormHeader,
  valueRangeSumFormHeader,
  inputRangeTimeFormHeader,
  valueRangeTimeFormHeader,
} from './modules/constants.js';

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
