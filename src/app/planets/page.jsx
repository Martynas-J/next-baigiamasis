"use client"
import { useEffect, useState } from "react";
import axios from "axios";
import { API_URL } from "@/Components/Config/Config";
import { toast } from "react-toastify";
import PlanetItem from "@/Components/PlanetItem/PlanetItem";
import Container from "@/Components/Container/Container";
import Link from "next/link";
import styles from "./palnets.module.scss"

const PlanetsPage = () => {

  const [planets, setPlanets] = useState('');

  useEffect(() => {
    axios.get(`${API_URL}/planets?_expand=system&_embed=photos`)
      .then(res => setPlanets(res.data))
      .catch(res => toast.error(res.message))
  }, [])
  if (!planets) {
    return ""
  }
  const deleteHandler = (id) => {
    axios.delete(`${API_URL}/planets/${id}?_embed=photos`)
      .then(() => {
        toast.info("Planet was deleted!")
        setPlanets(prevState => {
          let newState = [...prevState]
          return newState.filter(((planet) => planet.id !== id))
        })
      })
      .catch(err => {
        toast.error(err.message);
      });
  }
  return (
    <Container>
      <div className={styles.planetsWrapper}>
        <h1 className="page-title">Planets</h1>
        <Link href="/form/planet/new" className="create-link">Add New Planet</Link>
        <div className={styles.planetWrapper}>
          {
            planets.length > 0 ?
              planets.map(planet => <PlanetItem key={planet.id} onDelete={deleteHandler} planet={planet} />) :
              <h2>No data</h2>
          }
        </div>
      </div>
    </Container>

  )
}

export default PlanetsPage