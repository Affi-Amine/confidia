export function DiffDate(date) {
  const timeDiff = new Date() - new Date(date);

  //   const Seconds = Math.floor(timeDiff / 60);
  const Seconds = Math.floor(timeDiff / 1000);
  const Minutes = Math.floor(Seconds / 60);
  const Hours = Math.floor(Minutes / 60);
  const Days = Math.floor(Hours / 24);
  const Months = Math.floor(Days / 30);
  const Years = Math.floor(Days / 365);

  if (timeDiff < 0) {
    return "none";
  }
  if (Years !== 0) {
    return `${Years} years`;
  } else if (Months !== 0) {
    return `${Months} months`;
  } else if (Days !== 0) {
    return ` ${Days} days`;
  } else if (Minutes !== 0) {
    return ` ${Minutes} minutes`;
  }
}
