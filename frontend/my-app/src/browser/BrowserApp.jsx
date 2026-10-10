import './BrowserApp.css';
import { useState, useEffect, useRef } from "react";
import Window from '../window/Window';

function BrowserApp({ program, zIndex, onClose, onMinimize, updatePos, pos }) {
    const frontendUrl = import.meta.env.VITE_FRONTEND_URL;
    const backendUrl = import.meta.env.VITE_BACKEND_URL;

    const ran = useRef(false);

    const [url, setUrl] = useState('');
    const [totalLinks, setTotalLinks] = useState(0);
    const [totalClicks, setTotalClicks] = useState(0);
    const [totalUsers, setTotalUsers] = useState(0);
    const [totalMonthlyUsers, setTotalMonthlyUsers] = useState(0);
    const [totalLinksWithPassword, setTotalLinksWithPassword] = useState(0);

    // password step (used in both modes)
    const [needsPassword, setNeedsPassword] = useState(false);
    const [password, setPassword] = useState('');
    const [errorText, setErrorText] = useState('');

    // ---------- redirect mode: runs on load ----------
    useEffect(() => {
        if (!program?.redirect) return;
        if (ran.current) return; // guard against StrictMode double run
        ran.current = true;
        resolveLink(getEnding());
    }, []);

    // ending depends on the mode
    function getEnding() {
        if (program?.redirect) {
            // path of the address bar
            return window.location.pathname.replace(/^\/+|\/+$/g, '');
        }
        // path of the typed link
        return url.trim().replace(/\/+$/, '').split('/').pop();
    }

    // ---------- shared: ask backend for the real link ----------
    async function resolveLink(ending, passwordValue = '') {
        setErrorText('');
        if (!ending) return;

        try {
            const params = new URLSearchParams();
            params.append('ending', ending);
            if (passwordValue !== '') {
                params.append('password', passwordValue);
            }

            const res = await fetch(`${backendUrl}/get_link?${params}`);
            const data = await res.json();

            if (data.url) {
                window.location.replace(data.url);
                return;
            }

            if (data.detail === 'Password required') {
                if (passwordValue !== '') {
                    setErrorText('Wrong password');
                }
                setNeedsPassword(true); // show inline password field
                return;
            }

            setErrorText(data.detail || 'Failed to fetch link');
        } catch (error) {
            console.error(error);
            setErrorText('Something went wrong');
        }
    }

    function handlePasswordSubmit() {
        resolveLink(getEnding(), password); // send the request one more time
    }

    function handleUrlChange(value) {
        setUrl(value);
        // new input -> reset the password step
        setNeedsPassword(false);
        setPassword('');
        setErrorText('');
    }

    // ---------- normal mode: ENTER ----------
    async function handleStats() {
        setErrorText('');
        const input = url.trim();
        if (!input) return;

        // link of our own shortener -> redirect (with password support)
        if (frontendUrl && input.includes(frontendUrl)) {
            await resolveLink(getEnding());
            return;
        }

        // otherwise try stats with the input as secret
        try {
            const params = new URLSearchParams();
            params.append('secret', input);

            const res = await fetch(`${backendUrl}/appstats?${params}`, {
                method: 'GET',
            });

            if (res.ok) {
                const data = await res.json();
                setTotalLinks(data.total_links);
                setTotalClicks(data.total_clicks);
                setTotalUsers(data.total_unique_users);
                setTotalMonthlyUsers(data.total_monthly_users);
                setTotalLinksWithPassword(data.total_password_protected_links);
            } else if (!directRedirect()) {
                setErrorText('Invalid URL');
            }
        } catch (error) {
            console.error(error);
            setErrorText('Something went wrong');
        }
    }

    function directRedirect() {
        const input = url.trim();

        const durl = /^[a-z][a-z\d+\-.]*:\/\//i.test(input)
            ? input
            : `https://${input}`;

        try {
            const parsed = new URL(durl);

            if (
                !['http:', 'https:'].includes(parsed.protocol) ||
                !parsed.hostname.includes('.')
            ) {
                return false;
            }

            window.location.href = parsed.href;
            return true;
        } catch {
            return false;
        }
    }

    const passwordStep = needsPassword && (
        <div className="password-step">
            <p>This link is password protected.</p>
            <input
                className="url-input"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handlePasswordSubmit()}
                placeholder="Enter password"
                autoFocus
            />
            <button type="button" className="submit-button" onClick={handlePasswordSubmit}>
                SUBMIT
            </button>
        </div>
    );

    // ---------- redirect mode UI ----------
    if (program?.redirect) {
        return (
            <Window zIndex={zIndex} onClose={onClose} onMinimize={onMinimize} title="Explorer"
                updatePos={updatePos} pos={pos}
            >
                <div className="browser-app">
                    <h1>Gogol</h1>
                    {passwordStep || (!errorText && <p>Redirecting you...</p>)}
                    {errorText && <p className="error" role="alert">{errorText}</p>}
                </div>
            </Window>
        );
    }

    // ---------- normal UI ----------
    return (
        <Window zIndex={zIndex} onClose={onClose} onMinimize={onMinimize} title="Explorer"
            updatePos={updatePos} pos={pos}
        >
            <div className="browser-app">
                <h1>Gogol</h1>
                <input
                    className="url-input"
                    type="text"
                    value={url}
                    onChange={(e) => handleUrlChange(e.target.value)}
                    onKeyDown={(e) => e.key === 'Enter' && !needsPassword && handleStats()}
                    placeholder="Enter your URL"
                />
                <button type="button" className="submit-button" onClick={handleStats}>
                    ENTER
                </button>

                {passwordStep}

                {errorText && <p className="error" role="alert">{errorText}</p>}

                {totalLinks > 0 && (
                    <div className="stats">
                        <p>Total Links: {totalLinks}</p>
                        <p>Total Clicks: {totalClicks}</p>
                        <p>Total Users: {totalUsers}</p>
                        <p>Total Monthly Users: {totalMonthlyUsers}</p>
                        <p>Total Links with Password: {totalLinksWithPassword}</p>
                    </div>
                )}
            </div>
        </Window>
    );
}

export default BrowserApp;