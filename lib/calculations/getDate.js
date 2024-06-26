export function getDate(date) {
    const current = new Date(date);
    const year = current.getFullYear();
    const month = String(current.getMonth() + 1).padStart(2, '0'); // Months are 0-based
    const day = String(current.getDate()).padStart(2, '0');
  
    return `${year}-${month}-${day}`;
  }