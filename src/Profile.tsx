import ThreeDImagePageflip from './components/lightswind/3d-image-pageflip'
import { useIsMobile } from './hooks/use-mobile'

function Profile() {
  const isTablet = useIsMobile();

  return (
    <ThreeDImagePageflip
      pageHeight={480}
      pageWidth={isTablet ? 330 : 450}
      className=" hidden md:flex  h-screen  w-full md:h-3/4 xl:h-4/6 xl:w-3/4"
    />
  );
}

export default Profile;
