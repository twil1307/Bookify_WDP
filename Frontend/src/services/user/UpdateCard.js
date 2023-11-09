import { CheckStatus } from "@/utils/validation";
export default async function UpdateBankingCard(bankingAccountNumber) {
  const bankForm = new FormData();
  bankForm.append("bankingAccountNumber", bankingAccountNumber);
  const url = `http://localhost:${process.env.REACT_APP_BACK_END_PORT}/user/bankingAccount`;
  const options = {
    method: "PUT",
    credentials: "include",
    withCredentials: true,
    body: bankForm,
  };
  return await fetch(url, options).then((response) => {
    return CheckStatus(response.status);
  });
}
