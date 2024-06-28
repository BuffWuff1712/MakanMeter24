export function calculateTotals(mealItems) {
    // Initialize totals
    let totalCalories = 0;
    let totalCarbohydrates = 0;
    let totalProtein = 0;
    let totalFats = 0;
  
    // Iterate through each meal item and sum up the nutritional values
    mealItems.forEach(item => {
      totalCalories += item.calories * item.quantity;
      totalCarbohydrates += item.carbohydrates * item.quantity;
      totalProtein += item.protein * item.quantity;
      totalFats += item.fats * item.quantity;
    });
  
    // Return the results in an accessible format
    return {
      totalCalories,
      totalCarbohydrates,
      totalProtein,
      totalFats
    };
  }