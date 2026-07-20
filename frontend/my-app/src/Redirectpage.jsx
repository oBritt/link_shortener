

import './Redirectpage.css';
import { useState, useEffect, useRef } from "react";


function Redirectpage() {
  const backendUrl = import.meta.env.VITE_BACKEND_URL;

  const ran = useRef(false);
  const [password, setPassword] = useState("");
  const [errorText, setErrorText] = useState("");


  useEffect(() => {
    if (ran.current) return;

    ran.current = true;
    handleSubmit();
  }, []);


  async function handleSubmit() {
    try {
      setErrorText("");
      const ending = window.location.pathname.substring(1);
      const params = new URLSearchParams();

      params.append("ending", ending);

      if (password !== "") {
        params.append("password", password);
      }

      const res = await fetch(`${backendUrl}/get_link?${params}`);

      const data = await res.json();

      console.log(data);
      
      if (data.url) {
        window.location.replace(data.url);
      }

      if (data.detail) {
        setErrorText(data.detail);
      }


      } catch (error) {
        console.error(error);
        console.log("asd");
    }
  }

    return (
        <div className="redirect-page">
            <h1>Redirect Page</h1>
            <p>This is the redirect page.</p>
        </div>
    );
}

export default Redirectpage;