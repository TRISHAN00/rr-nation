export default function EventContent({ event }) {
  return (
    <div className="  space-y-10 text-dark">
      {/* Title */}
      <div>
        <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-3">
          {event?.name}
        </h2>
        <p className="text-gray-600 leading-7">
          <div
            className="text-gray-600 leading-7 space-y-4"
            dangerouslySetInnerHTML={{ __html: event?.description || "" }}
          />
        </p>
      </div>

    </div>
  );
}

/* Helpers */
function Section({ title, children }) {
  return (
    <div>
      <h3 className="text-xl sm:text-2xl font-bold mb-4">{title}</h3>
      {children}
    </div>
  );
}

function Info({ label, value }) {
  return (
    <p className="text-gray-600">
      <strong className="text-dark">{label}:</strong> {value}
    </p>
  );
}
