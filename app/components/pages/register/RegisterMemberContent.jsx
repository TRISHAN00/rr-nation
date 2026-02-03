import RegistrationForm from "@/app/components/common/RegistrationForm";

export default function RegisterMemberContent() {
  return (
    <section className="py-20">
      <div className="container mx-auto px-4 sm:px-6 lg:px-7.5">
        <div className="max-w-3xl">
          {/* Title */}
          <h1 className="text-dark font-bold text-2xl sm:text-3xl lg:text-4xl mb-4">
            Register as Member
          </h1>

          {/* Intro */}
          <h3 className="text-brand font-semibold text-lg mb-2">
            Join the RunRise Nation Community!
          </h3>

          <p className="text-gray text-sm sm:text-base leading-relaxed mb-6">
            Welcome to RunRise Nation, where we inspire runners to Run and Rise
            Together! Whether you're a seasoned runner or just starting, this is
            your space to grow, connect, and achieve.
          </p>

          {/* Why Join */}
          <h4 className="text-dark font-semibold text-lg mb-3">Why Join Us?</h4>

          <ul className="space-y-3 text-gray text-sm sm:text-base leading-relaxed mb-6 list-disc pl-5">
            <li>
              <strong className="text-dark">
                Be Part of a Passionate Community:
              </strong>{" "}
              Connect with runners from all walks of life who share your
              enthusiasm for fitness and personal growth.
            </li>
            <li>
              <strong className="text-dark">
                Access to Exclusive Resources:
              </strong>{" "}
              Get updates on upcoming events, tips, and opportunities to improve
              your running journey.
            </li>
            <li>
              <strong className="text-dark">Motivation & Support:</strong> Share
              your progress, celebrate milestones, and stay inspired by others’
              achievements.
            </li>
            <li>
              <strong className="text-dark">Collaborate and Learn:</strong>{" "}
              Engage with like-minded individuals and explore partnerships with
              organizers and fitness enthusiasts.
            </li>
            <li>
              Registration Facilities for The Conqueror Challenges (no
              additional charge).
            </li>
          </ul>

          {/* How to Join */}
          <h4 className="text-dark font-semibold text-lg mb-3">How to Join</h4>

          <ul className="space-y-3 text-gray text-sm sm:text-base leading-relaxed mb-6 list-disc pl-5">
            <li>
              <strong className="text-dark">
                Fill out the Form & Follow Us:
              </strong>{" "}
              Stay updated by following the official RunRise Nation Facebook
              Page for news, events, and announcements.
            </li>
            <li>
              <strong className="text-dark">
                Join the Facebook Community Group:
              </strong>{" "}
              Become a member of our exclusive group to connect with runners,
              participate in discussions, and share your experiences.
            </li>
          </ul>

          {/* Community Rules */}
          <h4 className="text-dark font-semibold text-lg mb-3">
            Community Rules
          </h4>

          <ul className="space-y-3 text-gray text-sm sm:text-base leading-relaxed mb-6 list-disc pl-5">
            <li>
              <strong className="text-dark">Respect All Members:</strong> This
              is a space for positivity and encouragement.
            </li>
            <li>
              <strong className="text-dark">Stay Active:</strong> Share your
              updates, participate in discussions, and join events.
            </li>
            <li>
              <strong className="text-dark">Be Supportive:</strong> Cheer for
              others, provide tips, and celebrate everyone’s progress.
            </li>
            <li>
              <strong className="text-dark">No Spam or Promotions:</strong> Keep
              the focus on running, fitness, and our shared goals.
            </li>
          </ul>

          {/* Motivation */}
          <h4 className="text-dark font-semibold text-lg mb-3">
            Motivate Yourself to Join
          </h4>

          <p className="text-gray text-sm sm:text-base leading-relaxed mb-8">
            By joining RunRise Nation, you're not just running—you’re part of a
            movement that values health, camaraderie, and continuous
            improvement.
            <br />
            <br />
            Together, we aim to make running a lifestyle that inspires others
            and drives us toward greater goals.
            <br />
            <strong className="text-dark">
              Let’s lace up, hit the ground running, and rise to new
              heights—together!
            </strong>
          </p>

          {/* Terms */}
          <div className="flex items-center gap-2 mb-8">
            <input
              type="checkbox"
              id="terms"
              className="accent-brand cursor-pointer"
            />
            <label htmlFor="terms" className="text-sm text-gray cursor-pointer">
              I agree with terms and conditions
            </label>
          </div>

          {/* CTA */}
          <RegistrationForm/>
        </div>
      </div>
    </section>
  );
}
