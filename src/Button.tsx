import ImageReveal from './ImageReveal';

interface ButtonProps {
  className?: string;
  label?: string;
  href?: string;
  image?: string;
}

export default function Button({ className, label = "Get In Touch", href = "/contact", image }: ButtonProps) {

    return (
        <div className={`mt-10 mb-5 sm:mb-10 ${className || ''}`}>
            <ImageReveal label={label} href={href} image={image} />
        </div>
    )
}