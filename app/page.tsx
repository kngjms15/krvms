import Acknowledgement from "./registration/acknowledgement/acknowledgement";
import BackgroundInfo from "./registration/backgroundInfo/backgroundInfo";
import VolunteerInfo from "./registration/volunteerInfo/volunteerInfo";
import WhatsNext from "./registration/whatsNext/whatsNext";


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
