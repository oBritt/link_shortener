import { useState } from "react";
import './PasswordModal.css';

function PasswordModal({ onSubmit, error, linkData }) {
  const [password, setPassword] = useState("");

  return (
    <div className="modal-overlay">
      <div className="modal">
        <h2>Password required</h2>

        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Enter password"
        />

        {error && (
          <p className="error">
            {error}
          </p>
        )}

        {linkData && (
          <p className="manual-link">
            If nothing happens,{" "}
            <a href={linkData} target="_blank" rel="noopener noreferrer">
              click here
            </a>{" "}
            to continue.
          </p>
        )}
        

        <button onClick={() => onSubmit(password)}>
          Submit
        </button>
      </div>
    </div>
  );
}

export default PasswordModal;