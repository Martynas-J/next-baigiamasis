"use client"
import DiscovererItem from "@/Components/DiscovererItem/DiscovererItem"
import Container from "@/Components/Container/Container";
import styles from "./discoverers.module.scss"
import Link from "next/link";

import DelData from "@/Components/DelData/DelData";
import useSWR from "swr";
import GetData from "@/Components/GetData/GetData";
import ListContainer from "@/Components/ListContainer/ListContainer";

const DiscoverersPage = () => {

  const discoverers = GetData("discoverers")
  const { data, mutate } = useSWR(`/api/discoverers`)
  const deleteHandler = async (id) => {
    await DelData(id, "discoverers")
    mutate()
  }
  return (
    <Container>
      <div className={styles.discoverersWrapper}>
        <h1 className="page-title">Discoverers</h1>
        <Link href="/form/discoverer/new" className="create-link">Add New Discoverer</Link>
        <div className={styles.discovererWrapper}>
        <ListContainer ListItem={DiscovererItem} items={discoverers} onDelete={deleteHandler} />
        </div>
      </div>
    </Container>
  )
}

export default DiscoverersPage