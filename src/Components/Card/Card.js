import Link from 'next/link';
import './Card.scss';

function Card({ classes, children, url }) {
    const addedClasses = classes ? classes : '';

    return (
        url ?
            <Link className={`card ${addedClasses}`} href={url}>
                {children}
            </Link>
            : <div className={`card ${addedClasses}`}>{ children }</div>
    )
}

export default Card;