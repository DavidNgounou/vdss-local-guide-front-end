export default function FormInput({ label, helpText, ...props}) {
    return (
        <div className="form-group">
            <label>{label}</label>
                <input
                    {...props}
                    placeholder={label}
                    required
                />
            {helpText && <p className="help-text">{helpText}</p>}
        </div>
    );
}