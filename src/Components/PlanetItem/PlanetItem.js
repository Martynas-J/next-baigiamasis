
import Image from "next/image";
import Card from "../Card/Card";
import { PLANET_IMG_URL } from "../Config/Config";

const PlanetItem = ({ planet, onDelete }) => {

    const { name, id, photos, satellites } = planet

    return (
        <div className="card-wrapper">
            <Card url={`planets/${id}`}>
                <Image alt="planet" width={200} height={200} className="medium-img" src={photos[0] ? photos[0].thumbnailUrl : PLANET_IMG_URL} />
                <h2 > {name}</h2>
                <span>Natural satellites ({satellites.length > 0 ? satellites.split(",").length : 0 })</span>
            </Card>
            <button className="deleteButton" onClick={() => onDelete(planet.id)}> X</button>
        </div >
    )
}

export default PlanetItem