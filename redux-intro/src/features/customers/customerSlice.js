import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  fullName: "",
  nationalId: "",
  createdAt: "",
};

// export default function customerReducer(state = initialStateCustomer, action) {
//   const { fullName, nationalId, createdAt } = state;
//   const { type, payload } = action;
//   switch (type) {
//     case "customer/createCustomer":
//       return { ...state, ...payload };
//     case "customer/updateName":
//       return { ...state, fullName: payload };

//     default:
//       return state;
//   }
// }

// export const createCustomer = (fullName, nationalId) => ({
//   type: "customer/createCustomer",
//   payload: { fullName, nationalId, createdAt: new Date().toISOString() },
// });
// export const updateName = (fullName) => ({
//   type: "customer/updateName",
//   payload: fullName,
// });

const customerSlice = createSlice({
  name: "customer",
  initialState,
  reducers: {
    createCustomer: {
      prepare(fullName, nationalId) {
        return {
          payload: {
            fullName,
            nationalId,
            createdAt: new Date().toISOString(),
          },
        };
      },
      reducer(state, action) {
        const { fullName, nationalId, createdAt } = action.payload;
        state.fullName = fullName;
        state.nationalId = nationalId;
        state.createdAt = createdAt;
      },
    },
    updateName(state, action) {
      const fullName = action.payload;
      state.fullName = fullName;
    },
  },
});

export const { createCustomer, updateName } = customerSlice.actions;

export default customerSlice.reducer;
