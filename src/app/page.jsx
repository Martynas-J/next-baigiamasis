import Container from "@/Components/Container/Container"
import styles from  "./home.module.scss"

const HomePage = () => {
  return (
    <Container>
      <div className={styles.homeWrapper}>
        <h1 className="page-title">Home</h1>
        <div className={styles.homeContent}>
          <p>
            The universe is a vast expanse that contains numerous celestial objects, and one way to categorize these objects is based on their classification as planets. Planets are large bodies that orbit around stars, such as our own Sun. They are characterized by their gravitational force and their spherical shape. The universe is home to a multitude of planets, with over 100 known planets discovered so far.
          </p>
          <p>
            Planets can vary significantly in size, temperature, and composition. They are composed of gases, liquids, and solids. These celestial bodies may have atmospheres, surfaces, rocks, and even water. Some planets have their own moons and revolve around their host star. They can exhibit diverse characteristics, such as having a solid surface like Earth or being predominantly gaseous like Jupiter.
          </p>
          <p>
            The categorization of planets in the universe is an ongoing scientific endeavor. Scientists have classified planets into different categories based on their characteristics. One common categorization includes terrestrial planets, gas giants, and icy or rocky planets. Terrestrial planets, like Earth, are primarily composed of solid materials and have a relatively thin atmosphere. Gas giants, such as Jupiter and Saturn, are predominantly made up of gases and lack a well-defined solid surface. Icy or rocky planets, like Pluto, have a significant amount of ice or rock in their composition.
          </p>
          <p>
            Understanding the distribution and classification of planets in the universe is crucial for unraveling the mysteries of our cosmic environment. It provides insights into the diversity and complexity of celestial bodies and their formation processes. Astronomers and researchers continue to explore and discover new planets, expanding our knowledge of the universe and the planetary systems beyond our own.
          </p>
          <p>
            As our exploration of the universe advances, the quest to understand the distribution and characteristics of planets will undoubtedly continue to captivate the minds of scientists and space enthusiasts alike. The study of planets not only expands our knowledge of the universe but also sparks intriguing questions about the possibility of life beyond our own planet.
          </p>
          <ul className={styles.list}>
            <li>Asteroids</li>
            <li>Comets</li>
            <li>Moons</li>
            <li>Dwarf Planets</li>
            <li>Satellites</li>
            <li>Planets</li>
            <li>Star Systems</li>
            <li>Star Clusters</li>
            <li>Galaxy Groups</li>
            <li>Galaxies</li>
            <li>Galaxy Clusters</li>
          </ul>
          <p>The given list encompasses various celestial bodies and structures. Here is a brief description of each category:
            Asteroids: Small rocky objects that orbit the Sun, mostly found in the asteroid belt between Mars and Jupiter.
            Comets: Icy bodies that orbit the Sun and exhibit a coma (a glowing atmosphere) and a tail as they approach the Sun.
            Moons: Natural satellites that orbit planets and other celestial bodies, providing companionship to their hosts.
            Dwarf Planets: Celestial bodies that orbit the Sun and resemble planets but have not cleared their orbit from other debris.
            Satellites: Artificial objects or natural bodies that orbit planets, moons, or other celestial bodies.
            Planets: Large celestial bodies that orbit a star, typically spherical in shape and have cleared their orbit from other debris.
            Star Systems: A group of stars bound together by gravitational force, often consisting of multiple stars and other celestial objects.
            Star Clusters: An assemblage of stars that is a gravitational union and has a common origin, varying in size and shape.
            Galaxy Groups: A collection of galaxies that are gravitationally bound and share a common origin, varying in size and shape.</p>
        </div>
      </div >
    </Container >

  )
}

export default HomePage