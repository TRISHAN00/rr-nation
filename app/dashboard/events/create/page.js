import EventPackages from "./_components/EventPackages";
import { RegistrationFormSettings } from "./_components/RegistrationFormSettings";
import { TShirtSizeManager } from "./_components/TShirtSizeManager";
import EventInfoForm from "./_components/EventInfoForm";

export default function EventCreatePage() {
  return (
    <>
      <EventInfoForm />
      <EventPackages/>
      <TShirtSizeManager/>
      <RegistrationFormSettings/>
    </>
  );
}
