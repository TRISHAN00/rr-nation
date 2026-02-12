import EventInfoForm from "../../_components/module/events/create/EventInfoForm";
import EventPackages from "../../_components/module/events/create/EventPackages";
import { RegistrationFormSettings } from "../../_components/module/events/RegistrationFormSettings";
import { TShirtSizeManager } from "../../_components/module/events/TShirtSizeManager";

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
