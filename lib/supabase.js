import 'react-native-url-polyfill/auto'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.SUPABASE_URL
const supabaseAnonKey = process.env.SUPABASE_ANON_KEY


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
  const { user, error } = await supabase.auth.signUp({
    email,
    password,
  });

  if (error) throw error;

  // // Optionally, you can update the user profile with the username
  // const { data, error: updateError } = await supabase
  //   .from('profiles')
  //   .upsert([{ id: user.id, username }]);

  // if (updateError) throw updateError;

  return user;
};

/**
 * Signs in a user with email and password.
 * @param {string} email - The email of the user.
 * @param {string} password - The password of the user.
 * @returns {object} The user data.
 */
export async function signIn(email, password) {

  try {
    const data = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    return data.data;
  } catch (error) {
    throw new Error(error);
  } 
};

/**
 * Gets the current authenticated user.
 * @returns {object} The current user data.
 */
export async function getCurrentUser() {
  const { data: {user}} = await supabase.auth.getUser()
  //console.log(user)
  //console.log("----------------------------------------")

  return user;
};


export async function signOut() {
  const { error } = await supabase.auth.signOut()

  //console.log(user)
  //console.log("----------------------------------------")
  console.log(error)
  return error;
};

export default supabase;