import './DayCard.css';
export default function DayCard({ icon, cardTitle, isActive, onClick}) {
    
    return(
        <button className={`day-card ${isActive ? "active" : ""}`} onClick={onClick} >
            {icon}
            <p className="card-title">
                {cardTitle}
            </p>
        </button>
    );
}