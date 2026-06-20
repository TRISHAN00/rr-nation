"use client"
import RegistrationForm from "@/app/components/pages/register/components/RegistrationForm";
import { CheckCircle2, Gift, Shirt, Users, GraduationCap, Trophy, Medal, BadgePercent, LayoutDashboard, Sparkles, ShieldCheck, CreditCard } from "lucide-react";
import { useState } from "react";

const SectionTitle = ({ icon: Icon, children }) => (
  <h4 className="text-dark font-bold text-lg sm:text-xl mb-4 flex items-center gap-2">
    {Icon && <Icon className="h-5 w-5 text-brand shrink-0" />}
    {children}
  </h4>
);

const ListItem = ({ children }) => (
  <li className="flex items-start gap-2.5 text-gray text-sm sm:text-base leading-relaxed">
    <CheckCircle2 className="h-4 w-4 text-brand mt-1 shrink-0" />
    <span>{children}</span>
  </li>
);

export default function RegisterMemberContent() {
  const [agree, setAgree] = useState(false);

  return (
    <section className="py-12 sm:py-20">
      <div className="container mx-auto px-4 sm:px-6 lg:px-7.5">
        <div className="max-w-4xl mx-auto space-y-10">

          {/* Hero */}
          <div className="text-center space-y-4">
            <h1 className="text-dark font-bold text-2xl sm:text-3xl lg:text-4xl">
              Why Become a RunRise Nation Member?
            </h1>
            <p className="text-gray text-sm sm:text-base leading-relaxed max-w-3xl mx-auto">
              RunRise Nation is more than a running community and event organizer, it&apos;s a community that inspires people to Run, Rise and Explore Together. Whether you&apos;re a beginner or an experienced athlete, becoming a member connects you with a passionate network dedicated to fitness, sportsmanship, leadership, and personal growth.
            </p>
          </div>

          {/* Fee */}
          <div className="bg-brand/5 border border-brand/20 rounded-xl p-6 sm:p-8 text-center space-y-3">
            <h4 className="text-dark font-bold text-xl">Membership Registration Fee</h4>
            <p className="text-3xl sm:text-4xl font-black text-brand">BDT 500</p>
            <p className="text-gray text-sm">(One Time Registration Fee)</p>
            <p className="text-gray text-sm">
              Upon successful registration, every member will receive:
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-8 pt-2">
              <div className="flex items-center gap-2 text-sm font-medium text-dark">
                <Shirt className="h-5 w-5 text-brand" /> An exclusive RunRise Nation Community Jersey
              </div>
              <div className="flex items-center gap-2 text-sm font-medium text-dark">
                <Gift className="h-5 w-5 text-brand" /> A special Welcome Souvenir
              </div>
              <div className="flex items-center gap-2 text-sm font-medium text-dark">
                <CreditCard className="h-5 w-5 text-brand" /> Membership activation on the RunRise Nation platform
              </div>
            </div>
            <p className="text-xs text-gray mt-2">
              Delivery charges for the welcome package will be applicable separately.
            </p>
          </div>

          {/* Benefits */}
          <div>
            <SectionTitle icon={Sparkles}>Exclusive Member Benefits</SectionTitle>

            <div className="space-y-8">
              {/* Community */}
              <div>
                <SectionTitle icon={Users}>Community & Networking</SectionTitle>
                <ul className="space-y-2">
                  <ListItem>Become part of one of Bangladesh&apos;s fastest growing running communities.</ListItem>
                  <ListItem>Connect with runners, cyclists, swimmers, and fitness enthusiasts from across the country.</ListItem>
                  <ListItem>Build friendships, share experiences, and stay motivated together.</ListItem>
                </ul>
              </div>

              {/* Training */}
              <div>
                <SectionTitle icon={GraduationCap}>Training & Development</SectionTitle>
                <p className="text-gray text-sm sm:text-base mb-3">Members receive access to:</p>
                <ul className="space-y-2">
                  <ListItem>Running training sessions</ListItem>
                  <ListItem>Cycling group rides</ListItem>
                  <ListItem>Swimming practice sessions</ListItem>
                  <ListItem>Training tips and performance guidance</ListItem>
                  <ListItem>Event recommendations</ListItem>
                  <ListItem>Community challenges and fitness initiatives</ListItem>
                </ul>
              </div>

              {/* Events */}
              <div>
                <SectionTitle icon={Trophy}>Sports & Event Opportunities</SectionTitle>
                <ul className="space-y-2">
                  <ListItem>Priority opportunities to volunteer and contribute in event management.</ListItem>
                  <ListItem>Active engagement in sports, social, and community activities.</ListItem>
                  <ListItem>Exclusive member only events and experiences.</ListItem>
                  <ListItem>Additional benefits and privileges during RunRise Nation events.</ListItem>
                </ul>
              </div>

              {/* Discounts */}
              <div>
                <SectionTitle icon={BadgePercent}>Member Discounts</SectionTitle>
                <p className="text-gray text-sm sm:text-base mb-3">Enjoy exclusive discounts and special offers on:</p>
                <ul className="space-y-2">
                  <ListItem>Selected running events</ListItem>
                  <ListItem>Partner shops</ListItem>
                  <ListItem>Sports products and services</ListItem>
                  <ListItem>Community partner offers</ListItem>
                  <ListItem>Future promotional campaigns</ListItem>
                </ul>
              </div>

              {/* Dashboard */}
              <div>
                <SectionTitle icon={LayoutDashboard}>Personalized Member Dashboard</SectionTitle>
                <p className="text-gray text-sm sm:text-base mb-3">Every active member receives access to a dedicated dashboard featuring:</p>
                <ul className="space-y-2">
                  <ListItem>Personalized member profile</ListItem>
                  <ListItem>Event registration history</ListItem>
                  <ListItem>Event listing and participation tracking</ListItem>
                  <ListItem>Total event expenditure summary</ListItem>
                  <ListItem>Medal collection status</ListItem>
                  <ListItem>Event completion records</ListItem>
                  <ListItem>Upcoming event reminders</ListItem>
                </ul>
              </div>

              {/* More Features */}
              <div>
                <SectionTitle icon={Sparkles}>More Exclusive Features</SectionTitle>
                <p className="text-gray text-sm sm:text-base mb-3">Exciting new features are under development, including:</p>
                <ul className="space-y-2">
                  <ListItem>Monthly running, cycling, and swimming data tracking</ListItem>
                  <ListItem>Personal activity records</ListItem>
                  <ListItem>Performance analytics</ListItem>
                  <ListItem>Goal tracking and progress reports</ListItem>
                </ul>
              </div>

              {/* Recognition */}
              <div>
                <SectionTitle icon={Medal}>Recognition & Rewards</SectionTitle>
                <p className="text-gray text-sm sm:text-base mb-3">Outstanding members will receive recognition through:</p>
                <ul className="space-y-2">
                  <ListItem>Member of the Month</ListItem>
                  <ListItem>Community appreciation awards</ListItem>
                  <ListItem>Performance recognitions</ListItem>
                  <ListItem>Volunteer and leadership acknowledgements</ListItem>
                  <ListItem>Special features on RunRise Nation platforms</ListItem>
                </ul>
              </div>
            </div>
          </div>

          {/* Guidelines */}
          <div className="bg-amber-50/50 border border-amber-200/50 rounded-xl p-6 sm:p-8">
            <SectionTitle icon={ShieldCheck}>Community Guidelines</SectionTitle>
            <p className="text-gray text-sm sm:text-base mb-3">
              To maintain a positive, respectful, and inspiring environment, every member is expected to:
            </p>
            <ul className="space-y-2">
              <ListItem>Respect fellow members regardless of age, gender, ability, or experience.</ListItem>
              <ListItem>Promote sportsmanship and positive community values.</ListItem>
              <ListItem>Encourage healthy competition and mutual support.</ListItem>
              <ListItem>Follow event rules and safety instructions.</ListItem>
              <ListItem>Represent RunRise Nation with integrity both online and offline.</ListItem>
              <ListItem>Avoid abusive language, discrimination, harassment, or actions that may damage the community&apos;s reputation.</ListItem>
              <ListItem>Support community initiatives and contribute positively whenever possible.</ListItem>
            </ul>
          </div>

          {/* Activation Policy */}
          <div>
            <SectionTitle icon={CreditCard}>Membership Activation Policy</SectionTitle>
            <ul className="space-y-3">
              <ListItem>Membership is activated only after the registration fee has been successfully paid.</ListItem>
              <ListItem>Membership requests submitted without payment will be declined.</ListItem>
              <ListItem>
                Until payment is confirmed:
                <ul className="mt-1 space-y-1 ml-5">
                  <li className="flex items-start gap-2 text-gray text-sm">
                    <span className="text-brand">•</span> Member dashboard access will remain inactive.
                  </li>
                  <li className="flex items-start gap-2 text-gray text-sm">
                    <span className="text-brand">•</span> Exclusive member features will not be available.
                  </li>
                  <li className="flex items-start gap-2 text-gray text-sm">
                    <span className="text-brand">•</span> Member-only benefits cannot be claimed.
                  </li>
                </ul>
              </ListItem>
            </ul>
          </div>

          {/* Closing */}
          <div className="text-center space-y-3 pt-4 border-t border-gray/20">
            <h4 className="text-dark font-bold text-xl">Together We Run and Rise</h4>
            <p className="text-gray text-sm sm:text-base leading-relaxed max-w-3xl mx-auto">
              RunRise Nation is built by its dedicated members, supported by our Admin Team, Advisor Team, Core Team, volunteers, and community leaders. Together, we are creating a stronger running culture, encouraging healthier lifestyles, and building a community that extends far beyond races.
            </p>
            <p className="text-dark font-semibold text-base">
              Join RunRise Nation today and become part of a journey where we Run and Rise Together.
            </p>
          </div>

          {/* Terms */}
          <div className="flex items-center gap-2 pt-4">
            <input
              type="checkbox"
              id="terms"
              onChange={(e) => setAgree(e.target.checked)}
              checked={agree}
              className="accent-brand cursor-pointer"
            />
            <label htmlFor="terms" className="text-sm text-gray cursor-pointer">
              I agree with terms and conditions
            </label>
          </div>

          {/* CTA */}
          <RegistrationForm agree={agree} />
        </div>
      </div>
    </section>
  );
}
