
import './Icon.css';


function Icon({ icon, onClick }) {
  return (
    <div className="icon" onClick={onClick}>
      <img src={icon} alt="Program Icon" />
    </div>
  );
}

export default Icon;