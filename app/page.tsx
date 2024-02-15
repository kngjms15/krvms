import Acknowledgement from "./registration/VolunteerRegistration/Acknowledgement";
import BackgroundInfo from "./registration/VolunteerRegistration/BackgroundInfo";
import VolunteerInfo from "./registration/VolunteerRegistration/VolunteerInfo";
import WhatsNext from "./registration/VolunteerRegistration/WhatsNext";


export default function Home() {
  return (
    <>
      <VolunteerInfo />
      <BackgroundInfo />
      <Acknowledgement />
      <WhatsNext />

      
    </>
  );
}
