import { useDispatch, useSelector } from "react-redux";
import styles from "../../../styles/styles";
import EventsCard from "./EventsCard";

const Events = () => {
  const allEvents = useSelector((state) => state.events.allEvents);
  const event = allEvents.filter((event) => event[0]);

  return (
    <div className={`${styles.section}`}>
      <div className={styles.heading}>
        <h1>Popular Events</h1>
      </div>

      <div className="w-full grid ">
        {allEvents.length > 0 && (
          <EventsCard
            key={allEvents[0]._id}
            active={true}
            data={allEvents[0]}
          />
        )}
      </div>
    </div>
  );
};
export default Events;
