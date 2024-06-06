async function summarize() {
    var inputText = document.getElementById("inputText").value;
    if (!inputText) {
        alert("Please enter some text to summarize.");
        return;
    }

    try {
        const response = await fetch('https://api.openai.com/v1/engines/davinci/completions', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer YOUR_OPENAI_API_KEY'
            },
            body: JSON.stringify({
                "prompt": inputText,
                "temperature": 0,
                "max_tokens": 150,
                "top_p": 1,
                "frequency_penalty": 0,
                "presence_penalty": 0,
                "stop": ["\n", "<|endoftext|>"]
            })
        });

        const data = await response.json();
        if (data && data.choices && data.choices.length > 0) {
            document.getElementById("outputText").value = data.choices[0].text.trim();
        } else {
            alert("Summarization failed. Please try again.");
        }
    } catch (error) {
        console.error('Error:', error);
        alert("Something went wrong. Please try again later.");
    }
}
