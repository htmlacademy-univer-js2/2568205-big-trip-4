import dayjs from "dayjs";
import dayjsRandom from 'dayjs-random'
dayjs.extend(dayjsRandom)
export function getRandomDate() {
return dayjs.soon(20).format()
}
export function getRandomDateAfter(date){
  console.log(dayjs.soon(1, date).format())
  return dayjs.soon(1, date).format()
}
export function getRandomNumber(min, max) {
  return Math.floor(Math.random() * (max - min) + min);
}

export function getRandomValue(items){
  return items[getRandomNumber(0, items.length - 1)];

}
export function toDatetime(dateTime){
  return dayjs(dateTime).format('DD/MM/YY HH:mm');
}

export function toMonthDate(dateTime){
  return dayjs(dateTime).format('MMM DD');
}

export function toTime(dateTime){
  return dayjs(dateTime).format('HH:mm');
}
export function updateItem(items, update) {
  return items.map((item) => item.id === update.id ? update : item);
}
export const FILTER_TYPE = {
  EVERYTHING: 'everything',
  FUTURE: 'future',
  PRESENT: 'present',
  PAST: 'past',
};

export const SORTING_TYPES = {
  DAY: 'day',
  EVENT: 'event',
  TIME: 'time',
  PRICE: 'price',
  OFFERS: 'offers'
};
export const filters = {
  [FILTER_TYPE.EVERYTHING]: (points) => points.filter((point) => point),
  [FILTER_TYPE.FUTURE]: (points) => points.filter((point) => point),
  [FILTER_TYPE.PRESENT]: (points) => points.filter((point) => point),
  [FILTER_TYPE.PAST]: (points) => points.filter((point) => point),
};

export const sorts = {
  [SORTING_TYPES.DAY]: (points) => points.filter((point) => point),
  [SORTING_TYPES.EVENT]: (points) => points.filter((point) => point),
  [SORTING_TYPES.TIME]: (points) => points.filter((point) => point),
  [SORTING_TYPES.PRICE]: (points) => points.filter((point) => point),
  [SORTING_TYPES.OFFERS]: (points) => points.filter((point) => point),
}
