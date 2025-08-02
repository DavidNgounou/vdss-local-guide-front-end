import "./DropDownInput.css";
export default function DropDownInput({ id, label, options, onChange, value }) {
    return (
        <div id="region-input">
            <label htmlFor={id}>{label}</label>
            <select id={id} value={value} onChange={onChange}>
                {options.map((option, index) => (
                    <option key={index} value={option}>
                        {option}
                    </option>
                ))}
            </select>
        </div>
    );
}