

import './Redirectpage.css';
import { useState, useEffect, useRef } from "react";
import PasswordModal from './PasswordModal';

import add1 from "../assets/add_1.png";
import add2 from "../assets/add_2.png";
import add3 from "../assets/add_3.png";
import add4 from "../assets/add_4.png";


function Redirectpage() {
  const backendUrl = import.meta.env.VITE_BACKEND_URL;

  const ran = useRef(false);
  const [password, setPassword] = useState("");
  const [errorText, setErrorText] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [seconds, setSeconds] = useState(5);
  const [linkData, setLinkData] = useState("");
  const [firstPasswordRequired, setFirstPasswordRequired] = useState(true);


  useEffect(() => {
    const timer = setInterval(() => {
      setSeconds(prev => {
        if (prev <= 1) {
          clearInterval(timer);
          if (ran.current === false) {
            ran.current = true;
            handleSubmit();
          }
          return 0;
        }
        return prev - 1;
      });
    }, 1000);


    return () => clearInterval(timer);


  }, []);


  async function handlePasswordSubmit(password) {
    setPassword(password);
    console.log("Password submitted:", password);
    await handleSubmit(password);
  }

  async function handleSubmit(passwordValue = password) {
    try {
      setErrorText("");
      const ending = window.location.pathname.substring(1);
      const params = new URLSearchParams();

      params.append("ending", ending);

      if (passwordValue !== "") {
        params.append("password", passwordValue);
      }

      const res = await fetch(`${backendUrl}/get_link?${params}`);

      const data = await res.json();

      console.log(data);
      
      if (data.url) {
        setLinkData(data.url);
        window.location.replace(data.url);
      }

      if (data.detail) {
        if (data.detail === "Password required") {
          if (!firstPasswordRequired) {
            setErrorText(data.detail);
          }
          setFirstPasswordRequired(false);
          setShowModal(true);
        }else {
          setErrorText(data.detail);
        }
        console.log(data.detail);
      }
      } catch (error) {
        console.error(error);
    }
  }

  const AD_IMAGES_LEFT = [
    add3,
    add1,
    add2,
  ];

  const AD_IMAGES_RIGHT = [
    add4,
    add2,
    add3
  ];

  function AdRail({ images, label }) {
    return (
      <aside className="ad-rail" aria-label="Advertisement">
        {images.map((src, i) => (
          <div className="ad-unit" key={i}>
            <img src={src} alt={`${label} advertisement ${i + 1}`} loading="lazy" />
          </div>
        ))}
      </aside>
    );
  }


  return (
    <>
      {showModal && (
        <PasswordModal onSubmit={handlePasswordSubmit} error={errorText} />
      )}
      <div className="redirect-layout">
        <AdRail images={AD_IMAGES_LEFT} label="Left" />
        <main className="redirect-page">
          <h1>Redirecting you</h1>
          <p className="subtext">Hang tight, your link is on its way.</p>
          <p className="countdown">
            Redirecting in <span>{seconds}</span>s
          </p>

          {errorText && (
            <p id="error-text" role="alert">
              {errorText}
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
        </main>
        <AdRail images={AD_IMAGES_RIGHT} label="Right" />
      </div>
    </>
  );
}

export default Redirectpage;