import helpIcon from "../../assets/helpIcon.svg";
import './HelpBar.css';
export default function HelpBar({ text }) {
    return (
        <div className="tool-tip">
            <img src={helpIcon} alt="help-icon" />
            <p>{text}</p>
        </div>
    );
}