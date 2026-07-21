import './Stats.css';
import { useState } from "react";

function Stats() {
  const backendUrl = import.meta.env.VITE_BACKEND_URL;
  const [ip, setIp] = useState();
  const [clicks, setClicks] = useState(0);
  const [shortUrl, setShortUrl] = useState("");

  async function handleStats() {
    const ending = shortUrl.split("/").pop();
    try {
      const params = new URLSearchParams();
      params.append("ending", ending);


      const res = await fetch(`${backendUrl}/stats?${params}`, {
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
    <div className="stats">
      <p>Get Stats on your shortened URL</p>
      <input type="text" className='url-input' placeholder="Enter your shortened link to get stats" value={shortUrl}
        onChange={(e) => setShortUrl(e.target.value)}/>
      <button className="submit-button" onClick={() => handleStats()}>
      Get Stats
      </button>
      {ip ? (
        <div className="stats-container">
            <table className="stats-table">
                <tbody>
                <tr>
                    <th>Total Clicks</th>
                    <td>{clicks}</td>
                </tr>
                <tr>
                    <th>Unique Clicks</th>
                    <td>{ip.length}</td>
                </tr>
                </tbody>
            </table>

            <h3>IP Addresses</h3>

            <table className="ip-table">
                <thead>
                <tr>
                    <th>#</th>
                    <th>IP Address</th>
                </tr>
                </thead>
                <tbody>
                {ip.map((address, index) => (
                    <tr key={index}>
                    <td>{index + 1}</td>
                    <td>{address}</td>
                    </tr>
                ))}
                </tbody>
            </table>
        </div>
      ) : (
        <p></p>
      )}
    </div>
  );
}

export default Stats;