import EventsCard from "../../components/Route/events/EventsCard"
import Header from "../../components/layout/Header"

const Events = () => {
  return (
    <div>
        <Header activeHeading={4}/>
        <EventsCard active={true}/>
        <EventsCard active={true}/>
    </div>
  )
}
export default Events