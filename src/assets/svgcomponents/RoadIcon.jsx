import PropTypes from 'prop-types';

export default function RoadIcon({ fillColor = "#000" }) {
    const clipPathId = `clip0_${Math.random().toString(36).substr(2, 9)}`;

    return (
        <svg
            width="37"
            height="37"
            viewBox="0 0 37 37"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
        >
            <g clipPath={`url(#${clipPathId})`}>
                <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M32.9 11.3L4.1 11.3V16.7H11.3V20.3H4.1L4.1 25.7L32.9 25.7V20.3H25.7V16.7H32.9V11.3ZM0.5 7.69999L36.5 7.69999V9.82938V11.3V25.7V27.1706V29.3L0.5 29.3L0.5 27.1706L0.5 25.7L0.5 11.3L0.5 9.82938L0.5 7.69999ZM22.1 20.3V16.7L14.9 16.7V20.3L22.1 20.3Z"
                    fill={fillColor}
                />
            </g>
            <defs>
                <clipPath id={clipPathId}>
                    <rect
                        width="36"
                        height="36"
                        fill={fillColor}
                        transform="matrix(0 -1 1 0 0.5 36.5)"
                    />
                </clipPath>
            </defs>
        </svg>
    );
}

RoadIcon.propTypes = {
    fillColor: PropTypes.string,
};