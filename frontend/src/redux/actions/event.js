import axios from "axios";
import { server } from "../../server";

// Create event
export const createEvent = (newForm) => async (dispatch) => {
  try {
    dispatch({
      type: "eventCreateRequest",
    });

    const config = { headers: { "Content-Type": "multipart/form-data" } }; // Fixed typo in "multipart/form-data"
    const { data } = await axios.post(
      `${server}/event/create-event`,
      newForm,
      config
    );

    dispatch({
      type: "eventCreateSuccess",
      payload: data.event,
    });
  } catch (error) {
    dispatch({
      type: "eventCreateFail",
      payload: error.response.data.message,
    });
  }
};

// // Get all events
// export const getAllShopEvents = (id) => async (dispatch) => {
//   try {
//     dispatch({
//       type: "getAllshopEventsRequest",
//     });

//     const { data } = await axios.get(
//       `${server}/event/all-shop-events/${id}`,
//       {
//         withCredentials: true,
//       }
//     );

//     console.log(data.events);

//     dispatch({
//       type: "getAllshopEventsSuccess",
//       payload: data.events,
//     });
//   } catch (error) {
//     dispatch({
//       type: "getAllshopEventsFail",
//       payload: error.response.data.message,
//     });
//   }
// };

// //delete event

// export const deleteEvent = (id) => async (dispatch) => {
//   try {
//     dispatch({ type: "deleteEventRequest" });

//     const { data } = await axios.delete(
//       `${server}/event/delete-shop-event/${id}`,
//       {
//         withCredentials: true,
//       }
//     );

//     dispatch({
//       type: "deleteEventSuccess",
//       payload: data.message,
//     });
//   } catch (error) {
//     dispatch({
//       type: "deleteEventFails",
//       payload: error.response.data.message,
//     });
//   }
// };
