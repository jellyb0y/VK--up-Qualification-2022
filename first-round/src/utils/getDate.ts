import { Languages } from '@lib/Languages/types';

const ONE_DAY = 24 * 60 * 60 * 1000;
const ONE_YEAR = ONE_DAY * 365;

const MONTHS_RU = [
  ['янв', 'января'],
  ['фев', 'февраля'],
  ['мар', 'марта'],
  ['апр', 'апреля'],
  ['май', 'мая'],
  ['июн', 'июня'],
  ['июл', 'июля'],
  ['авг', 'августа'],
  ['сен', 'сентября'],
  ['окт', 'октября'],
  ['ноя', 'ноября'],
  ['дек', 'декабря'],
];

const MONTHS_EN = [
  ['Jan', 'January'],
  ['Feb', 'February'],
  ['Mar', 'March'],
  ['Apr', 'April'],
  ['May', 'May'],
  ['Jun', 'June'],
  ['Jul', 'July'],
  ['Aug', 'August'],
  ['Sep', 'September'],
  ['Oct', 'October'],
  ['Nov', 'November'],
  ['Dec', 'December'],
];

export const getDate = (dateString: string, full?: boolean, lang = Languages.Ru): string => {
  const months = lang === Languages.Ru ? MONTHS_RU : MONTHS_EN;

  const date = new Date(dateString);
  const currentDate = new Date();
  const time = date.toTimeString().substring(0, 5);

  if (currentDate.getTime() - date.getTime() < ONE_DAY) {
    if (full) {
      return `Сегодня, ${time}`;
    }

    return time;
  }

  const isMoreThanYear = date.getFullYear() !== currentDate.getFullYear();

  const day = date.getDate();
  const month = date.getMonth();
  const year = isMoreThanYear ? date.getFullYear() : '';

  let fullDate = `${day} ${months[month][Number(full)]}`;

  if (currentDate.getTime() - date.getTime() > ONE_YEAR) {
    fullDate = `${fullDate} ${year}`;
  }

  if (full) {
    return `${fullDate}, ${time}`;
  }

  return fullDate;
};
