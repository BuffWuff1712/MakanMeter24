export function calculateCalorieNeeds(data) {
    let { gender, height, weight, age, activityLevel } = data;

    console.log('data: ', data);
    let bmr;

    // Calculate BMR using the Harris-Benedict Equation
    if (gender === 'Male') {
        bmr = 88.362 + (13.397 * weight) + (4.799 * height) - (5.677 * age);
    } else if (gender === 'Female') {
        bmr = 447.593 + (9.247 * weight) + (3.098 * height) - (4.330 * age);
    } else {
        // Calculate average BMR for non-binary or unspecified genders
        let bmrMale = 88.362 + (13.397 * weight) + (4.799 * height) - (5.677 * age);
        let bmrFemale = 447.593 + (9.247 * weight) + (3.098 * height) - (4.330 * age);
        bmr = (bmrMale + bmrFemale) / 2; // Average of male and female BMR
    }

    // Convert BMR based on activity level
    let multiplier = 0;
    switch (activityLevel) {
        case 'Sedentary':
            multiplier = 1.2;
            break;
        case 'Lightly Active':
            multiplier = 1.375;
            break;
        case 'Moderately Active':
            multiplier = 1.55;
            break;
        case 'Highly Active':
            multiplier = 1.725;
            break;
        case 'Extremely Active':
            multiplier = 1.9;
            break;
        default:
            return { error: "Invalid activity level" }; // Error handling for incorrect activity level input
    }

    // Calculate total daily calorie needs
    let tdee = Math.round(bmr * multiplier);

    // Providing a recommended range
    let calorieRangeLower = Math.round(tdee * 0.95);
    let calorieRangeUpper = Math.round(tdee * 1.05);

    return {
       calorieRangeLower,
       calorieRangeUpper,
       tdee,
    };
}
