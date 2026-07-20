import { useState } from "react";
import './PasswordModal.css';

function PasswordModal({ onSubmit, error }) {
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

        <button onClick={() => onSubmit(password)}>
          Submit
        </button>
      </div>
    </div>
  );
}

export default PasswordModal;