import { createReducer } from "@reduxjs/toolkit";

const initialState = {
  events: [], // Initialize with an empty array
  isLoading: false,
  error: null,
  success: false,
};

export const eventReducer = createReducer(initialState, {
  // event create
  eventCreateRequest: (state) => {
    state.isLoading = true;
  },
  eventCreateSuccess: (state, action) => {
    state.isLoading = false;
    state.events = action.payload;
    state.success = true;
  },
  eventCreateFail: (state, action) => {
    state.isLoading = false;
    state.error = action.payload;
    state.success = false;
  },

  // get all events
//   getAllshopEventsRequest: (state) => {
//     state.isLoading = true;
//   },
//   getAllshopEventsSuccess: (state, action) => {
//     state.isLoading = false;
//     state.events = action.payload;
//     state.success = true;
//   },
//   getAllshopEventsFail: (state, action) => {
//     state.isLoading = false;
//     state.error = action.payload;
//     state.success = false;
//   },

//   //delete event

//   deleteEventRequest: (state) => {
//     state.isLoading = true;
//   },

//   deleteEventSuccess: (state, action) => {
//     state.isLoading = false;
//     state.message = action.payload;
//   },
//   deleteEventFails: (state, action) => {
//     state.isLoading = false;
//     state.error = action.payload;
//   },
  clearErrors: (state) => {
    state.error = null;
  },
});
