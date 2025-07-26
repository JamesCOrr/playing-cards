
interface ButtonLinkProps {
    link: string;
    displayText: string;
}

export default function ButtonLink({ link, displayText }: ButtonLinkProps) {
    return(
        <a className='button-link' href={link}>{displayText}</a>
    )
}