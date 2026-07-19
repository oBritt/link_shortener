import { useState } from "react";

function App() {
  const [url, setUrl] = useState("");
  const [response, setResponse] = useState("");

  const [shortUrl, setShortUrl] = useState("");
  const [clicks, setClicks] = useState(0);

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

  async function handleStats() {
    const ending = shortUrl.split("/").pop();
    try {
      const res = await fetch(`http://localhost:8000/stats/${ending}`, {
        method: "GET",
      });

      if (!res.ok) {
      throw new Error("Failed to fetch stats");
      }

      const data = await res.json();
      setClicks(data.clicks);
    } catch (error) {
      setClicks("Something went wrong.");
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

      <br></br>
      <br></br>

      <p>Get Stats</p>
      <input type="text" placeholder="Enter your shortened link to get stats" value={shortUrl}
        onChange={(e) => setShortUrl(e.target.value)}/>
      <button onClick={() => handleStats(shortUrl)}>
      Get Stats
      </button>

      <p>Clicks: {clicks}</p>
    </div>
  );
}

export default App;