import { dashboarData } from "./FakeDataDashBoardExchange";

export const getYearExchange = (year) => {
  let transc = 0;
  const dataByYear = dashboarData
    .filter((data) => data.years === year)
    .map((monthStatic) => {
      return monthStatic.details;
    });
  dataByYear[0]?.forEach((data) => {
    transc += data.exchange;
  });
  return transc;
};
export const getYearsExchange = () => {
  let transc = 0;

  dashboarData?.forEach((data) => {
    transc += data.details.exchange;
  });
  return transc;
};

export const TransactionDataYear = (year) => {
  let transObj = {
    month: [],
    transNumber: [],
  };
  const dataByYear = dashboarData
    .filter((data) => data.years === year)
    .map((data) => data.details);
  dataByYear[0].forEach((data) => {
    transObj.month.push(data.month);
    transObj.transNumber.push(data.exchange);
  });
  return transObj;
};
export const TransactionDataYears = () => {
  let transObj = {
    year: [],
    transNumber: [],
  };
  dashboarData.forEach((data) => {
    transObj.year.push(data.years);
    transObj.transNumber.push(sumByYear(data.details));
  });
  return transObj;
};

const sumByYear = (yearDetail) => {
  const res = yearDetail.reduce((prev, curr) => {
    return prev + curr.exchange;
  }, 0);
  return res;
};

export const getMonthData = (data, year) => {
  const dataRes = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
  let month = new Date().getMonth();
  let getYear = new Date().getFullYear();
  for (var i = 0; i < data.length; i++) {
    let monthSpe = new Date(data[i].check_out).getMonth();
    let yearSpe = new Date(data[i].check_out).getFullYear();
    if (yearSpe === parseInt(year)) {
      dataRes[monthSpe] += data[i].price;
    }
  }
  for (var i = 0; i < dataRes.length; i++) {
    if (i > month && year === getYear) {
      dataRes[i] = null;
    }
  }

  return dataRes;
};

export const getYearSum = (data, year) => {
  let transc = 0;

  data?.forEach((data) => {
    let yearSpe = new Date(data.check_out).getFullYear();
    if (yearSpe === year) {
      transc += data.price;
    }
  });
  return transc;
};

export const getYearsSum = (data) => {
  let transc = 0;

  data?.forEach((data) => {
    transc += data.price;
  });
  return transc;
};

export const TransactionDataYears2 = (data) => {
  let yearSpe = new Date().getFullYear();
  const dataRes = [0, 0, 0, 0, 0, 0, 0, 0, 0];
  let listYear = [];
  for (var i = 0; i <= 8; i++) {
    listYear.push(yearSpe - i);
  }
  listYear = listYear.reverse();

  data.forEach((item) => {
    let yearSum = new Date(item.check_out).getFullYear();
    let index = listYear.indexOf(parseInt(yearSum));
    if (index !== -1) {
      dataRes[index] += item.price;
    }
  });

  return {
    year: listYear,
    transNumber: dataRes,
  };
};
