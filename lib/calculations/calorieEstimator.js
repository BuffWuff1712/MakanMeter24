// Function to calculate TDEE and caloric needs
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

    // Calculate total daily calorie needs (TDEE)
    let tdee = Math.round(bmr * multiplier);

    return {
       tdee,
    };
}

// Function to calculate macronutrient needs based on TDEE
export function calculateMacronutrientNeeds(tdee) {
    // Define the percentage ranges for macronutrients
    const carbPercentage = { min: 0.45, max: 0.65 };
    const proteinPercentage = { min: 0.10, max: 0.35 };
    const fatPercentage = { min: 0.20, max: 0.35 };

    // Calculate grams of each macronutrient based on calorie needs
    const carbs = Math.round(((tdee * (carbPercentage.min + carbPercentage.max) / 2) / 4));
    const protein = Math.round(((tdee * (proteinPercentage.min + proteinPercentage.max) / 2) / 4));
    const fats = Math.round(((tdee * (fatPercentage.min + fatPercentage.max) / 2) / 9));

    return {
        carbs,
        protein,
        fats
    };
}