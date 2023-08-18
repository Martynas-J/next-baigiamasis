"use client"
import PlanetItem from "@/Components/PlanetItem/PlanetItem";
import Container from "@/Components/Container/Container";
import Link from "next/link";
import styles from "./planets.module.scss"

import GetData from "@/Components/GetData/GetData";
import useSWR from "swr";
import DelData from "@/Components/DelData/DelData";
import ListContainer from "@/Components/ListContainer/ListContainer";

const PlanetsPage = () => {

  const planets = GetData("planets")
  const { data, mutate } = useSWR(`/api/planets`)
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
        <ListContainer ListItem={PlanetItem} items={planets} onDelete={deleteHandler} />
        </div>
      </div>
    </Container> 

  )
}

export default PlanetsPage