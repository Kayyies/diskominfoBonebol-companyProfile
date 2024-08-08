export const generateDateTimeString = () => {
  const now = new Date();
  const day = String(now.getDate());
  const month = String(now.getMonth() + 1); // Months are zero-indexed
  const year = String(now.getFullYear()).slice(-2); // Get last two digits of the year

  return `${year}${month}${day}`;
};
