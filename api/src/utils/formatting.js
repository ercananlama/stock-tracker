export const formatAsPercentage = (number) => {
  return parseFloat(number).toFixed(2) + "%";
};

export const computeAvg = (elm) => {
  const sum = elm.reduce((acc, val) => acc + val, 0);
  return sum / elm.length;
};
