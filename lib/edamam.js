const axios = require('axios').default;


async function fetchNutritionInfo(ingredient) {
    try {

        // Make HTTP request to Edamam API
        const response = await axios.get('https://api.edamam.com/api/food-database/v2/parser',
            {params: {
                ingr: ingredient,
                app_id: process.env.EDAMAM_USER_ID, // Replace with your Edamam app ID
                app_key: process.env.EDAMAM_API_KEY, // Replace with your Edamam app key
            }}
        );
        

        // Extract nutrition info from the response
        const { parsed } = response.data;

        // Return nutrition info
        return parsed;
    } catch (error) {
        console.error('Error fetching data @ API:', error.message);
        throw error;
    }
}


// Function to transform the response into the desired format
function transformResponseToIngredients(response) {
    if (!response || response.length === 0) {
        throw new Error('Invalid response');
    }

    return response.map(item => {
        if (item.food) {
            return {
                label: item.food.label,
                cal: item.food.nutrients.ENERC_KCAL,
                nutrients: item.food.nutrients
            };
        } else {
            throw new Error('Invalid food item');
        }
    });
}

// Fetch nutrition info for each ingredient
async function fetchNutritionInfoForIngredients(ingredients) {
    try {
        const nutritionInfoPromises = ingredients.map(ingredient => fetchNutritionInfo(ingredient));
        const nutritionInfoList = await Promise.all(nutritionInfoPromises);
        const finalList= nutritionInfoList.flatMap(
            nutritionInfo => 
                transformResponseToIngredients(nutritionInfo));
        console.log(finalList);
        return finalList;
    } catch (error) {
        console.error('Error fetching nutrition info for ingredients:', error.message);
        throw error;
    }
}

// // Exporting the analyse function
export { fetchNutritionInfoForIngredients };

