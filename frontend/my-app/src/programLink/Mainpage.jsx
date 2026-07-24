
import './Mainpage.css';
import { useState } from "react";
import { QRCodeCanvas } from "qrcode.react";

function QRCode({ url, size = 200 }) {
  return (
    <QRCodeCanvas
      value={url}
      size={size}
      level="H"
    />
  );
}


function Mainpage() {
  const backendUrl = import.meta.env.VITE_BACKEND_URL;

  const [url, setUrl] = useState("");
  const [password, setPassword] = useState("");
  const [response, setResponse] = useState("");
  const [errorText, setErrorText] = useState("");
  const [requirePassword, setRequirePassword] = useState(false);

  async function copyToClipboard() {
    try {
      await navigator.clipboard.writeText(response);
    } catch (err) {
      console.error(err);
    }
  }

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

  return (
    <div className="App">
      <p>Shorten Your URL</p>
      <input type="text" className="url-input" placeholder="Enter URL to shorten" value={url}
        onChange={(e) => setUrl(e.target.value)}/>
      <div className="checkbox-container">
      <input
        type="checkbox"
        id="password-checkbox"
        checked={requirePassword}
        onChange={(e) => setRequirePassword(e.target.checked)}
      />

      <label htmlFor="password-checkbox">
        Require Password
      </label>
      </div>

      {requirePassword && (
        <center>
          <input
            type="password"
            id="password-input"
            className="password-input"
            placeholder="Enter password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </center>
      )}
      <div id="error-text">{errorText}</div>
      <button className="submit-button" onClick={handleSubmit}>
      Submit
      </button>

      {response && errorText == "" ? (
        <div className="response-container">
          <p>
            Shortened URL:{" "}
            <a href={response} target="_blank" rel="noopener noreferrer">
              {response}
            </a>
          </p>

          <button className="copy-button" onClick={copyToClipboard}>
            Copy
          </button>

          {/* <QRCode url={response} /> */}
        </div>
      ) : null}
    </div>
  );
}

export default Mainpage;