export function areDatesConsecutive(date1, date2) {
    console.log(date1);
    console.log(date2);
    const day1 = new Date(date1.getFullYear(), date1.getMonth(), date1.getDate());
    const day2 = new Date(date2.getFullYear(), date2.getMonth(), date2.getDate());
  
    // Calculate the difference in days
    const differenceInTime = day1.getTime() - day2.getTime();
    const differenceInDays = differenceInTime / (1000 * 3600 * 24);
  
    return differenceInDays === 1;
  }