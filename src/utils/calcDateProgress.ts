const calcDateProgress = (start: string, end: string) => {
  const today = new Date();
  const startDay = new Date(start);
  const endDay = new Date(end);

  if (today < startDay) return '0';
  if (today > endDay) return '100';

  const travelTime = Math.abs(startDay.getTime() - endDay.getTime());
  const todayTime = Math.abs(startDay.getTime() - today.getTime());
  const progress = (todayTime / travelTime) * 100;
  const result = progress.toFixed();

  return result;
};

export default calcDateProgress;
