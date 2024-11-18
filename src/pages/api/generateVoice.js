// pages/api/generateVoice.js
import axios from 'axios'

const translateToLanguages = async (englishText,language) => {
  console.log("🚀 ~ translateToLanguages ~ language:", language)
  const apiKey = process.env.NEXT_PUBLIC_GOOGLE_API;
  const url = `https://translation.googleapis.com/language/translate/v2?key=${apiKey}`;

  const response = await fetch(url, {
      method: 'POST',
      headers: {
          'Content-Type': 'application/json'
      },
      body: JSON.stringify({
          q: englishText,
          target: language
      })
  });

  const data = await response.json();
  console.log("🚀 ~ translateToLanguages ~ data:", data.data.translations[0].translatedText)
  return data.data.translations[0].translatedText;
}
export default async function handler(req, res) {
  if (req.method === 'POST') {
    try {
      let { voice_id, text, language_code, stability,similarity_boost } = req.body

      if (!language_code) {
        language_code = 'en'
      }
      console.log('this is voice_id ', language_code)
      const getTranslatedText = await translateToLanguages(text,language_code)
      console.log("🚀 ~ handler ~ getTranslatedText:", getTranslatedText)
      // Make the API request to Eleven Labs
      const response = await axios.post(
        `https://api.elevenlabs.io/v1/text-to-speech/${voice_id}?optimize_streaming_latency=3`,
        {
          model_id: "eleven_turbo_v2_5",
          text: getTranslatedText,
          voice_settings: {
            stability: stability,
            similarity_boost: similarity_boost
          },
          language_code: language_code
        },
        {
          headers: {
            'Content-Type': 'application/json',
            'xi-api-key': process.env.NEXT_PUBLIC_ELEVEN_LABS
          },
          responseType: 'arraybuffer' // Handle binary data
        }
      )

      // Set the appropriate content type for the response
      res.setHeader('Content-Type', 'audio/mpeg')
      res.status(200).send(response.data)
    } catch (error) {
      console.error('Error generating voice:', error.message)
      res.status(error.response?.status || 500).json({ error: error.message })
    }
  } else {
    res.setHeader('Allow', ['POST'])
    res.status(405).end(`Method ${req.method} Not Allowed`)
  }
}
