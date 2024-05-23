const { OpenAI } = require('openai');


// OpenAI API Key
const apiKey = process.env.OPEN_AI_API_KEY;

// OpenAI API Configuration
const openai = new OpenAI({
    apiKey: apiKey,
    organization: "org-n1BjtX0EwFyCRVxpBfBJ3aD4",
});


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
                      text: "identify the dish and return up to 10 ingredients in JSON form" },
                      {
                          type: "image_url",
                          image_url: {
                              "url": `data:image/jpeg;base64,${base64Image}`,
                          },
                      },
                  ],
              },
          ],
          max_tokens: 1000,
      });
    
      // Extracting content from the provided JSON data
      const content = response.choices[0].message.content;

      console.log(content)

      // Extracting JSON string from the content
      const jsonString = content.split("```json\n")[1].split("\n```")[0];

      // Loading JSON string into a JavaScript object
      const jsonData = JSON.parse(jsonString);

      // returning the extracted JSON data
      return jsonData;
  } catch (error) {
      console.error("Error:", error);
      throw error;
  }
}

// Exporting the analyse function
export { analyse };
