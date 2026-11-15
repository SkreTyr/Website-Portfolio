
import ButtonAboutMe from './ButtonAboutMe';

interface ButtonImageProps {
  className?: string;
  label?: string;
  href?: string;
  image?: string;
}

export default function ButtonImage({ className, label, href, image }: ButtonImageProps) {
    return (
        <div className={`mt-5 mb-5 sm:mb-10 ${className || ''}`}>

            <ButtonAboutMe label={label} href={href} image={image} />
        </div>
    )
}