
import './Mainpage.css';
import { useState } from "react";

function Mainpage() {
  const backendUrl = import.meta.env.VITE_BACKEND_URL;

  const [url, setUrl] = useState("");
  const [password, setPassword] = useState("");
  const [response, setResponse] = useState("");
  const [errorText, setErrorText] = useState("");

  const [shortUrl, setShortUrl] = useState("");
  const [clicks, setClicks] = useState(0);
  const [ip, setIp] = useState([]);

  async function handleSubmit() {
    try {
      setErrorText("");

      const body = password !== "" ? 
      JSON.stringify({ url: url, password: password }) : 
      JSON.stringify({ url: url });

      const res = await fetch(`${backendUrl}/shorten`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: body,
      });
      console.log(body);

      const data = await res.json();
      setResponse(window.location.origin + '/' + data.ending);
      console.log(data);
      if (data.detail) {
        setErrorText(data.detail[0].msg);
      }
    } catch (error) {
      setResponse("Something went wrong.");
      console.error(error);

    }
  }

  async function handleStats() {
    const ending = shortUrl.split("/").pop();
    try {
      const res = await fetch(`${backendUrl}/stats/${ending}`, {
        method: "GET",
      });

      if (!res.ok) {
      throw new Error("Failed to fetch stats");
      }

      const data = await res.json();
      setClicks(data.clicks);
      setIp(data.ip || []);
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
      <input type="password" placeholder="Enter password" value={password}
        onChange={(e) => setPassword(e.target.value)}/>
      <div id="error-text">{errorText}</div>
      <button onClick={handleSubmit}>
      Submit
      </button>

      <p>Shortened URL: {response}</p>

      <br></br>
      <br></br>

      <p>Get Stats</p>
      <input type="text" placeholder="Enter your shortened link to get stats" value={shortUrl}
        onChange={(e) => setShortUrl(e.target.value)}/>
      <button onClick={() => handleStats()}>
      Get Stats
      </button>

      <p>Clicks: {clicks}</p>
      <p>IP Addresses: {ip.join(", ")}</p>
    </div>
  );
}

export default Mainpage;