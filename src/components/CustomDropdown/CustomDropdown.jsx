import React, { useState } from "react";
import "./CustomDropdown.css";

export default function CustomDropdown({ options, label }) {
    const [isOpen, setIsOpen] = useState(false);
    const [selectedOption, setSelectedOption] = useState(options[0]);

    const toggleDropdown = () => setIsOpen(!isOpen);
    const handleOptionClick = (option) => {
        setSelectedOption(option);
        setIsOpen(false);
    };

    return (
        <div className="custom-dropdown">
            <label>{label}</label>
            <div className="dropdown-header" onClick={toggleDropdown}>
                {selectedOption}
                <span className="dropdown-arrow">{isOpen ? "▲" : "▼"}</span>
            </div>
            {isOpen && (
                <ul className="dropdown-options">
                    {options.map((option, index) => (
                        <li
                            key={index}
                            className="dropdown-option"
                            onClick={() => handleOptionClick(option)}
                        >
                            {option}
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
}