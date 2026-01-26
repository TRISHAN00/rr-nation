import ContactForm from "./ContactForm";

export default function ContactMapForm() {
  return (
    <section className="py-5 sm:py-15 lg:py-20">
      <div className="container mx-auto px-4 sm:px-6 lg:px-7.5">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-10 lg:gap-14 items-stretch">
          
          {/* Left: Map */}
          <div className="relative rounded-3xl overflow-hidden min-h-70 sm:min-h-90 lg:min-h-130">
            <iframe
              title="Office Location"
              src="https://www.google.com/maps?q=Mirpur,Dhaka,Bangladesh&output=embed"
              className="absolute inset-0 w-full h-full border-0"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>

          {/* Right: Form */}
          <div className="bg-[#E6FAF8] rounded-3xl p-6 sm:p-8 lg:p-10 flex flex-col justify-center">
            <h3 className="text-dark font-bold text-xl sm:text-2xl lg:text-3xl mb-2">
              Get in Touch
            </h3>
            <p className="text-gray-600 text-sm sm:text-base mb-6 sm:mb-8 max-w-lg">
              Feel free to contact us. We’ll get back to you as soon as possible.
            </p>

            <ContactForm />
          </div>

        </div>
      </div>
    </section>
  );
}
