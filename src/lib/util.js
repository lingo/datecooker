export const States = {
    WAIT_SELECT: 2,
    SELECTED: 3,
    ADJUSTING: 4,
    LOCK: 10,
  };

export function getDateParts(now = new Date()) {
  return [
    now.getDate(),
    now.getMonth() + 1,
    now.getFullYear(),
    now.getHours(),
    now.getMinutes(),
  ]
}


export function buildDate(values) {
  let d = new Date();
  const [ date, mon, year, hour, min ] = values;
  d.setFullYear(year);
  d.setDate(date);
  d.setMonth(mon - 1);
  d.setHours(hour);
  d.setMinutes(min);
  return d;
}