import "./FadeButton.css";

export default function FadeButton({ buttonText, isActive, onClick }) {
    return (
        <button
            className={`fade-button ${isActive ? "active" : ""}`}
            onClick={onClick}
            type="button"
        >
            {buttonText}
        </button>
    );
}