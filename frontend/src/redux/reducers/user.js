import { createReducer } from "@reduxjs/toolkit";

const initialState = {
  isAuthenticated: false,
};

//loading user
export const userReducer = createReducer(initialState, {
  LoadUserRequest: (state) => {
    state.loading = true;
  },
  LoadUserSuccess: (state, action) => {
    state.isAuthenticated = true;
    state.loading = false;
    state.user = action.payload;
  },
  LoadUserFail: (state, action) => {
    state.loading = false;
    state.error = action.payload;
    state.isAuthenticated = false;
  },

  //update user info
  UpdateUserInfoRequest: (state) => {
    state.isLoading = true;
  },
  UpdateUserInfoSuccess: (action, state) => {
    state.isLoading = false;
    state.updatedUser = action.payload;
  },
  UpdateUserInfoFail: (state, action) => {
    state.isLoading = false;
    state.error = action.payload;
  },
  //update user address
  UpdateUserAddrressRequest: (state) => {
    state.isLoading = true;
  },
  UpdateUserAddrressSuccess: (action, state) => {
    state.isLoading = false;
    state.user = action.payload;
  },
  UpdateUserAddrressFail: (state, action) => {
    state.isLoading = false;
    state.error = action.payload;
  },

  //delete user address
  // DeleteUserAddrressRequest: (state) => {
  //     state.isLoading = true;
  //   },
  // DeleteUserAddrressSuccess: (action, state) => {
  //     state.isLoading = false;
  //     state.user = action.payload;
  //   },
  // DeleteUserAddrressFail: (state, action) => {
  //     state.isLoading = false;
  //     state.error = action.payload;
  //   },
  DeleteUserAddressRequest: (state) => {
    state.isLoading = true;
  },
  DeleteUserAddressSuccess: (state, action) => {
    state.isLoading = false;
    state.user = action.payload;
  },
  DeleteUserAddressFail: (state, action) => {
    state.isLoading = false;
    state.error = action.payload;
  },

  clearError: (state) => {
    state.error = null;
  },
});
