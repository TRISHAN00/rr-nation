export default function JourneyShapeBg() {
  return (
    <div className="absolute inset-0 pointer-events-none ">
      <div className="w-full h-full flex items-center justify-center  p-8">
        <svg
          width="1088"
          height="485"
          viewBox="0 0 1088 485"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="max-w-full h-auto"
        >
          <style>
            {`
            @keyframes drawPath {
              0% {
                stroke-dashoffset: 3500;
              }
              50% {
                stroke-dashoffset: 0;
              }
              100% {
                stroke-dashoffset: -3500;
              }
            }
            
            @keyframes float {
              0%, 100% {
                transform: translateY(0px);
              }
              50% {
                transform: translateY(-10px);
              }
            }
            
            @keyframes pulse {
              0%, 100% {
                opacity: 0.2;
              }
              50% {
                opacity: 0.5;
              }
            }
            
            @keyframes arrowSlide {
              0% {
                transform: translateX(0);
              }
              100% {
                transform: translateX(5px);
              }
            }
            
            .animated-path {
              stroke-dasharray: 3500;
              stroke-dashoffset: 3500;
              animation: drawPath 8s linear infinite;
            }
            
            .floating-circle {
              animation: float 3s ease-in-out infinite;
            }
            
            .pulsing {
              animation: pulse 2s ease-in-out infinite;
            }
            
            .arrow-animate {
              animation: arrowSlide 1s ease-in-out infinite alternate;
            }
            
            .person-left {
              animation: float 3s ease-in-out infinite;
              animation-delay: 0.5s;
            }
            
            .person-right {
              animation: float 3s ease-in-out infinite;
              animation-delay: 1s;
            }
          `}
          </style>

          <g opacity="0.2" className="pulsing">
            <path
              className="animated-path"
              d="M15.5003 167.036C139 32.5359 554.975 -64.6014 524 69.0377C503.949 155.547 259.341 170.228 223 259.5C181.5 361.447 252.5 461.536 413.306 476.024C475.263 481.606 565.937 465.717 629.587 361.447C678.113 281.953 712.097 212 771.154 259.5C830.211 307 834.663 439.903 911.743 455.093C988.823 470.282 1053.79 423.643 1060.07 354.585C1062.73 325.367 1033.62 246.488 953.057 293.612C872.493 340.737 846.566 310.738 825.828 277.801C803.893 242.962 789.725 161.86 827.988 103.635C865.983 45.8166 935.829 43.1845 968.188 57.2502C1001.9 71.9019 1017.39 79.5497 1051.63 106.408"
              stroke="#C9C9C9"
              strokeWidth="2"
              strokeLinecap="round"
              strokeDasharray="4 5"
            />

            <path
              d="M1058.63 33.0361L1057.69 109.087"
              stroke="#C9C9C9"
              strokeWidth="2"
            />

            <g className="arrow-animate">
              <path
                d="M1061.25 62.897L1061.62 33.0732L1087.16 47.9313L1061.25 62.897Z"
                fill="#FF3B3B"
              />
            </g>

            <g className="floating-circle">
              <circle
                cx="12.3497"
                cy="169.386"
                r="12.1993"
                transform="rotate(0.710435 12.3497 169.386)"
                fill="#C9C9C9"
              />
            </g>

            <g className="person-left">
              <path
                d="M9.23081 210.372C11.7798 210.372 13.8462 208.022 13.8462 205.124C13.8462 202.226 11.7798 199.876 9.23081 199.876C6.6818 199.876 4.61542 202.226 4.61542 205.124C4.61542 208.022 6.6818 210.372 9.23081 210.372Z"
                fill="#C9C9C9"
              />
              <path
                d="M0.613891 224.639C0.82703 224.831 1.0778 224.951 1.34117 224.988C1.60454 225.025 1.87129 224.977 2.11478 224.85L4.14509 223.787L4.14509 252.37C4.14509 253.125 4.3918 253.849 4.83096 254.383C5.27012 254.917 5.86574 255.217 6.4868 255.217C7.10786 255.217 7.70348 254.917 8.14264 254.383C8.58179 253.849 8.82851 253.125 8.82851 252.37V231.586H9.70616V244.54C9.70616 245.295 9.9529 246.019 10.3921 246.553C10.8313 247.087 11.427 247.387 12.0481 247.387C12.6692 247.387 13.2649 247.087 13.7041 246.553C14.1433 246.019 14.39 245.295 14.39 244.54L14.39 217.618C15.1312 218.383 15.837 219.197 16.5043 220.056L16.9712 229.192C16.9816 229.435 17.0315 229.673 17.1181 229.893C17.2047 230.112 17.3263 230.309 17.4758 230.471C17.6252 230.633 17.7997 230.757 17.989 230.837C18.1783 230.917 18.3787 230.95 18.5786 230.935C18.7785 230.92 18.974 230.856 19.1537 230.749C19.3335 230.641 19.4939 230.492 19.6257 230.308C19.7575 230.125 19.8581 229.912 19.9217 229.681C19.9853 229.45 20.0105 229.206 19.9961 228.963L19.4958 219.179C19.4749 218.771 19.3427 218.382 19.1201 218.075C19.0058 217.918 16.3775 214.319 13.8101 212.649C13.557 212.411 13.2462 212.281 12.926 212.28H5.60871C5.59415 212.28 5.58087 212.284 5.5663 212.285C5.1037 212.289 4.18749 212.438 3.20789 213.381C1.51211 215.015 0.436131 218.237 0.00908045 222.957C-0.0198382 223.277 0.0208316 223.601 0.127033 223.896C0.233235 224.191 0.401252 224.447 0.614316 224.639L0.613891 224.639Z"
                fill="#C9C9C9"
              />
            </g>

            <g className="person-right">
              <circle
                cx="1057.37"
                cy="108.641"
                r="12.1993"
                transform="rotate(0.710435 1057.37 108.641)"
                fill="#C9C9C9"
              />
            </g>
          </g>
        </svg>
      </div>
    </div>
  );
}
