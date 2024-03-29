import { useEffect } from "react";
import EventsCard from "../../components/Route/events/EventsCard";
import Header from "../../components/layout/Header";
import Loader from "../../components/layout/Loader";
import { useSelector } from "react-redux";
import Footer from "../../components/layout/Footer";

const Events = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  const { isLoading } = useSelector((state) => state.events);
  const allEvents = useSelector((state) => state.events.allEvents);

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
          {allEvents.length === 0 && (
            <div className="h-[50vh] w-full">
              <h1 className="text-center font-[500] text-[30px] pt-20 ">
                No Active Events Found !
              </h1>
            </div>
          )}
          <Footer />
        </div>
      )}
    </>
  );
};
export default Events;
