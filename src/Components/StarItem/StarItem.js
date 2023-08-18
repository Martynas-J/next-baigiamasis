import Link from "next/link";
import Card from "../Card/Card";
import { STAR_IMG_URL } from "../Config/Config";
import Image from "next/image";

const StarItem = ({ data, onDelete}) => {
    const { name, _id, systemId } = data

    return (
        <div className="card-wrapper">
            <Card>
                <Link href={`/stars/${_id}`}><h2>{name}</h2></Link>
                <Image alt="stars" width={200} height={200} className="medium-img" src={STAR_IMG_URL} />
                <Link href={`/systems/${systemId._id}`}><span>({systemId.name} system)</span></Link>
            </Card>
            <button className="deleteButton" onClick={() => onDelete(_id)}> X</button>
        </div>
    )
}

export default StarItem