export default function EventContent() {
  return (
    <div className="  space-y-10 text-dark">
      {/* Title */}
      <div>
        <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-3">
          Fitness Meets Accounting
        </h2>
        <p className="text-gray-600 leading-7">
          On <strong>7th November 2025</strong>, the streets of{" "}
          <strong>Hatirjheel</strong> will come alive with energy as running
          enthusiasts, Chartered Accountants, finance professionals, university
          students, and running athletes unite for the{" "}
          <strong>Accounting Day Run</strong>.
        </p>
      </div>

      {/* Event Details */}
      <Section title="Event Details">
        <Info label="Date" value="7th November 2025" />
        <Info label="Venue" value="Hatirjheel, Dhaka" />
        <Info label="Reporting Time" value="5:30 AM" />
        <Info label="7.5K Start" value="6:00 AM (Tentative)" />
        <Info label="1K Start" value="6:10 AM (Tentative)" />
      </Section>

      {/* Kit Expo */}
      <Section title="Kit Expo Details">
        <Info label="Date" value="6th November 2025" />
        <Info label="Venue" value="Pan Pacific Sonargaon Hotel, Dhaka" />
        <Info label="Time" value="1:00 PM – 8:00 PM (Tentative)" />
      </Section>

      {/* Registration Fees */}
      <Section title="Registration Fees">
        <Info label="7.5K Race" value="800 BDT" />
        <Info label="1K Fun Run" value="600 BDT" />
      </Section>

      {/* Race Categories */}
      <Section title="Race Categories & Slots">
        <ul className="list-disc pl-5 space-y-2 text-gray-600">
          <li>
            <strong>7.5K Challenge</strong>
            <ul className="list-disc pl-5 mt-1">
              <li>CA Members (Elite & Amateur) – 300 slots</li>
              <li>CA Students & General – 900 slots</li>
            </ul>
          </li>
          <li>
            <strong>1K Fun Run</strong> – Kids & Mom (200 slots)
          </li>
        </ul>
      </Section>

      {/* Cut-off */}
      <Section title="Cut-off Time">
        <Info label="7.5K" value="1 Hour 30 Minutes" />
        <Info
          label="1K"
          value="No cut-off for finish, race time limited to 1 hour"
        />
      </Section>

      {/* Entitlements */}
      <Section title="Participant Entitlements">
        <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3 list-disc pl-5 text-gray-600">
          <li>Foreign Made Finisher Medal</li>
          <li>Official Event T-Shirt</li>
          <li>Personal BIB with Chip Timing (7.5K)</li>
          <li>Goody Bag</li>
          <li>Silicone Wristband</li>
          <li>Hydration Support</li>
          <li>Post-Run Snacks</li>
          <li>Medical Aid</li>
          <li>E-Certificate</li>
          <li>Event Photography</li>
        </ul>
      </Section>

      {/* Prizes */}
      <Section title="Prizes & Recognition">
        <p className="text-gray-600 leading-7">
          The top 3 male and female runners in each category of the 7.5K race
          will receive <strong>prize money and a crest</strong>.
        </p>
        <p className="text-sm text-gray-500 mt-2">
          * No podium for 1K finishers
        </p>
      </Section>

      {/* Guidelines */}
      <Section title="Key Guidelines">
        <ul className="list-disc pl-5 space-y-2 text-gray-600">
          <li>Only registered participants may join</li>
          <li>Open to local and international runners</li>
          <li>No virtual participation</li>
          <li>No BIB or registration transfers</li>
          <li>No refund policy</li>
          <li>Avoid participation if medically unfit</li>
          <li>Organizers may adjust details if needed</li>
        </ul>
      </Section>

      {/* Footer */}
      <div className="border-t pt-6 text-sm text-gray-600">
        <p>
          <strong>Organized By:</strong> Dhaka Regional Committee (DRC) – ICAB
        </p>
        <p>
          <strong>In Association With:</strong> Institute of Chartered
          Accountants of Bangladesh (ICAB)
        </p>
        <p>
          <strong>Event Coordinated By:</strong> RunRise Nation
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
