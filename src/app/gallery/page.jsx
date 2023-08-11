"use client"
import { useEffect, useState } from "react";
import axios from "axios";
import { API_URL } from "@/Components/Config/Config";
import { toast } from "react-toastify";
import Container from "@/Components/Container/Container";
import styles from "./gallery.module.scss"
import Link from "next/link";

const GalleryPage = () => {
  const [photos, setPhotos] = useState('');

  useEffect(() => {
    axios.get(`${API_URL}/photos`)
      .then(res => setPhotos(res.data))
      .catch(res => toast.error(res.message))
  }, [])

  if (!photos) {
    return ""
  }
  const stars = photos.filter(photo => photo.category === "stars").slice(0, 5)
  const discoverers = photos.filter(photo => photo.category === "discoverers").slice(0, 5)
  const planets = photos.filter(photo => photo.category === "planets").slice(0, 5)
  const systems = photos.filter(photo => photo.category === "systems").slice(0, 5)


  const starsPhotosElement = stars.length > 0 ?
    stars.map(star =>
      <Link key={star.id} href="gallery/stars">
        <img className="medium-img" src={star.thumbnailUrl} />
      </Link>)
    : <span className="empty-text">Is empty, <Link href="gallery/stars">click here to add</Link></span>
  const discoverersPhotosElement = discoverers.length > 0 ?
    discoverers.map(discoverer =>
      <Link key={discoverer.id} href="gallery/discoverers" >
        <img className="medium-img" src={discoverer.thumbnailUrl} />
      </Link>)
    : <span className="empty-text">Is empty, <Link href="gallery/discoverers">click here to add</Link></span>
  const planetsPhotosElement = planets.length > 0 ?

    planets.map(planet =>
      <Link key={planet.id} href="gallery/planets">
        <img className="medium-img" key={planet.id} src={planet.thumbnailUrl} />
      </Link>)
    : <span className="empty-text">Is empty, <Link href="gallery/planets">click here to add</Link></span>

  const systemsPhotosElement = systems.length > 0 ?
    systems.map(system =>
      <Link key={system.id} href="gallery/systems">
        <img className="medium-img" key={system.id} src={system.thumbnailUrl} />
      </Link>)
    : <span className={styles.emptyText}>Is empty, <Link href="gallery/systems">click here to add</Link></span>

  return (
    <Container>
      <div className={styles.galleryWrapper}>
        <h1 className="page-title">Gallery</h1>
        <div className={styles.photosWrapper}>
          <h2 className={styles.photosTitle}>Stars</h2>
          <div className={styles.photos}>{starsPhotosElement}</div>
        </div>
        <div className={styles.photosWrapper}>
          <h2 className={styles.photosTitle}>Discoverers</h2>
          <div className={styles.photos}>{discoverersPhotosElement}</div>
        </div>
        <div className={styles.photosWrapper}>
          <h2 className={styles.photosTitle}>Planets</h2>
          <div className={styles.photos}>{planetsPhotosElement}</div>
        </div>
        <div className={styles.photosWrapper}>
          <h2 className={styles.photosTitle}>Systems</h2>
          <div className={styles.photos}>{systemsPhotosElement}</div>
        </div>
      </div>
    </Container>
  )
}

export default GalleryPage