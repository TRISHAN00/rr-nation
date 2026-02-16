export default function EventContent({ event }) {
  return (
    <div className="  space-y-10 text-dark">
      {/* Title */}
      <div>
        <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-3">
          {event?.name}
        </h2>
        <section className="container mx-auto px-4 sm:px-6 lg:px-8 py-14">
          <div className="space-y-10">
            {/* Heading */}
            <div className="text-center space-y-4">
              <div className="flex flex-wrap  gap-4 text-sm sm:text-base font-medium text-gray-600">
                <span>📅 17 April 2026</span>
                <span>📍 Hatirjheel, Dhaka</span>
                <span>🌅 Reporting Time: 5:00 AM</span>
              </div>
            </div>

            {/* Description */}
            <p className="text-gray-700 text-base sm:text-lg leading-relaxed">
              Celebrate the spirit of Pohela Boishakh with energy, unity, and
              resilience at{" "}
              <span className="font-semibold">
                RunRise Nation Noboborsho Run 1433
              </span>
              . This special New Year run is more than a race—it’s a celebration
              of culture, health, and community. Whether you’re a seasoned
              runner or just beginning your fitness journey, everyone is welcome
              to start the Bengali year with strength and positivity.
            </p>

            {/* Race Categories */}
            <div className="space-y-4">
              <h2 className="text-2xl font-bold text-dark">
                🏃 Race Categories & Registration Fees
              </h2>

              <ul className="space-y-3">
                <li className="flex justify-between bg-muted px-5 py-3 rounded-lg">
                  <span>1.33 KM Boishakhi Fun Run</span>
                  <span className="font-semibold">1133 BDT</span>
                </li>
                <li className="flex justify-between bg-muted px-5 py-3 rounded-lg">
                  <span>7.33 KM Boishakhi Challenge</span>
                  <span className="font-semibold">1433 BDT</span>
                </li>
                <li className="flex justify-between bg-muted px-5 py-3 rounded-lg">
                  <span>14.33 KM Noboborsho Endurance Run</span>
                  <span className="font-semibold">1533 BDT</span>
                </li>
              </ul>
            </div>

            {/* Why Join */}
            <div className="space-y-4">
              <h2 className="text-2xl font-bold text-dark">🌟 Why Join?</h2>
              <ul className="grid sm:grid-cols-2 gap-3 text-gray-700">
                <li>✔ Celebrate Pohela Boishakh in a healthy way</li>
                <li>✔ Be part of a vibrant running community</li>
                <li>✔ Finisher medal & certificate</li>
                <li>✔ Professional race management & safety</li>
                <li>✔ Festive atmosphere filled with culture</li>
              </ul>
            </div>

            {/* Race Times */}
            <div className="grid sm:grid-cols-2 gap-6">
              <div className="space-y-3">
                <h3 className="text-xl font-semibold">🕒 Race Start Times</h3>
                <ul className="space-y-2 text-gray-700">
                  <li>14.33 KM – 5:30 AM</li>
                  <li>7.33 KM – 5:45 AM</li>
                  <li>1.33 KM – 6:00 AM</li>
                </ul>
              </div>

              <div className="space-y-3">
                <h3 className="text-xl font-semibold">⏱ Cut Off Times</h3>
                <ul className="space-y-2 text-gray-700">
                  <li>14.33 KM – 180 minutes</li>
                  <li>7.33 KM – 90 minutes</li>
                  <li>1.33 KM – No cut off</li>
                </ul>
              </div>
            </div>

            {/* Awards */}
            <div className="space-y-4">
              <h2 className="text-2xl font-bold text-dark">
                🏅 Awards & Recognition
              </h2>
              <ul className="space-y-2 text-gray-700">
                <li>
                  🏆 Top finishers (Male & Female) receive recognition crests
                </li>
                <li>
                  🏅 All finishers receive a Boishakhi Finisher Medal & Digital
                  Certificate
                </li>
              </ul>
            </div>

            {/* Key Dates */}
            <div className="space-y-3">
              <h2 className="text-2xl font-bold text-dark">📅 Key Dates</h2>
              <ul className="text-gray-700 space-y-2">
                <li>🗓️ Kit Distribution: To Be Announced</li>
                <li>🏁 Race Day: 17 April 2026</li>
              </ul>
            </div>

            {/* Rules */}
            <div className="space-y-4">
              <h2 className="text-2xl font-bold text-dark">
                📜 Rules & Regulations
              </h2>
              <ol className="list-decimal pl-5 space-y-2 text-gray-700">
                <li>Open to local & international runners</li>
                <li>Registration fees are non-refundable</li>
                <li>Live event only (no virtual run)</li>
                <li>Certificate name matches registration</li>
                <li>Bib must be visible at all times</li>
                <li>Medals only for race finishers</li>
                <li>Event details may change if required</li>
                <li>Participants join at their own risk</li>
                <li>Queries via official channels only</li>
                <li>Community Partner requires 30 runners</li>
              </ol>
            </div>

            {/* Disqualification */}
            <div className="bg-red-50 border border-red-200 rounded-xl p-6 space-y-3">
              <h2 className="text-xl font-bold text-red-600">
                🚫 Disqualification Rules
              </h2>
              <ul className="space-y-2 text-red-700">
                <li>🔴 Taking shortcuts</li>
                <li>🔴 Running without bib</li>
                <li>🔴 Bib swapping</li>
                <li>🔴 Unsportsmanlike behavior</li>
                <li>🔴 Failure to complete race</li>
              </ul>
            </div>

            {/* Footer CTA */}
            <div className="text-center pt-6">
              <p className="text-xl font-semibold text-dark">
                Let’s welcome 1433 with strength, unity, and new beginnings.
              </p>
              <p className="mt-2 text-lg font-bold text-brand">
                Let’s Run, Rise & Celebrate Together!
              </p>
            </div>
          </div>
        </section>
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
