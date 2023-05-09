// const MONDAY = 1;
// const FRIDAY = 5;
const hoursToMinutes = (hour: number) => hour * 60;

const MARKET_START_HOUR = hoursToMinutes(8);
const MARKET_END_HOUR = hoursToMinutes(22);

const marketTimezone = { locale: 'en-US', zoneObject: { timeZone: 'America/Chicago' } };

export const nowInMarketTimezoneString = (timestamp?: number) => {
  if (timestamp) {
    return new Date(timestamp).toLocaleString(marketTimezone.locale, marketTimezone.zoneObject);
  } else {
    return new Date().toLocaleString(marketTimezone.locale, marketTimezone.zoneObject);
  }
};

export const nowInMarketTimezoneDate = () => {
  return new Date(nowInMarketTimezoneString());
};

export const getIsAfterHours = async (timestamp?: number) => {
  const today = nowInMarketTimezoneString(timestamp);
  const d = new Date(today);

  // const day = d.getDay();
  // const isWeekday = day >= MONDAY && day <= FRIDAY;
  const hourInMinutes = hoursToMinutes(d.getHours());
  const minutes = d.getMinutes();
  const timeInMinutes = hourInMinutes + minutes;
  const isBeforeOpen = timeInMinutes < MARKET_START_HOUR;
  const isAfterClose = timeInMinutes > MARKET_END_HOUR;

  console.log({ isBeforeOpen, isAfterClose, hourInMinutes, minutes });

  return isBeforeOpen || isAfterClose;
};
