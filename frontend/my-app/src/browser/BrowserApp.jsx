import './BrowserApp.css';
import { useState } from "react";
import Window from '../window/Window';

function BrowserApp({ onClose }) {
    const frontendUrl = import.meta.env.VITE_FRONTEND_URL;
    const backendUrl = import.meta.env.VITE_BACKEND_URL;
    const [url, setUrl] = useState('');
    const [normalUrl, setNormalUrl] = useState('');
    const [totalLinks, setTotalLinks] = useState(0);
    const [totalClicks, setTotalClicks] = useState(0);
    const [totalUsers, setTotalUsers] = useState(0);
    const [totalMonthlyUsers, setTotalMonthlyUsers] = useState(0);
    const [totalLinksWithPassword, setTotalLinksWithPassword] = useState(0);

    async function handleStats() {
        if (url.includes(frontendUrl)) {
            redirect();
            return;
        }
        try {
            const params = new URLSearchParams();
            params.append("secret", url);


            const res = await fetch(`${backendUrl}/appstats?${params}`, {
                method: "GET",
            });

            if (res.ok) {
                const data = await res.json();
                setTotalLinks(data.total_links);
                setTotalClicks(data.total_clicks);
                setTotalUsers(data.total_unique_users);
                setTotalMonthlyUsers(data.total_monthly_users);
                setTotalLinksWithPassword(data.total_password_protected_links);
            } else {
                redirect();
            }

           
        } catch (error) {
            console.error(error);
        }
    }
    
    async function redirect() {
        if (url.includes(frontendUrl)) {
            const ending = url.split("/").pop();
            console.log("Redirecting to backend for ending: ", ending);
            try {
                const params = new URLSearchParams();
                params.append("ending", ending);


                const res = await fetch(`${backendUrl}/get_link?${params}`, {
                    method: "GET",
                });

                if (!res.ok) {
                    throw new Error("Failed to fetch link, here only password unprotected links are allowed");
                }

                const data = await res.json();
                window.location.href = data.url;
            } catch (error) {
                console.error(error);
            }
        } else {
            directRedirect();
        }   
    }

    async function directRedirect() {
        const input = url.trim();

        const durl = /^[a-z][a-z\d+\-.]*:\/\//i.test(input)
            ? input
            : `https://${input}`;

        try {
            const parsed = new URL(durl);

            if (
                !["http:", "https:"].includes(parsed.protocol) ||
                !parsed.hostname.includes(".")
            ) {
                return false;
            }

            window.location.href = parsed.href;
            return true;
        } catch {
            return false;
        }
    }


    return (
        <Window onClose={onClose} title="Explorer">
            <div className="browser-app">
                <h1>Gogol</h1>
                <input
                    className="url-input"
                    type="text"
                    value={url}
                    onChange={(e) => setUrl(e.target.value)}
                    placeholder="Enter your URL"
                />
                <button type="button" className="submit-button" onClick={handleStats}>
                    ENTER
                </button>

                {totalLinks > 0 ? (
                    <div className="stats">
                        <p>Total Links: {totalLinks}</p>
                        <p>Total Clicks: {totalClicks}</p>
                        <p>Total Users: {totalUsers}</p>
                        <p>Total Monthly Users: {totalMonthlyUsers}</p>
                        <p>Total Links with Password: {totalLinksWithPassword}</p>
                    </div>
                ) : (
                <p></p>
                )}
            </div>
        </Window>
    );
}
        

export default BrowserApp;