
import ButtonAboutMe from './ButtonAboutMe';


export default function ButtonImage({ className }: { className?: string }) {
    return (
        <div className={`mt-10 mb-5 sm:mb-10 ${className || ''}`}>

            <ButtonAboutMe/>
        </div>
    )
}