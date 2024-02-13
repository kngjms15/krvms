import Image from "next/image";
import WhatsNext from "./registration/whatsNext/whatsNext";
import BackgroundInfo from "./registration/backgroundInfo/backgroundInfo";
import VolunteerInfo from "./registration/volunteerInfo/volunteerInfo";


export default function Home() {
  return (
    <>
      <VolunteerInfo />
      <BackgroundInfo />
      
    </>
  );
}
