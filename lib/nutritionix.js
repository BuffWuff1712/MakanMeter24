const axios = require('axios').default;
const instantUrl = 'https://trackapi.nutritionix.com/v2/search/instant';
const naturalUrl = 'https://trackapi.nutritionix.com/v2/natural/nutrients';

const appId = process.env.NUTRITIONIX_USER_ID;
const appKey = process.env.NUTRITIONIX_API_KEY;


export async function fetchSuggestions(food, trackedMeals) {
    if (food.length < 3) {
        return [];
    }

    try {
        const response = await axios.get(instantUrl, {
            headers: {
                'x-app-id': appId,
                'x-app-key': appKey,
                'x-remote-user-id': '0'
            },
            params: {
                'query': food,
                'common': true
            }
        });

        const searchResults = response.data.common;
        const uniqueFoods = [];
        const tagIds = new Set();

        searchResults.forEach(item => {
            if (!tagIds.has(item.tag_id) && !trackedMeals.some(meal => meal.food_name.toLowerCase() === item.food_name.toLowerCase())) {
                tagIds.add(item.tag_id);
                uniqueFoods.push({
                    id: item.tag_id,
                    food_name: item.food_name,
                    serving_qty: item.serving_qty,
                    serving_unit: item.serving_unit,
                    serving_weight_grams: item.serving_weight_grams,
                });
            }
        });

        return uniqueFoods;
    } catch (error) {
        console.error('Error fetching suggestions @ API:', error.message);
        return [];
    }
};

export async function fetchNutritionInfo(food) {
    try {
        const tempArr = [];
        const response = await axios.post(naturalUrl, {
            query: food
        }, {
            headers: {
                'x-app-id': appId,
                'x-app-key': appKey,
                'x-remote-user-id': '0',
                'Content-Type': 'application/json'
            }
        });

        tempArr.push(response.data.foods[0]);
        return tempArr;
    } catch (error) {
        console.error('Error fetching data @ API:', error.message);
        return null;
    }
};


