import { useState } from "react";

function App() {
  const [url, setUrl] = useState("");
  const [response, setResponse] = useState("");

  async function handleSubmit() {
    try {
      const res = await fetch("http://localhost:8000/shorten", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          url: url,
        }),
      });

      const data = await res.json();
      setResponse(data.url);
    } catch (error) {
      setResponse("Something went wrong.");
      console.error(error);
    }
  }

  return (
    <div className="App">
      <p>Shorten Your URL</p>
      <input type="text" placeholder="Enter URL to shorten" value={url}
        onChange={(e) => setUrl(e.target.value)}/>
      <button onClick={handleSubmit}>
      Submit
      </button>

      <p>Shortened URL: {response}</p>
    </div>
  );
}

export default App;