import EventInfoForm from "../../_components/module/events/create/EventInfoForm";
import EventPackages from "../../_components/module/events/create/EventPackages";
import { RegistrationFormSettings } from "../_components/RegistrationFormSettings";
import { TShirtSizeManager } from "../_components/TShirtSizeManager";

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
