import React, { useEffect, useState } from 'react';

interface Pays {
  place: string;
  expense: number;
}

const Pay = () => {
  const [pay, setPay] = useState<Pays[]>([]);
  const [newPay, setNewPay] = useState<number>(0); // 새로운 금액 입력 상태 추가
  const [totalPay, setTotalPay] = useState<number>(0);

  const changePayHandler = (index: number, inputText: string) => {
    const sanitizedValue = inputText.replace(/,/g, '');
    const expense = sanitizedValue !== '' ? parseFloat(sanitizedValue) : 0;
    const newPay = [...pay];
    newPay[index].expense = expense;
    setPay(newPay);
  };

  const addHandler = () => {
    if (newPay > 0) {
      setPay((prevPay) => [...prevPay, { place: '', expense: newPay }]);
      setNewPay(0);
    }

    setPay((prev) => [...prev, { place: '', expense: newPay }]);
  };

  // 세 자릿 수마다 쉼표 추가
  const formatCommas = (number: number) => {
    return number.toLocaleString();
  };

  // 총 지출 내역
  useEffect(() => {
    const sum = pay.reduce((total, item) => total + item.expense, 0);
    setTotalPay(sum);
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
              하나로마트
              {/* {item.place} */}
              <br />￦{item.expense.toLocaleString()}
            </div>
          </div>
        </div>
      ))}
      <div className="mt-20">지출내역 추가하기</div>
      {pay.map((input, index) => (
        <div key={index}>
          장소
          <input
            className="text-2xl font-bold text-blue-500"
            type="text"
            value={input.place}
            // onChange={(event) => {
            //   const newInputs = [...additionalInputs];
            //   newInputs[index].location = event.target.value;
            //   setAdditionalInputs(newInputs);
            // }}
          />
          금액
          <input
            className="text-2xl font-bold text-blue-500"
            type="text"
            value={formatCommas(input.expense)}
            onChange={(event) => {
              changePayHandler(index, event.target.value);
            }}
          />
        </div>
      ))}
      <button className="text-2xl text-blue-500" onClick={addHandler}>
        추가
      </button>
      <div>
        <p>총 지출 내역(결과페이지에 사용)</p>
        <p className="text-2xl font-bold text-blue-500">
          총 지출: ￦{formatCommas(totalPay)}
        </p>
      </div>
    </div>
  );
};

export default Pay;
