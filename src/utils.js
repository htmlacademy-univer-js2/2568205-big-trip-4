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
export const DEFAULT_TYPE = 'Taxi'
export const EMPTY_POINT = {
  id: crypto.randomUUID(),
  basePrice: 0,
  dateFrom: dayjs().toDate(),
  dateTo: dayjs().toDate(),
  destinationId: null,
  isFavorite: false,
  offerIds: [],
  type: DEFAULT_TYPE
}
export const FILTER_TYPE = {
  EVERYTHING: 'everything',
  FUTURE: 'future',
  PRESENT: 'present',
  PAST: 'past',
};
const UserAction = {
  UPDATE_POINT: 'UPDATE_POINT',
  ADD_POINT: 'ADD_POINT',
  DELETE_POINT: 'DELETE_POINT',
};

export const SORTING_TYPES = {
  DAY: 'day',
  EVENT: 'event',
  TIME: 'time',
  PRICE: 'price',
  OFFERS: 'offers'
};
export const UpdateType = {
  PATCH: 'PATCH',
  MINOR: 'MINOR',
  MAJOR: 'MAJOR',
  INIT: 'INIT'
};
export const filters = {
  [FILTER_TYPE.EVERYTHING]: (points) => points.filter((point) => point),
  [FILTER_TYPE.FUTURE]: (points) => points.filter((point) => isFuturedPoint(point)),
  [FILTER_TYPE.PRESENT]: (points) => points.filter((point) => isPresentedPoint(point)),
  [FILTER_TYPE.PAST]: (points) => points.filter((point) => isPastedPoint(point)),
};
function isFuturedPoint(point) {
  return dayjs().isBefore(point.dateFrom);
}

function isPresentedPoint(point) {
  return dayjs().isAfter(point.dateFrom) && dayjs().isBefore(point.dateTo);
}

function isPastedPoint(point) {
  return dayjs().isAfter(point.dateTo);
}

export const sorts = {
  [SORTING_TYPES.DAY]: (points) => points.filter((firstPoint, secondPoint) => sortByDay(firstPoint, secondPoint)),
  [SORTING_TYPES.EVENT]: (points) => points.filter((point) => point),
  [SORTING_TYPES.TIME]: (points) => points.filter((point) => point),
  [SORTING_TYPES.PRICE]: (points) => points.filter((firstPoint, secondPoint) => firstPoint.basePrice - secondPoint.basePrice),
  [SORTING_TYPES.OFFERS]: (points) => points.filter((point) => point),
}
 function sortByDay(firstPoint, secondPoint)
{
  return dayjs(firstPoint.dateFrom)-dayjs(secondPoint.dateFrom)
}
function sortByPrice(firstPoint, secondPoint)
{
  return firstPoint.basePrice-secondPoint.basePrice
}
function sortByOffers(firstPoint, secondPoint) {
  return firstPoint.offerIds.length-secondPoint.offerIds.length
}
function sortByTime(firstPoint, secondPoint)
{
  const timeFrom = dayjs(firstPoint.dateTo).diff(dayjs(firstPoint.dateFrom));
  const timeTo = dayjs(secondPoint.dateTo).diff(dayjs(secondPoint.dateFrom));

  return timeFrom - timeTo;
}
export { sortByDay, sortByPrice, sortByOffers, sortByTime, UserAction };
