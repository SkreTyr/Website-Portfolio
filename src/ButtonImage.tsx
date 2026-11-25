import ImageReveal from './ImageReveal';

interface ButtonImageProps {
  className?: string;
  label?: string;
  href?: string;
  image?: string;
  lightImage?: string;
}

export default function ButtonImage({ className, label, href, image, lightImage }: ButtonImageProps) {
    return (
        <div className={`mt-5 mb-5 sm:mb-10 ${className || ''}`}>

            <ImageReveal label={label} href={href} image={image} lightImage={lightImage} />
        </div>
    )
}