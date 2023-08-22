import React, { useEffect, useState } from 'react';

interface Pays {
  expense: number;
}

const Pay = () => {
  const [pay, setPay] = useState<Pays[]>([]);
  const [newPay, setNewPay] = useState<Pays>({
    expense: 0,
  });
  const [totalExpense, setTotalExpense] = useState<number>(0);

  const addPay = () => {
    if (newPay.expense > 0) {
      setPay((prevPay) => [...prevPay, newPay]);
      setNewPay({ expense: 0 });
    }
  };

  const addButtonHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    const inputText = event.target.value;
    const sanitizedValue = inputText.replace(/,/g, ''); // 쉼표 제거
    const expense = sanitizedValue !== '' ? parseFloat(sanitizedValue) : 0;

    setNewPay((prevPay) => ({
      ...prevPay,
      expense: isNaN(expense) ? 0 : expense,
    }));
  };

  // 세 자릿 수마다 쉼표 추가
  const formatCommas = (number: number) => {
    return number.toLocaleString();
  };

  // 총 지출 내역
  useEffect(() => {
    const sum = pay.reduce((total, item) => total + item.expense, 0);
    setTotalExpense(sum);
  }, [pay]);

  return (
    <div className="pl-10">
      <div className="flex items-center justify-center border-black border-2 w-3/4 h-72 text-center">
        Googlemap
      </div>
      <br />
      <div className="text-2xl font-bold text-blue-500">내가 여행할 장소</div>
      <br />

      {pay.map((item, index) => (
        <div key={index} className="flex w-3/4">
          <div>
            <div className="text-2xl text-black">{index + 1}</div>
            <div className="ml-3 bg-slate-300 h-20 text-2xl font-bold text-blue-500">
              하나로 마트
              <br />￦{item.expense.toLocaleString()}
            </div>
          </div>
        </div>
      ))}
      <div className="mt-20">지출내역 추가하기</div>
      <input
        className="text-2xl font-bold text-blue-500"
        type="text"
        value={formatCommas(newPay.expense)}
        onChange={addButtonHandler}
      />
      <button className="text-2xl text-blue-500" onClick={addPay}>
        +
      </button>
      <div>
        <p>총 지출 내역(결과페이지에 사용)</p>
        <p className="text-2xl font-bold text-blue-500">
          총 지출: ￦{formatCommas(totalExpense)}
        </p>
      </div>
    </div>
  );
};

export default Pay;
