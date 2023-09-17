const calcDutchPay = ({
  dailyPaySum,
  endingTotalCost,
  dailyDates,
  countPeople,
}: {
  dailyPaySum: string[];
  endingTotalCost: string;
  dailyDates: string[];
  countPeople: number;
}) => {
  const totalPay = dailyPaySum.reduce((acc, val) => {
    const removeComma = val.replaceAll(',', '');
    return acc + Number(removeComma);
  }, 0);

  const removeCommaEndingTotalCost = endingTotalCost.replaceAll(',', '');
  const remainingBudget = Math.floor(
    Number(removeCommaEndingTotalCost) - totalPay,
  );
  const perPersonCost = Math.floor(remainingBudget / countPeople);

  const datesAndPaySum = dailyDates.map((date, i) => ({
    [date]: dailyPaySum[i],
  }));

  return {
    remainingBudget,
    dailyPaySum,
    totalPay,
    perPersonCost,
    datesAndPaySum,
  };
};

test('더치페이 계산 함수가 잘 되는지 확인', async () => {
  const props = {
    dailyPaySum: ['90,000'],
    endingTotalCost: '200,000',
    dailyDates: ['2023-09-15'],
    countPeople: 2,
  };

  // calcDutchPay 함수를 호출하고 반환값을 저장
  const result = calcDutchPay(props);

  // 반환값을 확인
  expect(result).toEqual({
    remainingBudget: 110000,
    dailyPaySum: ['90,000'],
    totalPay: 90000,
    perPersonCost: 55000,
    datesAndPaySum: [{ '2023-09-15': '90,000' }],
  });
});
