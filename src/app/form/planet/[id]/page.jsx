"use client"
import UniversalForm from "@/Components/Form/UniversalForm"
import { API_URL, PLANET_IMG_URL } from "@/Components/Config/Config";
import { toast } from "react-toastify";
import axios from "axios";
import { useEffect, useState } from "react";
import Container from "@/Components/Container/Container";
import { useRouter } from "next/navigation";

const PlanetFormPage = ({params}) => {
  const id  = params.id
  const navigate = useRouter

  const [planet, setPlanet] = useState('');
  const [systems, setSystems] = useState('');
  const [discoverers, setDiscoverers] = useState('');

  useEffect(() => {
    axios.get(`${API_URL}/systems`)
      .then(res => setSystems(res.data))
      .catch(res => toast.error(res.message))

    axios.get(`${API_URL}/discoverers`)
      .then(res => setDiscoverers(res.data))
      .catch(res => toast.error(res.message))

    if (id && id !== "new") {
      axios.get(`${API_URL}/planets/${id}?_embed=photos`)
        .then(res => {
          let { name, discovererId, galaxy, galaxyGroup, satellites, photos, id, systemId } = res.data
          const newData = {
            name,
            discovererId,
            galaxy,
            galaxyGroup,
            satellites,
            systemId,
            url: photos.length > 0 ? photos[0].url : PLANET_IMG_URL,
            thumbnailUrl: photos.length > 0 ? photos[0].thumbnailUrl : PLANET_IMG_URL,
            id,
            photoId: photos.length > 0 ? photos[0].id : '',
          }
          return setPlanet(newData)
        })
        .catch(res => toast.error(res.message))
    }
  }, [])

  if (!systems || !discoverers) {
    return ""
  }

  const allSystems = systems.map(item => ({ id: item.id, name: item.name }))
  const allDiscoverers = discoverers.map(item => ({ id: item.id, name: item.name }))

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
    discovererId = Number(discovererId)
    systemId = Number(systemId)
    satellites = satellites ? satellites : ""
    const newPlanet = { name, discovererId, galaxy, galaxyGroup, satellites, systemId }

    if (planet) {
      axios
        .patch(`${API_URL}/planets/${id}`, newPlanet)
        .then((response) => {
          const planetId = response.data.id;
          const photoData = { name, url, thumbnailUrl, planetId, category: "planets" };
          if (photoId) {
            return axios.patch(`${API_URL}/photos/${photoId}`, photoData)
          } else {
            return axios.post(`${API_URL}/photos`, photoData);
          }
        })
        .then(() => {
          toast.success("Planet was Edited");
          setPlanet("");
          navigate("/planets")
        })
        .catch((res) => toast.error(res.messages));
    } else {
      axios.post(`${API_URL}/planets`, newPlanet)
        .then((response) => {
          const planetId = response.data.id;
          const photoData = { name, url, thumbnailUrl, planetId, category: "planets" };
          return axios.post(`${API_URL}/photos`, photoData);
        })
        .then(() => {
          toast.success('Planet was added');
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