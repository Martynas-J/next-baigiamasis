"use client"
import UniversalForm from "@/Components/Form/UniversalForm"
import { API_URL, PLANET_IMG_URL } from "@/Components/Config/Config";
import { toast } from "react-toastify";
import axios from "axios";
import { useEffect, useState } from "react";
import Container from "@/Components/Container/Container";
import { useRouter } from "next/navigation";

const PlanetFormPage = ({params}) => {
  const apiUrl = process.env.API_URL1
  const id  = params.id
  const navigate = useRouter()

  const [planet, setPlanet] = useState('');
  const [systems, setSystems] = useState('');
  const [discoverers, setDiscoverers] = useState('');

  useEffect(() => {
    axios.get(`${apiUrl}/systems`)
      .then(res => setSystems(res.data))
      .catch(res => toast.error(res.message))

    axios.get(`${apiUrl}/discoverers`)
      .then(res => setDiscoverers(res.data))
      .catch(res => toast.error(res.message))

    if (id && id !== "new") {
      axios.get(`${apiUrl}/planets/${id}`)
        .then(res => {
          let { name, discovererId, galaxy, galaxyGroup, satellites, id, systemId } = res.data
          const newData = {
            name,
            discovererId,
            galaxy,
            galaxyGroup,
            satellites,
            systemId,
            url: PLANET_IMG_URL,
            thumbnailUrl: PLANET_IMG_URL,
            id,
            // photoId: photos.length > 0 ? photos[0].id : '',
          }
          return setPlanet(newData)
        })
        .catch(res => toast.error(res.message))
    }
  }, [])

  if (!systems || !discoverers) {
    return ""
  }

  const allSystems = systems.map(item => ({ id: item._id, name: item.name }))
  const allDiscoverers = discoverers.map(item => ({ id: item._id, name: item.name }))

  const inputs = [
    { type: 'text', name: 'name', label: 'Name', value: '', required: true },
    { type: 'text', name: 'satellites', label: 'Satellites (for example sat1, sat2)', value: '', required: false},
    { type: 'url', name: 'url', label: 'Photo URL', value: '', required: true },
    { type: 'url', name: 'thumbnailUrl', label: 'Thumbnail Photo URL', value: '', required: true },
    { type: 'select', name: 'systemId', label: 'System', options: allSystems, value: '', required: true },
    { type: 'select', name: 'discovererId', label: 'Discoverer', options: allDiscoverers, value: '', required: true },
    { type: 'text', name: 'galaxy', label: 'Galaxy', value: '', required: true },
    { type: 'text', name: 'galaxyGroup', label: 'Galaxy Group', value: '', required: true },
  ];
  const addPlanetHandler = (data) => {

    let { name, discovererId, galaxy, galaxyGroup, satellites, url, thumbnailUrl, photoId, systemId } = data
    discovererId = discovererId
    systemId = systemId
    satellites = satellites ? satellites : ""
    const newPlanet = { name, discovererId, galaxy, galaxyGroup, satellites, systemId }

    if (planet) {
      axios
        .patch(`${apiUrl}/planets/${id}`, newPlanet)
        // .then((response) => {
        //   const planetId = response.data.id;
        //   const photoData = { name, url, thumbnailUrl, planetId, category: "planets" };
        //   if (photoId) {
        //     return axios.patch(`${apiUrl}/photos/${photoId}`, photoData)
        //   } else {
        //     return axios.post(`${apiUrl}/photos`, photoData);
        //   }
        // })
        .then(() => {
          toast.success("Planet was Edited");
          setPlanet("");
          navigate?.push("/planets")
        })
        .catch((res) => toast.error(res.messages));
    } else {
      axios.post(`${apiUrl}/planets`, newPlanet)
        // .then((response) => {
        //   const planetId = response.data.id;
        //   const photoData = { name, url, thumbnailUrl, planetId, category: "planets" };
        //   return axios.post(`${apiUrl}/photos`, photoData);
        // })
        .then(() => {
          toast.success('Planet was added');
          navigate?.push("/planets")
        })
        .catch((error) => {
          toast.error(error.message);
        });
    }
  }
  return (
    <Container>
      <div className="form-wrapper">
        <h1 className="page-title">Planet Form</h1>
        <UniversalForm
          inputs={inputs}
          onAddData={addPlanetHandler}
          newData={planet ? planet : ""}
        />
      </div>
    </Container>
  )
}

export default PlanetFormPage