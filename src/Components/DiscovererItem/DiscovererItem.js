import Image from "next/image";
import Card from "../Card/Card";
import { HUMAN_IMG_URL } from "../Config/Config";

const DiscovererItem = ({ data, onDelete }) => {

    const { name, occupation, _id, photos } = data

    return (
        <div className="card-wrapper">
            <Card url={`/discoverers/${_id}`}>
            <Image alt="discoverer" width={50} height={50} className="small-img" src={ HUMAN_IMG_URL} />
                <h2 > {name}</h2>
                <span>{occupation}</span>
            </Card >
            <button className="deleteButton" onClick={() => onDelete(_id)}> X</button> 
        </div>
    )
}

export default DiscovererItem