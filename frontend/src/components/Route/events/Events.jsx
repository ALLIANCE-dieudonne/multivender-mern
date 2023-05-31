import styles from "../../../styles/styles"
import EventsCard from "./EventsCard"
const Events = () => {
  return (
    <div className={`${styles.section}`}>
        <div className={styles.heading}>
            <h1>Popular Events</h1>
        </div>

        <div className="w-full grid ">
            <EventsCard/>
        </div>
    </div>
  )
}
export default Events