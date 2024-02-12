import Image from "next/image";
import VolunteerInfo from "./registration/volunteerInfo/volunteerInfo";
import WhatsNext from "./registration/whatsNext/whatsNext";
import BackgroundInfo from "./registration/backgroundInfo/backgroundInfo";
import VolInfo from "./registration/volInfo/volInfo";


export default function Home() {
  return (
    <>
      <VolInfo />
      <BackgroundInfo />
      
    </>
  );
}
