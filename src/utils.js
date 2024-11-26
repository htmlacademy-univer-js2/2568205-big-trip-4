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
