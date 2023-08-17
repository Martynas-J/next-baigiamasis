"use client"
import PlanetItem from "@/Components/PlanetItem/PlanetItem";
import Container from "@/Components/Container/Container";
import Link from "next/link";
import styles from "./planets.module.scss"

import Loading from "../loading";
import GetData from "@/Components/GetData/GetData";
import { useSWRConfig } from "swr";
import DelData from "@/Components/DelData/DelData";

const PlanetsPage = () => {

  const planets = GetData("planets")
  const { data, mutate } = useSWRConfig(`/api/planets`)
  const deleteHandler = async (id) => {
    await DelData(id, "planets")
    mutate()
  }
  return (
    <Container>
      <div className={styles.planetsWrapper}>
        <h1 className="page-title">Planets</h1>
        <Link href="/form/planet/new" className="create-link">Add New Planet</Link>
        <div className={styles.planetWrapper}>
        {
            planets ? (
              planets.length > 0 ? (
                planets.map(planet => (
                  <PlanetItem key={planet._id} planet={planet} onDelete={deleteHandler} />
                ))
              ) : (
                <h2>No data</h2>
              )
            ) : (
              <Loading />
            )
          }
        </div>
      </div>
    </Container> 

  )
}

export default PlanetsPage