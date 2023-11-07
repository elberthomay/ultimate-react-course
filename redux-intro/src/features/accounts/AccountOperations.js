import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { deposit, repayLoan, requestLoan, withdraw } from "./accountSlice";

function AccountOperations() {
  const [depositAmount, setDepositAmount] = useState("");
  const [withdrawalAmount, setWithdrawalAmount] = useState("");
  const [loanAmount, setLoanAmount] = useState("");
  const [loanPurposeInput, setLoanPurposeInput] = useState("");
  const [currency, setCurrency] = useState("USD");

  const { loan, loanPurpose, isLoading } = useSelector(
    (store) => store.account
  );
  const dispatch = useDispatch();

  function handleDeposit() {
    dispatch(deposit(Number(depositAmount), currency));
    setDepositAmount("");
  }

  function handleWithdrawal() {
    dispatch(withdraw(Number(withdrawalAmount)));
    setWithdrawalAmount("");
  }

  function handleRequestLoan() {
    dispatch(requestLoan(Number(loanAmount), loanPurposeInput));
    setLoanAmount("");
    setLoanPurposeInput("");
  }

  function handlePayLoan() {
    dispatch(repayLoan());
  }

  return (
    <div>
      <h2>Your account operations</h2>
      <div className="inputs">
        <div>
          <label>Deposit</label>
          <input
            type="number"
            value={depositAmount}
            onChange={(e) => setDepositAmount(+e.target.value)}
            disabled={isLoading}
          />
          <select
            value={currency}
            onChange={(e) => setCurrency(e.target.value)}
          >
            <option value="USD">US Dollar</option>
            <option value="EUR">Euro</option>
            <option value="GBP">British Pound</option>
          </select>

          <button onClick={handleDeposit}>Deposit {depositAmount}</button>
        </div>

        <div>
          <label>Withdraw</label>
          <input
            type="number"
            value={withdrawalAmount}
            onChange={(e) => setWithdrawalAmount(+e.target.value)}
          />
          <button onClick={handleWithdrawal}>
            Withdraw {withdrawalAmount}
          </button>
        </div>

        <div>
          <label>Request loan</label>
          <input
            type="number"
            value={loanAmount}
            onChange={(e) => setLoanAmount(+e.target.value)}
            placeholder="Loan amount"
          />
          <input
            value={loanPurposeInput}
            onChange={(e) => setLoanPurposeInput(e.target.value)}
            placeholder="Loan purpose"
          />
          <button onClick={handleRequestLoan}>Request loan</button>
        </div>
        {loan !== 0 && (
          <div>
            <span>
              Pay back ${loan}({loanPurpose})
            </span>
            <button onClick={handlePayLoan}>Pay loan</button>
          </div>
        )}
      </div>
    </div>
  );
}

export default AccountOperations;
