import { BsFillImageFill, BsFillCameraVideoFill } from "react-icons/bs";
import { PiSpeakerSimpleHighFill } from "react-icons/pi";

export default function fileToIcon(type) {
  if (type.includes("video")) return <BsFillCameraVideoFill />;
  if (type.includes("audio")) return <PiSpeakerSimpleHighFill />;
  if (type.includes("image")) return <BsFillImageFill />;
}
