export default function ServiceContent() {
  return (
    <div className="space-y-10 text-dark">
      {/* Title */}
      <div>
        <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-3">
          Professional Running & Event Solutions
        </h2>
        <p className="text-gray-600 leading-7">
          We specialize in delivering professionally managed running events and
          sports experiences. From event planning to athlete training and
          accurate timing systems, our services are designed to ensure quality,
          reliability, and an exceptional participant experience.
        </p>
      </div>

      {/* Event Organiser */}
      <Section title="Event Organiser">
        <p className="text-gray-600 leading-7">
          We take full responsibility for organizing running events from concept
          to execution. Our team manages event planning, route design,
          registrations, volunteer coordination, safety arrangements, and
          participant engagement to deliver smooth and memorable events.
        </p>
      </Section>

      {/* Event Management */}
      <Section title="Event Management">
        <ul className="list-disc pl-5 space-y-2 text-gray-600">
          <li>Complete operational planning and execution</li>
          <li>Logistics, vendor, and venue coordination</li>
          <li>Branding, scheduling, and crowd control</li>
          <li>Permission handling and compliance management</li>
          <li>On-ground supervision and event-day management</li>
        </ul>
      </Section>

      {/* Running Training */}
      <Section title="Running Training">
        <p className="text-gray-600 leading-7">
          Our running training programs are designed for runners of all levels —
          beginners, amateurs, and competitive athletes. Training focuses on
          endurance building, speed improvement, injury prevention, and race-day
          readiness under experienced supervision.
        </p>

        <ul className="list-disc pl-5 mt-3 space-y-2 text-gray-600">
          <li>Beginner & advanced running programs</li>
          <li>Personalized training plans</li>
          <li>Group training sessions</li>
          <li>Performance monitoring & guidance</li>
        </ul>
      </Section>

      {/* Timing Solution */}
      <Section title="Timing Solution">
        <p className="text-gray-600 leading-7">
          We provide accurate and reliable race timing solutions using modern
          technology. Our systems ensure transparency, real-time result tracking,
          and professional race analytics for all categories.
        </p>

        <ul className="list-disc pl-5 mt-3 space-y-2 text-gray-600">
          <li>BIB-based chip timing</li>
          <li>Finish-line timing systems</li>
          <li>Live result tracking</li>
          <li>Post-race reports & analytics</li>
        </ul>
      </Section>

      {/* Why Choose Us */}
      <Section title="Why Choose Us">
        <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3 list-disc pl-5 text-gray-600">
          <li>Experienced event professionals</li>
          <li>End-to-end service management</li>
          <li>Reliable timing accuracy</li>
          <li>Runner-focused approach</li>
          <li>Strong safety & medical planning</li>
          <li>Proven execution track record</li>
        </ul>
      </Section>

      {/* Footer */}
      <div className="border-t pt-6 text-sm text-gray-600">
        <p>
          <strong>Managed & Coordinated By:</strong> RunRise Nation
        </p>
        <p>
          <strong>Service Coverage:</strong> Local & National Level Events
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
