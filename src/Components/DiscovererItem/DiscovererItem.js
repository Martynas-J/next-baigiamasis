import Image from "next/image";
import Card from "../Card/Card";
import { HUMAN_IMG_URL } from "../Config/Config";

const DiscovererItem = ({ discoverer, onDelete }) => {

    const { name, occupation, id, photos } = discoverer

    return (
        <div className="card-wrapper">
            <Card url={`/discoverers/${id}`}>
            <Image alt="discoverer" width={50} height={50} className="small-img" src={photos[0] ? photos[0].thumbnailUrl : HUMAN_IMG_URL} />
                <h2 > {name}</h2>
                <span>{occupation}</span>
            </Card >
            <button className="deleteButton" onClick={() => onDelete(discoverer.id)}> X</button>
        </div>
    )
}

export default DiscovererItem