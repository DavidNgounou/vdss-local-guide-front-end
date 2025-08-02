import './WideTitle.css';
export default function WideTitle({ icon, children, isButton }) {

    return (
        <div className="wide-title-with-line">
            <div className="wide-title">
                {icon}
                <h5>{children}</h5>
            </div>
            <div className="line"></div>
        </div>
    );
}