export const calculateDday = (date: Date): string => {
  const currentDate = new Date();
  const targetDate = new Date(date);

  if (targetDate.toLocaleDateString() === currentDate.toLocaleDateString()) {
    return 'D-Day';
  } else if (targetDate < currentDate) {
    const daysCount = Math.ceil(
      (currentDate.getTime() - targetDate.getTime()) / (1000 * 60 * 60 * 24),
    );
    return `D+${daysCount}`;
  } else {
    const daysCount = Math.ceil(
      (targetDate.getTime() - currentDate.getTime()) / (1000 * 60 * 60 * 24),
    );
    return `D-${daysCount}`;
  }
};
