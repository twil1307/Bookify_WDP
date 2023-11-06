export const getRandomExpected = (totalIncome = []) => {
  const expected = [];
  totalIncome.forEach((data) => {
    expected.push(data + (randomIntFromInterval(-data, data) * 30) / 100);
  });

  return expected;
};

function randomIntFromInterval(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}

export const getTotal = (totalIncome) => {
  const total = totalIncome.reduce((prev, curr) => {
    return curr + prev;
  }, 0);
  return total;
};
