export function getDate(date) {
  const currentDate = new Date(date);
  const day = currentDate.getDay();
  const month = currentDate.getMonth();
  const year = currentDate.getFullYear();
  return `${month}.${day}.${year}`;
} 