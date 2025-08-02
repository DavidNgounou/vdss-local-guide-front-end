function FloatingInput({ id, name, type, placeholder, value, onChange, onFocus, onBlur, isFocused }) {
  return (
    <div className={`input-group${isFocused || value ? ' has-label-active' : ''}`}>
      {(isFocused || value) && (
        <label htmlFor={id}>{placeholder}</label>
      )}
      <input
        type={type}
        id={id}
        name={name}
        placeholder={isFocused || value ? '' : placeholder}
        value={value}
        onChange={onChange}
        onFocus={onFocus}
        onBlur={onBlur}
        autoComplete="off"
        required
      />
    </div>
  );
}

export default FloatingInput;