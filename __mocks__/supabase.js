export const supabase = {
  auth: {
    signUp: jest.fn(() => Promise.resolve({ user: { id: 'mockUserId' }, error: null })),
    signInWithPassword: jest.fn(() => Promise.resolve({ data: { user: { id: 'mockUserId' } }, error: null })),
    getUser: jest.fn(() => Promise.resolve({ data: { user: { id: 'mockUserId' } } })),
    signOut: jest.fn(() => Promise.resolve({ error: null })),
    startAutoRefresh: jest.fn(),
    stopAutoRefresh: jest.fn(),
    resetPasswordForEmail: jest.fn(() => Promise.resolve({ data: {}, error: null })),
  },
  from: jest.fn(() => ({
    select: jest.fn().mockReturnThis(),
    eq: jest.fn().mockReturnThis(),
    single: jest.fn(() => Promise.resolve({ data: {}, error: null })),
    update: jest.fn().mockReturnThis(),
    insert: jest.fn().mockReturnThis(),
    delete: jest.fn().mockReturnThis(),
    upsert: jest.fn().mockReturnThis(),
    rpc: jest.fn(() => Promise.resolve({ data: [], error: null })),
  })),
  storage: {
    from: jest.fn(() => ({
      upload: jest.fn(() => Promise.resolve({ data: {}, error: null })),
      getPublicUrl: jest.fn(() => Promise.resolve({ data: { publicUrl: 'mockUrl' }, error: null })),
    })),
  },
};

export const createUser = jest.fn(() => Promise.resolve({ user: { id: 'mockUserId' }, error1: null, error2: null }));
export const signIn = jest.fn(() => Promise.resolve({ data: { user: { id: 'mockUserId' } }, error: null }));
export const getCurrentUser = jest.fn(() => Promise.resolve('mockUserId'));
export const signOut = jest.fn(() => Promise.resolve({ error: null }));
export const getMealID = jest.fn(() => Promise.resolve('mockMealId'));
export const createMealID = jest.fn(() => Promise.resolve('mockMealId'));
export const getOrCreateMealID = jest.fn(() => Promise.resolve('mockMealId'));
export const addMeal = jest.fn(() => Promise.resolve('mockMealId'));
export const updateMealMacros = jest.fn(() => Promise.resolve('mockMealId'));
export const insertFoodItems = jest.fn(() => Promise.resolve());
export const upsertMealItem = jest.fn(() => Promise.resolve());
export const updateMealItemQuantity = jest.fn(() => Promise.resolve());
export const getTrackedMeals = jest.fn(() => Promise.resolve([]));
export const getMealsForDate = jest.fn(() => Promise.resolve({}));
export const deleteMealItem = jest.fn(() => Promise.resolve());
export const getOrCreateAndFetchMeals = jest.fn(() => Promise.resolve([]));
export const getDailyTrends = jest.fn(() => Promise.resolve([]));
export const getWeeklyTrends = jest.fn(() => Promise.resolve([]));
export const getMonthlyTrends = jest.fn(() => Promise.resolve([]));
export const updateUser = jest.fn(() => Promise.resolve([]));
export const getEmail = jest.fn(() => Promise.resolve('mockEmail@example.com'));
export const userWeekHistory = jest.fn(() => Promise.resolve([]));
export const userMonthHistory = jest.fn(() => Promise.resolve([]));
export const addFavouriteFood = jest.fn(() => Promise.resolve());
export const removeFavouriteFood = jest.fn(() => Promise.resolve());
export const checkIsFavouriteFood = jest.fn(() => Promise.resolve([]));
export const getFavoriteFoods = jest.fn(() => Promise.resolve([]));
export const submitNewTarget = jest.fn(() => Promise.resolve());
export const fetchGoal = jest.fn(() => Promise.resolve(0));
export const fetchMacroGoals = jest.fn(() => Promise.resolve({ carbohydrates: 0, protein: 0, fats: 0 }));
export const fetchWaterIntake = jest.fn(() => Promise.resolve(1.5));
export const updateWaterIntake = jest.fn(() => Promise.resolve());
export const fetchStreak = jest.fn(() => Promise.resolve({ current_streak: 0, last_logged_date: '2023-07-01' }));
export const updateStreak = jest.fn(() => Promise.resolve());
export const sendPasswordReset = jest.fn(() => Promise.resolve());
export const getUserDetails = jest.fn(() => Promise.resolve({}));
export const updateProfilePic = jest.fn(() => Promise.resolve('mockUrl'));
