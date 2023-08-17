"use client"
import DiscovererItem from "@/Components/DiscovererItem/DiscovererItem"
import Container from "@/Components/Container/Container";
import styles from "./discoverers.module.scss"
import Link from "next/link";
import Loading from "../loading";
import DelData from "@/Components/DelData/DelData";
import { useSWRConfig } from "swr";
import GetData from "@/Components/GetData/GetData";

const DiscoverersPage = () => {

  const discoverers = GetData("discoverers")
  const { data, mutate } = useSWRConfig(`/api/discoverers`)
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
          {
            discoverers ? (
              discoverers.length > 0 ? (
                discoverers.map(discoverer => (
                  <DiscovererItem key={discoverer._id} discoverer={discoverer} onDelete={deleteHandler} />
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

export default DiscoverersPage