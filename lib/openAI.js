const { OpenAI } = require('openai');


// OpenAI API Key
const apiKey = process.env.OPEN_AI_API_KEY;

// OpenAI API Configuration
const openai = new OpenAI({
    apiKey: apiKey,
    organization: "org-n1BjtX0EwFyCRVxpBfBJ3aD4",
});

const prompt = `identify the dish or dishes and return 10 possibilities always using the following JSON form: 
                {"possible_dish_names": [
                  "dish_name_1",
                  "dish_name_2",
                  "dish_name_3",
                  "dish_name_4",
                  "dish_name_5",
                  "dish_name_6",
                  "dish_name_7",
                  "dish_name_8",
                  "dish_name_9",
                  "dish_name_10",
                ] 
              };`

async function analyse(image) {
  try {
      const base64Image = image;
      
      const response = await openai.chat.completions.create({
          model: "gpt-4o",
          messages: [
              {
                  role: "user",
                  content: [
                      { type: "text", 
                        text: prompt },
                      {
                          type: "image_url",
                          image_url: {
                              "url": `data:image/jpeg;base64,${base64Image}`,
                          },
                      },
                  ],
              },
          ],
          max_tokens: 2000,
      });
    
      // Extracting content from the provided JSON data
      const content = response.choices[0].message.content;

      console.log('raw content from OpenAI: ', content);

      // Extracting JSON string from the content
      const jsonString = content.includes("```json\n") && content.includes("\n```") 
      ? content.split("```json\n")[1].split("\n```")[0]
      : content;


      // Loading JSON string into a JavaScript object
      const jsonData = JSON.parse(jsonString);

      // returning the extracted JSON data
      return jsonData;
  } catch (error) {
      console.log("Error:", error);
      throw error;
  }
}

// Exporting the analyse function
export { analyse };
