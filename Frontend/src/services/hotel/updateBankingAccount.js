
export default async function updateBankingAccount(userId, bankingAccountNumber) {
    const formData = new FormData();
    formData.append("userId", userId);
    formData.append("bankingAccountNumber", bankingAccountNumber);
    const url = `http://localhost:8080/bookify/api/user/bank`;
    const options = {
        method: 'POST',
        body: formData
    }
    const data = await fetch(url, options).then(res => res.json()).then(data => data);
    return data;
}