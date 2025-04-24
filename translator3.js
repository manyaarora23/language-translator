const apiKey = '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';  // <-- Replace this with your real API key

async function translateText() {
  const text = document.getElementById("textInput").value;
  const fromLang = document.getElementById("fromLang").value;
  const toLang = document.getElementById("toLang").value;

  if (!text) {
    document.getElementById("result").innerText = "Please enter some text!";
    return;
  }

  const prompt = `Translate "${text}" from ${fromLang} to ${toLang}.`;

  const response = await fetch("https://api.groq.com/openai/v1/chat/completions", {
    method: "POST",
    headers: {
      "Authorization": `Bearer ${apiKey}`,
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      model: "meta-llama/llama-4-scout-17b-16e-instruct",
      messages: [
        {
          role: "user",
          content: prompt
        }
      ],
      temperature: 0.7,
      max_tokens: 1000
    })
  });

  const data = await response.json();

  if (data.choices && data.choices.length > 0) {
    document.getElementById("result").innerText = data.choices[0].message.content;
  } else {
    document.getElementById("result").innerText = "Translation failed. Try again!";
  }
}
