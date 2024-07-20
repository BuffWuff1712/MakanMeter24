const normalizeTo100g = (value, servingWeight) => (value / servingWeight) * 100;

const calculateNegativePoints = (calories, sugars, saturated_fat, sodium, servingWeight) => {
    let points = 0;
    
    // Normalize values to 100g portion
    calories = normalizeTo100g(calories, servingWeight);
    sugars = normalizeTo100g(sugars, servingWeight);
    saturated_fat = normalizeTo100g(saturated_fat, servingWeight);
    sodium = normalizeTo100g(sodium, servingWeight);
    
    // Calories (per 100g)
    if (calories > 1000) points += 10;
    else if (calories > 800) points += 9;
    else if (calories > 600) points += 8;
    else if (calories > 400) points += 7;
    else if (calories > 200) points += 4;
    else if (calories > 100) points += 2;
    else points += 1;
    
    // Sugars (per 100g)
    if (sugars > 45) points += 10;
    else if (sugars > 40) points += 9;
    else if (sugars > 35) points += 8;
    else if (sugars > 30) points += 7;
    else if (sugars > 25) points += 6;
    else if (sugars > 20) points += 5;
    else if (sugars > 15) points += 4;
    else if (sugars > 10) points += 3;
    else if (sugars > 5) points += 2;
    else points += 1;
    
    // Saturated Fat (per 100g)
    if (saturated_fat > 10) points += 10;
    else if (saturated_fat > 8) points += 9;
    else if (saturated_fat > 6) points += 8;
    else if (saturated_fat > 4) points += 7;
    else if (saturated_fat > 2) points += 6;
    else points += 1;
    
    // Sodium (per 100g)
    if (sodium > 2000) points += 10;
    else if (sodium > 1500) points += 8;
    else if (sodium > 1000) points += 6;
    else if (sodium > 500) points += 4;
    else if (sodium > 250) points += 2;
    else points += 1;

    return points;
}

const calculatePositivePoints = (protein, dietary_fiber, vitamins_minerals, servingWeight) => {
    let points = 0;

    // Normalize values to 100g portion
    protein = normalizeTo100g(protein, servingWeight);
    dietary_fiber = normalizeTo100g(dietary_fiber, servingWeight);
    
    // Protein (per 100g)
    if (protein > 10) points += 5;
    else if (protein > 8) points += 4;
    else if (protein > 6) points += 3;
    else if (protein > 4) points += 2;
    else points += 1;
    
    // Dietary Fiber (per 100g)
    if (dietary_fiber > 4) points += 5;
    else if (dietary_fiber > 3) points += 4;
    else if (dietary_fiber > 2) points += 3;
    else if (dietary_fiber > 1) points += 2;
    else points += 1;
    
    // Vitamins and Minerals (combined score)
    if (vitamins_minerals > 100) points += 5;
    else if (vitamins_minerals > 80) points += 4;
    else if (vitamins_minerals > 60) points += 3;
    else if (vitamins_minerals > 40) points += 2;
    else points += 1;

    return points;
}

const calculateVitaminsMineralsScore = (calcium, iron, magnesium, vitamin_a, vitamin_b12, vitamin_c, vitamin_d, zinc, servingWeight) => {
    // Normalize values to 100g portion
    calcium = normalizeTo100g(calcium, servingWeight);
    iron = normalizeTo100g(iron, servingWeight);
    magnesium = normalizeTo100g(magnesium, servingWeight);
    vitamin_a = normalizeTo100g(vitamin_a, servingWeight);
    vitamin_b12 = normalizeTo100g(vitamin_b12, servingWeight);
    vitamin_c = normalizeTo100g(vitamin_c, servingWeight);
    vitamin_d = normalizeTo100g(vitamin_d, servingWeight);
    zinc = normalizeTo100g(zinc, servingWeight);

    return calcium + iron + magnesium + (vitamin_a / 1000) + vitamin_b12 + vitamin_c + (vitamin_d / 1000) + zinc;
}

const calculateHealthScore = (product) => {
    const negative_points = calculateNegativePoints(
        product.calories,
        product.sugars,
        product.saturated_fat,
        product.sodium,
        product.serving_weight_grams
    );
    
    const vitamins_minerals_score = calculateVitaminsMineralsScore(
        product.calcium,
        product.iron,
        product.magnesium,
        product.vitamin_a,
        product.vitamin_b12,
        product.vitamin_c,
        product.vitamin_d,
        product.zinc,
        product.serving_weight_grams
    );

    const positive_points = calculatePositivePoints(
        product.protein,
        product.dietary_fiber,
        vitamins_minerals_score,
        product.serving_weight_grams
    );
    
    const health_score = negative_points - positive_points;
    return health_score;
}

const getNutriScore = (health_score) => {
    if (health_score <= -1) return 'A';
    else if (health_score <= 2) return 'B';
    else if (health_score <= 10) return 'C';
    else if (health_score <= 18) return 'D';
    else return 'E';
}

const getDescription = (grade) => {
    switch (grade) {
        case 'A':
            return "Absolutely Healthy. It's vitamin, micro- and macro-nutrient content makes it a most healthy daily option as part of your meal plan.";
        case 'B':
            return "Healthy if taken in moderation. Nutrient-packed but also contains trans fats, saturated fats, sugar, cholesterol, salt, etc.";
        case 'C':
            return "Neutral as it has essential nutrients and less desirable elements like trans fats and sugar in balance. So take this one easy.";
        case 'D':
            return "Enjoy a small occasional portion as the impact of unhealthy elements it has outweighs the benefits of its nutrients.";
        case 'E':
            return "Should be consumed very sparingly as it is high in undesirable nutrients and low in essential nutrients.";
        default:
            return "";
    }
}

// Export the main function
export const getProductNutriScore = (product) => {
    const health_score = calculateHealthScore(product);
    const nutri_score = getNutriScore(health_score);
    const description = getDescription(nutri_score);
    return { nutri_score, description };
}
