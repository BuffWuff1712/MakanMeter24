// Follow this setup guide to integrate the Deno language server with your editor:
// https://deno.land/manual/getting_started/setup_your_environment
// This enables autocomplete, go to definition, etc.

// Setup type definitions for built-in Supabase Runtime APIs
import "https://esm.sh/v135/@supabase/functions-js@2.4.2/src/edge-runtime.d.ts"
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.44.4';


const supabase = createClient(
  Deno.env.get('SUPABASE_URL')!,
  Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!
)

Deno.serve(async () => {

  const currentDate = new Date();

  const { data: userList } = await supabase
    .from('users')
    .select('*')

  try {
      if (userList !== null) {
        console.log(userList);
        for (const item of userList) {

          const { data } = await supabase
            .from('streaks')
            .select('last_logged_date')
            .eq('user_id', item.user_id)
            .single();
          
          if (new Date(data?.last_logged_date) < currentDate) {
            const { data: _res } = await supabase
              .from('notifications')
              .insert([
                { user_id: item.user_id,
                  title: 'Continue your streak!', 
                  body: 'remember to log in your meal today to continue your streak!' }
              ]);
          }
        }
      }

      return new Response(
        JSON.stringify('Checking was successful'),
        { headers: { "Content-Type": "application/json" } },
      );

    } catch (error) {
      return new Response(
        JSON.stringify(error),
        { headers: { "Content-Type": "application/json" } },
      );
    }
    
  
})

/* To invoke locally:

  1. Run `supabase start` (see: https://supabase.com/docs/reference/cli/supabase-start)
  2. Make an HTTP request:

  curl -i --location --request POST 'http://127.0.0.1:54321/functions/v1/push_notifications' \
    --header 'Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZS1kZW1vIiwicm9sZSI6ImFub24iLCJleHAiOjE5ODM4MTI5OTZ9.CRXP1A7WOeoJeXxjNni43kdQwgnWNReilDMblYTn_I0' \
    --header 'Content-Type: application/json' \
    --data '{"name":"Functions"}'

*/
