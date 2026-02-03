import { Mail, Phone, User } from "lucide-react";

export default function ContactForm() {
  return (
    <form className="space-y-5">
      {/* Name */}
      <div>
        <label className="block text-sm font-medium mb-1">Full Name</label>
        <div className="relative">
          <User className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-gray-400" />
          <input
            type="text"
            placeholder="Your name"
            className="w-full h-11 rounded-lg border border-gray-200 pl-10 pr-4 text-sm focus:outline-none focus:ring-2 focus:ring-brand/30"
          />
        </div>
      </div>

      {/* Email */}
      <div>
        <label className="block text-sm font-medium mb-1">Email Address</label>
        <div className="relative">
          <Mail className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-gray-400" />
          <input
            type="email"
            placeholder="you@example.com"
            className="w-full h-11 rounded-lg border border-gray-200 pl-10 pr-4 text-sm focus:outline-none focus:ring-2 focus:ring-brand/30"
          />
        </div>
      </div>

      {/* Phone */}
      <div>
        <label className="block text-sm font-medium mb-1">Phone Number</label>
        <div className="relative">
          <Phone className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-gray-400" />
          <input
            type="tel"
            placeholder="+880 1XXXXXXXXX"
            className="w-full h-11 rounded-lg border border-gray-200 pl-10 pr-4 text-sm focus:outline-none focus:ring-2 focus:ring-brand/30"
          />
        </div>
      </div>

      {/* Message */}
      <div>
        <label className="block text-sm font-medium mb-1">Message</label>
        <textarea
          rows={4}
          placeholder="Write your message..."
          className="w-full rounded-lg border border-gray-200 px-4 py-3 text-sm resize-none focus:outline-none focus:ring-2 focus:ring-brand/30"
        />
      </div>

      {/* Submit */}
      <button
        type="submit"
        className="h-11 px-6 rounded-lg bg-brand text-white text-sm font-medium hover:bg-brand/90 transition"
      >
        Send Message
      </button>
    </form>
  );
}
