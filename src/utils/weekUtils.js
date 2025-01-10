export const getWeekInfo = () => {
  const now = new Date();
  const day = now.getDay(); // 0 is Sunday, 6 is Saturday
  const daysLeft = day <= 5 ? 5 - day : 7 + (5 - day); // Counting until Friday
  
  return {
    day,
    daysLeft,
    isWeekend: day === 0 || day === 6,
    dayName: ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'][day],
    suggestedGoalLimit: calculateSuggestedGoals(daysLeft)
  };
};

const calculateSuggestedGoals = (daysLeft) => {
  if (daysLeft >= 4) return 5; // Full week ahead
  if (daysLeft >= 2) return 3; // Few days left
  if (daysLeft >= 1) return 2; // Only one or two days
  return 1; // It's Friday or weekend
};

export const getWeekProgress = () => {
  const now = new Date();
  const day = now.getDay();
  const totalDays = 5; // Monday to Friday
  const completedDays = Math.min(day >= 1 ? day - 1 : 0, totalDays);
  
  return {
    completedDays,
    totalDays,
    percentage: (completedDays / totalDays) * 100
  };
};