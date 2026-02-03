export default function TestimonialShapeBg() {
  return (
   <svg
      viewBox="0 0 1088 485"
      xmlns="http://www.w3.org/2000/svg"
      className="absolute inset-0 w-full h-full opacity-[0.12] pointer-events-none"
      fill="none"
    >
      {/* Animated path */}
      <path
        d="M15.5003 167.036C139 32.5359 554.975 -64.6014 524 69.0377C503.949 155.547 259.341 170.228 223 259.5C181.5 361.447 252.5 461.536 413.306 476.024C475.263 481.606 565.937 465.717 629.587 361.447C678.113 281.953 712.097 212 771.154 259.5C830.211 307 834.663 439.903 911.743 455.093C988.823 470.282 1053.79 423.643 1060.07 354.585C1062.73 325.367 1033.62 246.488 953.057 293.612C872.493 340.737 846.566 310.738 825.828 277.801C803.893 242.962 789.725 161.86 827.988 103.635C865.983 45.8166 935.829 43.1845 968.188 57.2502C1001.9 71.9019 1017.39 79.5497 1051.63 106.408"
        stroke="#CFCFCF"
        strokeWidth="2"
        strokeDasharray="6 10"
        strokeLinecap="round"
        className="testimonial-path"
      />

      {/* Dots */}
      <circle cx="12.3497" cy="169.386" r="10" fill="#DADADA" className="testimonial-dot" />
      <circle cx="1057.37" cy="108.641" r="10" fill="#DADADA" className="testimonial-dot delay" />
    </svg>
  );
}
