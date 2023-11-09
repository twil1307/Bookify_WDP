import BankCardStyle from "./BankCard.module.scss";

function BankCard({ bankWallet }) {
  return (
    <div className={BankCardStyle["card-wrapper"]}>
      <div className={BankCardStyle["bank-title"]}>
        <div className={BankCardStyle["title"]}>BIDV</div>
        <div className={BankCardStyle["valid"]}>12/25</div>
      </div>
      <div className={BankCardStyle["bank-remain"]}>
        <div className={BankCardStyle["remain-title"]}>Số dư trong ví</div>
        <div className={BankCardStyle["remainer"]}>
          <h1>
            $<span className={BankCardStyle["static"]}>{bankWallet}.0</span>
          </h1>
        </div>
      </div>
      <div className={BankCardStyle["bank-number"]}>
        <h6>*-3789</h6>
      </div>
    </div>
  );
}

export default BankCard;
