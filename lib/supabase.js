import AsyncStorage from '@react-native-async-storage/async-storage'
import { createClient } from '@supabase/supabase-js'
import { Alert, AppState } from 'react-native'
import moment from 'moment';


const supabaseUrl = process.env.SUPABASE_URL
const supabaseAnonKey = process.env.SUPABASE_ANON_KEY

// Tells Supabase Auth to continuously refresh the session automatically
// if the app is in the foreground. When this is added, you will continue
// to receive `onAuthStateChange` events with the `TOKEN_REFRESHED` or
// `SIGNED_OUT` event if the user's session is terminated. This should
// only be registered once.
AppState.addEventListener('change', (state) => {
  if (state === 'active') {
    supabase.auth.startAutoRefresh()
  } else {
    supabase.auth.stopAutoRefresh()
  }
});

// Create a Supabase client instance
export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    storage: AsyncStorage,
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: false,
  },
})


/**
 * Creates a new user with email, password, and username.
 * @param {string} email - The email of the new user.
 * @param {string} password - The password of the new user.
 * @param {string} username - The username of the new user.
 * @returns {object} The user data.
 */
export async function createUser(email, password, username) {
  const { user, error1 } = await supabase.auth.signUp({
    email,
    password,
  });

  if (error1) throw error1;

  
  const { data, error2 } = await supabase
  .from('users')
  .update({ 
    username: username,
    age: 21,
    gender: 'male',
    height: 170,
    weight: 60,
  })
  .eq('email', email)
  .select()
          
  if (error2) throw error2;
};

/**
 * Signs in a user with email and password.
 * @param {string} email - The email of the user.
 * @param {string} password - The password of the user.
 * @returns {object} The user data.
 */
export async function signIn(email, password) {

  const { error } = await supabase.auth.signInWithPassword({
      email: email,
      password: password,
  });

  if (error) Alert.alert(error.message);

};

/**
 * Gets the current authenticated user.
 * @returns {object} The current user data.
 */
export async function getCurrentUser() {
  const {data: {user}} = await supabase.auth.getUser();
  return user.id;
};


export async function signOut() {
  const { error } = await supabase.auth.signOut()

  //console.log(user)
  //console.log("----------------------------------------")
  console.log(error)
  return error;
};

export async function getMealID(userId, mealType, date) {
  // Check if the meal already exists
  const formatted_date = getDate(date);
  const { data: existingMeal, error: fetchError } = await supabase
      .from('meal')
      .select('*')
      .eq('user_id', userId)
      .eq('meal_type', mealType)
      .eq('date', formatted_date);
  

  if (fetchError) {
      console.error('Error fetching existing meal:', fetchError);
      return null;
  }

  if (existingMeal.length > 0) {
      // Meal already exists, return the existing meal ID
      return existingMeal[0].meal_id;
  }

}

export async function createMealID(userId, mealType, date) {
  // Meal does not exist, create a new meal
  const formatted_date = getDate(date);
  const { data: newMeal, error: insertError } = await supabase
      .from('meal')
      .insert([
          { user_id: userId, meal_type: mealType, date: formatted_date }
      ])
      .select();  // Ensure single object is returned

  if (insertError) {
      console.error('Error logging new meal:', insertError);
      return null;
  }

  return newMeal[0].meal_id;
}

// Function to get or create meal ID
export async function getOrCreateMealID(userId, mealType, date) {
  const formatted_date = getDate(date);
  let mealId = await getMealID(userId, mealType, formatted_date);

  if (!mealId) {
    mealId = await createMealID(userId, mealType, formatted_date);
  }

  return mealId;
}

export async function addMeal(jsonData, mealType, date) {
  try {
    const user = await getCurrentUser();
    const formatted_date = getDate(date);
    const meal_id = await getMealID(user, mealType, formatted_date);

    // Insert items into food_item and meal_item tables
    await insertFoodItems(meal_id, jsonData);

    // Update Meal macro totals in meal table
    await updateMealMacros(meal_id);

    console.log('Successfully added meal to Supabase!');

    return meal_id;
  } catch (error) {
    console.error('Error adding meal:', error);
    throw error;
  }
};

export async function updateMealMacros(meal_id) {
  try {
    const mealItems = await getTrackedMeals(meal_id);
    const result = calculateTotals(mealItems);

    const { data, error } = await supabase
      .from('meal')
      .update(
        {
          total_calories: result.totalCalories,
          carbohydrates: result.totalCarbohydrates,
          protein: result.totalProtein,
          fats: result.totalFats,
        }
      )
      .eq('meal_id', meal_id)
      .select();

    if (error) {
      console.error('Error updating meal:', error);
      throw error;
    } else {
      console.log('Successfully updated meal in Supabase!');
    }

    return meal_id;
  } catch (error) {
    console.error('Error in updateMealMacros:', error);
    throw error;
  }
};


async function insertFoodItems(meal_id, data) {
  for (const item of data) {
    // Check if the food item already exists
    const { data: existingItems, error: selectError } = await supabase
      .from('food_item')
      .select('*')
      .eq('food_name', item.food_name);

    if (selectError) {
      console.error('Error checking for existing food item:', selectError);
      continue;
    }

    if (existingItems.length === 0) {
      // Insert the food item if it does not exist
      try {
        const { data: insertedItems, error: insertError } = await supabase
          .from('food_item')
          .insert([
            {
              food_name: item.food_name,
              serving_size: item.serving_unit,
              calories: item.nf_calories ?? 0,
              carbohydrates: item.nf_total_carbohydrate ?? 0,
              protein: item.nf_protein ?? 0,
              fats: item.nf_total_fat ?? 0,
              saturated_fat: item.nf_saturated_fat ?? 0,
              polyunsaturated_fat: item.full_nutrients[90]?.value ?? 0,
              monounsaturated_fat: item.full_nutrients[89]?.value ?? 0,
              cholesterol: item.nf_cholesterol ?? 0,
              sodium: item.nf_sodium ?? 0,
              potassium: item.nf_potassium ?? 0,
              dietary_fiber: item.nf_dietary_fiber ?? 0,
              sugars: item.sugars ?? 0,
              vitamin_a: item.full_nutrients[27]?.value ?? 0,
              vitamin_c: item.full_nutrients[50]?.value ?? 0,
              vitamin_d: item.full_nutrients[30]?.value ?? 0,
              calcium: item.full_nutrients[18]?.value ?? 0,
              iron: item.full_nutrients[19]?.value ?? 0,
              zinc: item.full_nutrients[23]?.value ?? 0,
              vitamin_b12: item.full_nutrients[53]?.value ?? 0,
              magnesium: item.full_nutrients[20]?.value ?? 0,
            }
          ])
          .select();

        if (insertError) {
          console.error('Error inserting food item: ', insertError);
          continue;
        }

        const foodItemId = insertedItems[0].food_item_id;

        await upsertMealItem(meal_id, foodItemId, item.serving_qty);
      } catch (error) {
        console.error('Error processing food item: ', error);
      }
    } else {
      const foodItemId = existingItems[0].food_item_id;
      console.log('Food item already exists:', item.food_name);
      await upsertMealItem(meal_id, foodItemId, item.serving_qty);
    }
  }
}

export async function upsertMealItem(meal_id, food_item_id, quantity) {
  console.log('quantity: ', quantity);
  const { data, error } = await supabase
      .from('meal_item')
      .insert([
        {
          meal_id: meal_id,
          food_item_id: food_item_id,
          quantity: quantity,
        }
      ])
  
  if (error) {
    console.error('Error inserting meal item:', error);
    return;
  }

  //**WILL USE THIS FUNCTION LATER ON */
  // // First, check if the meal item already exists
  // const { data: existingItem, error: checkError } = await supabase
  //   .from('meal_item')
  //   .select('quantity')
  //   .eq('meal_id', meal_id)
  //   .eq('food_item_id', food_item_id)
  //   .single();

  // if (checkError && checkError.code !== 'PGRST116') {
  //   console.error('Error checking existing meal item:', checkError);
  //   return;
  // }

  // if (existingItem) {
  //   // If it exists, update the quantity
  //   const { data, error } = await supabase
  //     .from('meal_item')
  //     .update({ quantity: existingItem.quantity + 1 })
  //     .eq('meal_id', meal_id)
  //     .eq('food_item_id', food_item_id);

  //   if (error) {
  //     console.error('Error updating meal item quantity:', error);
  //   } else {
  //     console.log('Meal item quantity updated:', data);
  //   }
  // } else {
  //   // If it does not exist, insert a new record with quantity 1
  //   const { data, error } = await supabase
  //     .from('meal_item')
  //     .insert([
  //       {
  //         meal_id: meal_id,
  //         food_item_id: food_item_id,
  //         quantity: 1
  //       }
  //     ]);

  //   if (error) {
  //     console.error('Error inserting meal item:', error);
  //   } else {
  //     console.log('Meal item inserted:', data);
  //   }
  // }
}

export async function updateMealItemQuantity(meal_item_id, newQuantity) {
  try {
    const { data, error } = await supabase
      .from('meal_item')
      .update({ quantity: newQuantity })
      .eq('meal_item_id', meal_item_id);

    if (error) {
      throw error;
    }

    console.log('Quantity updated successfully:', data);
    return data;
  } catch (error) {
    console.error('Error updating quantity:', error.message);
    return null;
  }
}

export async function getTrackedMeals(meal_id) {
  // Fetch all food item IDs associated with the given meal ID
  const { data: mealItems, error } = await supabase
    .from('meal_item')
    .select('meal_item_id, quantity, food_item(food_name, calories, carbohydrates, protein, fats, serving_size)')
    .eq('meal_id', meal_id);
  
  if (error) {
    console.error(`Error fetching items for ${mealType}:`, error);
  }

  // Flatten the JSON structure
  const flattenedMealItems = mealItems.map(item => ({
    meal_item_id: item.meal_item_id,
    quantity: item.quantity,
    ...item.food_item
  }));

  // Output the flattened nutritional information
  return flattenedMealItems;
}

export async function getMealsForDate(userId, date) {
  const formatted_date = getDate(date);
  const mealTypes = ['Breakfast', 'Lunch', 'Dinner', 'Snack'];
  const mealsData = {};

  let totalCalories = 0;
  let totalCarbs = 0;
  let totalProtein = 0;
  let totalFats = 0;

  for (const mealType of mealTypes) {
    const mealId = await getMealID(userId, mealType, formatted_date);

    if (mealId) {
      const { data: mealItems, error } = await supabase
        .from('meal_item')
        .select('meal_item_id, quantity, food_item(food_name, calories, carbohydrates, protein, fats)')
        .eq('meal_id', mealId);

      if (error) {
        console.error(`Error fetching items for ${mealType}:`, error);
        mealsData[mealType] = { mealId, items: [], totalCalories: 0 };
        continue;
      }

      const items = mealItems.map((item) => ({
        ...item,
        food_name: item.food_item.food_name,
        calories: item.food_item.calories * item.quantity,
        carbohydrates: item.food_item.carbohydrates * item.quantity,
        protein: item.food_item.protein * item.quantity,
        fats: item.food_item.fats * item.quantity,
      }));

      const mealTotalCalories = items.reduce((sum, item) => sum + item.calories, 0);
      const mealTotalCarbs = items.reduce((sum, item) => sum + item.carbohydrates, 0);
      const mealTotalProtein = items.reduce((sum, item) => sum + item.protein, 0);
      const mealTotalFats = items.reduce((sum, item) => sum + item.fats, 0);

      mealsData[mealType] = {
        mealId,
        items,
        totalCalories: mealTotalCalories,
        totalCarbs: mealTotalCarbs,
        totalProtein: mealTotalProtein,
        totalFats: mealTotalFats,
      };

      totalCalories += mealTotalCalories;
      totalCarbs += mealTotalCarbs;
      totalProtein += mealTotalProtein;
      totalFats += mealTotalFats;
    } else {
      mealsData[mealType] = { mealId: null, items: [], totalCalories: 0 };
    }
  }

  mealsData['Summary'] = {
    totalCalories,
    totalCarbs,
    totalProtein,
    totalFats,
  };

  const noMeals = Object.values(mealsData).every(meal => meal.items && meal.items.length === 0);
  
  return noMeals ? null : mealsData;
}


export async function deleteMealItem(mealItemID) {
  const { data, error } = await supabase
    .from('meal_item')
    .delete()
    .eq('meal_item_id', mealItemID);

  if (error) {
    console.error('Error deleting meal item warning 1:', error);
    return;
  }

  console.log('Meal item deleted:', data);
}

export async function getOrCreateAndFetchMeals(userId, mealType, date) {
  const formattedDate = getDate(date);

  const { data, error } = await supabase
    .rpc('get_or_create_meal_and_fetch_items', {
      p_user_id: userId,
      p_meal_type: mealType,
      p_meal_date: formattedDate
    });

  if (error) {
    console.error('Error fetching or creating meal:', error);
    return null;
  }

  const mealId = data.length > 0 ? data[0].meal_id : null;

  const mealItems = data.filter(item => item.meal_item_id).map(item => ({
    meal_item_id: item.meal_item_id,
    quantity: item.quantity,
    food_name: item.food_name,
    calories: item.calories,
    carbohydrates: item.carbohydrates,
    protein: item.protein,
    fats: item.fats,
    saturated_fat: item.saturated_fat,
    polyunsaturated_fat: item.polyunsaturated_fat,
    monounsaturated_fat: item.monounsaturated_fat,
    cholesterol: item.cholesterol,
    sodium: item.sodium,
    potassium: item.potassium,
    dietary_fiber: item.dietary_fiber,
    sugars: item.sugars,
    vitamin_a: item.vitamin_a,
    vitamin_c: item.vitamin_c,
    calcium: item.calcium,
    iron: item.iron,
    vitamin_d: item.vitamin_d,
    zinc: item.zinc,
    vitamin_b12: item.vitamin_b12,
    magnesium: item.magnesium,
  }));

  return mealItems;
}


export async function getDailyTrends(userId) {
  const endDate = new Date();
  const startDate = new Date();
  startDate.setDate(endDate.getDate() - 6);

  const { data, error } = await supabase
    .rpc('daily_trends', {
      user_id_input: userId,
      start_date: getDate(startDate),
      end_date: getDate(endDate),
    });

  if (error) {
    console.error('Error fetching daily trends:', error);
    return null;
  }

  // Format dates to 'dd/mm'
  const formattedData = data.map(item => ({
    ...item,
    meal_date: moment(item.meal_date).format('DD/MM'),
  }));

  return formattedData;
}

export async function getWeeklyTrends(userId) {
  const endDate = new Date();
  const startDate = new Date();
  startDate.setDate(endDate.getDate() - 28); // Last 4 weeks

  const { data, error } = await supabase
    .rpc('weekly_trends', {
      user_id_input: userId,
      start_date: getDate(startDate),
      end_date: getDate(endDate),
    });

  if (error) {
    console.error('Error fetching weekly trends:', error);
    return [];
  }

  // Format week_start_date to 'dd/mm'
  const formattedData = data.map(item => ({
    ...item,
    week_start_date: moment(item.week_start_date).format('DD/MM'),
  }));

  return formattedData;
}

export async function getMonthlyTrends(userId) {
  const endDate = new Date();
  const startDate = new Date();
  startDate.setMonth(endDate.getMonth() - 6);

  const { data, error } = await supabase
    .rpc('monthly_trends', {
      user_id_input: userId,
      start_date: getDate(startDate),
      end_date: getDate(endDate),
    });

  if (error) {
    console.error('Error fetching monthly trends:', error);
    return null;
  }

  return data;
}

      
export function getDate(date) {
  const current = new Date(date);
  const year = current.getFullYear();
  const month = String(current.getMonth() + 1).padStart(2, '0'); // Months are 0-based
  const day = String(current.getDate()).padStart(2, '0');

  return `${year}-${month}-${day}`;
}

export async function updateUser(userId, userData) {
  try {
    const { data, error } = await supabase
      .from('users')
      .update(userData)
      .eq('user_id', userId);

    if (error) {
      throw error;
    }

    return data;
  } catch (error) {
    console.error('Error updating user:', error.message);
  }
}

export async function getEmail(userId) {
  try {
    const { data, error } = await supabase
      .from('users')
      .select('email')
      .eq('user_id', userId);

    if (error) {
      throw error;
    }

    return data[0].email;
  } catch (error) {
    console.error('Error fetching email:', error.message);
  }
}

export async function weekWeightHistory(userId) {
  const endDate = new Date();
  const startDate = new Date();
  startDate.setDate(endDate.getDate() - 6);

  const { data, error } = await supabase
    .rpc('week_weight_history', {
      user_id_input: userId,
      start_date: getDate(startDate),
      end_date: getDate(endDate),
    });

  if (error) {
    console.error('Error fetching week weight history:', error);
    return null;
  }

  // Format dates to 'dd/mm'
  const formattedData = data.map(item => ({
    ...item,
    record_date: moment(item.record_date).format('DD/MM'),
  }));

  return formattedData;
}

export async function MonthWeightHistory(userId) {
  const endDate = new Date();
  const startDate = new Date();
  startDate.setDate(endDate.getDate() - 29);

  const { data, error } = await supabase
    .rpc('last_30_days_weight_history', {
      user_id_input: userId,
    });

  if (error) {
    console.error('Error fetching last 30 days weight history:', error);
    return null;
  }

  // Format dates to 'dd/mm'
  const formattedData = data.map(item => ({
    ...item,
    record_date: moment(item.record_date).format('DD/MM'),
  }));

  return formattedData;
}

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

export async function changePassword(email, currentPassword, newPassword) {
  try {
    // Sign in the user with current credentials
    const { user, error } = await supabase.auth.signIn({
      email,
      password: currentPassword,
    });

    if (error) {
      throw new Error('Current password is incorrect.');
    }

    // Update the password
    const { error: updateError } = await supabase.auth.update({
      password: newPassword,
    });

    if (updateError) {
      throw updateError;
    }

    return { success: true };
  } catch (error) {
    console.error('Error changing password:', error.message);
    return { error: error.message };
  }
}
export default supabase;

