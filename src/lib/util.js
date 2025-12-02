export const States = {
    OFF: 0,
    OFF_LOCK: 10,
    WAIT_SELECT: 20,
    SELECTED: 30,
    ADJUSTING: 40,
    LOCK: 50,
  };

export function getPartsFromDate(now = new Date()) {
  return [
    now.getDate(),
    now.getMonth() + 1,
    now.getFullYear(),
    now.getHours(),
    now.getMinutes(),
  ]
}


export function buildDateFromParts(values) {
  let d = new Date();
  const [ date, mon, year, hour, min ] = values;
  d.setFullYear(year);
  d.setDate(date);
  d.setMonth(mon - 1);
  d.setHours(hour);
  d.setMinutes(min);
  return d;
}

