import Link from "next/link";
import Card from "../Card/Card";

const SystemItem = ({ system, onDelete }) => {
    const { name, _id, planets, stars } = system

    let planetsElement = ""
    let starsElement = ""


    if (planets.length > 0) {
        const planetsNr = planets.split(",").length
        planetsElement = planetsNr > 1 ? `(${planetsNr} Planets)` : `(${planetsNr} Planet)`
    } else {
        planetsElement = "(No Planets)"
    }
    if (stars.length > 0) {
        const starsNr = stars.split(",").length
        starsElement = starsNr > 1 ? `(${starsNr} Stars)` : `(${starsNr} Star)`
    } else {
        starsElement = "(No Stars)"
    }

    return (
        <div className="card-wrapper">
            <Card>
                <Link href={`/systems/${_id}`}><h2 >{name}</h2></Link>
                <Link href="/planets"><span>{planetsElement}</span></Link>
                <Link href="/stars"><span>{starsElement}</span></Link>
            </Card>
            <button className="deleteButton" onClick={() => onDelete(system._id)}> X</button>
        </div>
    )
}
export default SystemItem