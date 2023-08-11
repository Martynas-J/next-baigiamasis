import Link from "next/link";
import Card from "../Card/Card";
import { STAR_IMG_URL } from "../Config/Config";
import Image from "next/image";

const StarItem = ({ star, onDelete}) => {
    const { name, id, system, systemId, photos } = star

    return (
        <div className="card-wrapper">
            <Card>
                <Link href={`/stars/${id}`}><h2>{name}</h2></Link>
                <Image alt="planet" width={200} height={200} className="medium-img" src={photos[0] ? photos[0].thumbnailUrl : STAR_IMG_URL} />
                <Link href={`/systems/${systemId}`}><span>({system.name} system)</span></Link>
            </Card>
            <button className="deleteButton" onClick={() => onDelete(star.id)}> X</button>
        </div>
    )
}

export default StarItem