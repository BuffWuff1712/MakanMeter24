const axios = require('axios').default;
const instantUrl = 'https://trackapi.nutritionix.com/v2/search/instant';
const naturalUrl = 'https://trackapi.nutritionix.com/v2/natural/nutrients';
const upcUrl = 'https://trackapi.nutritionix.com/v2/search/item'

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
        
        return response.data.foods;
    } catch (error) {
        console.error('Error fetching data @ Nutritionix API:', error.message);
        return null;
    }
};

export async function fetchNutritionInfoForDishes(dishNames) {
    try {
      const allResults = [];
      const foodNameSet = new Set();
  
      for (const dish of dishNames) {
        const foods = await fetchNutritionInfo(dish);
        for (const food of foods) {
          if (!foodNameSet.has(food.food_name)) {
            foodNameSet.add(food.food_name);
            allResults.push(food);
          }
        }
      }
  
      return allResults;
    } catch (error) {
      console.error('Error fetching nutrition info for dishes:', error.message);
      return [];
    }
}

export async function getBarcodeInfo(barcode) {
    try {
        const response = await axios.get(upcUrl, 
        {
            headers: {
                'x-app-id': appId,
                'x-app-key': appKey,
                'x-remote-user-id': '0',
                'Content-Type': 'application/x-www-form-urlencoded'
            },
            params: {
                'upc': barcode,
            }
        });
        
        return response.data.foods[0];
    } catch (error) {
        console.log('Error fetching data @ Nutritionix API:', error.message);
        return null;
    }
}


