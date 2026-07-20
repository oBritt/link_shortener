import './Header.css';

function Header() {

  return (
    <header>
      <div className="header">
        <h1>URL Shortener</h1>

        <div className="nav">
          <a className="nav-button" href="/">
            Home
          </a>

          <a className="nav-button" href="/stats">
            Stats
          </a>
        </div>
      </div>
    </header>
  );
}

export default Header;