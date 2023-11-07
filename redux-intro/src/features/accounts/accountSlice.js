import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  balance: 0,
  loan: 0,
  loanPurpose: "",
  isLoading: false,
};

// export default function accountReducer(state = initialState, action) {
//   const { balance, loan, loanPurpose } = state;
//   const { type, payload } = action;
//   switch (type) {
//     case "account/convertingCurrency":
//       return { ...state, isLoading: true };
//     case "account/deposit":
//       return { ...state, balance: balance + payload, isLoading: false };
//     case "account/withdraw":
//       return { ...state, balance: balance - payload };
//     case "account/requestLoan":
//       const { amount, purpose } = payload;
//       if (loan > 0) return state;
//       else
//         return {
//           ...state,
//           balance: balance + amount,
//           loan: amount,
//           loanPurpose: purpose,
//         };
//     case "account/repayLoan":
//       return { ...state, balance: balance - loan, loan: 0, loanPurpose: "" };

//     default:
//       return state;
//   }
// }

// export const deposit = (amount, currency) => {
//   if (currency === "USD")
//     return {
//       type: "account/deposit",
//       payload: amount,
//     };

//   return async (dispatch, getState) => {
//     dispatch({ type: "account/convertingCurrency" });
//     const res = await fetch(
//       `https://api.frankfurter.app/latest?amount=${amount}&from=${currency}&to=USD`
//     );
//     const data = await res.json();
//     dispatch({
//       type: "account/deposit",
//       payload: data.rates.USD,
//     });
//   };
// };
// export const withdraw = (amount) => ({
//   type: "account/withdraw",
//   payload: amount,
// });
// export const requestLoan = (amount, purpose) => ({
//   type: "account/requestLoan",
//   payload: { amount, purpose },
// });
// export const repayLoan = () => ({ type: "account/repayLoan" });

const accountSlice = createSlice({
  name: "account",
  initialState,
  reducers: {
    convertingCurrency(state, action) {
      state.isLoading = true;
    },
    deposit: {
      prepare(amount, currency) {
        return { payload: { amount, currency } };
      },
      reducer(state, action) {
        state.balance += action.payload;
        state.isLoading = false;
      },
    },
    withdraw(state, action) {
      state.balance -= action.payload;
    },
    requestLoan: {
      prepare(amount, purpose) {
        return { payload: { amount, purpose } };
      },
      reducer(state, action) {
        state.loan = action.payload.amount;
        state.balance += action.payload.amount;
        state.loanPurpose = action.payload.purpose;
      },
    },
    repayLoan(state, action) {
      state.balance -= state.loan;
      state.loan = 0;
      state.loanPurpose = "";
    },
  },
});

export const deposit = (amount, currency) => {
  if (currency === "USD")
    return {
      type: "account/deposit",
      payload: amount,
    };

  return async (dispatch, getState) => {
    dispatch({ type: "account/convertingCurrency" });
    const res = await fetch(
      `https://api.frankfurter.app/latest?amount=${amount}&from=${currency}&to=USD`
    );
    const data = await res.json();
    dispatch({
      type: "account/deposit",
      payload: data.rates.USD,
    });
  };
};

export const { withdraw, requestLoan, repayLoan } = accountSlice.actions;

export default accountSlice.reducer;
