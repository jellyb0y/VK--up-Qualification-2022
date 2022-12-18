const ONE_DAY = 24 * 60 * 60 * 1000;

const MONTHS = [
  'янв',
  'фев',
  'мар',
  'апр',
  'май',
  'июн',
  'июл',
  'авг',
  'сен',
  'окт',
  'ноя',
  'дек',
];

export const getDate = (dateString: string, full?: boolean): string => {
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

  const fullDate = `${day} ${MONTHS[month]} ${year}`;

  if (full) {
    return `${fullDate}, ${time}`;
  }

  return fullDate;
};
