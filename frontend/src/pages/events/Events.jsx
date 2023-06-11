import EventsCard from "../../components/Route/events/EventsCard";
import Header from "../../components/layout/Header";
import Loader from "../../components/layout/Loader";
import { useSelector } from "react-redux";

const Events = () => {
  const { isLoading} = useSelector((state) => state.events);
  const allEvents = useSelector((state)=> state.events.allEvents)
  console.log(allEvents && allEvents)

  return (
    <>
      {isLoading ? (
        <Loader />
      ) : (
        <div>
          <Header activeHeading={4} />
          {allEvents.map((event) => (
            <EventsCard key={event._id} active={true} data={event} />
          ))}{" "}
        </div>
      )}
    </>
  );
};
export default Events;
