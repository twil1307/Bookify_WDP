import FormUpdateStyle from "./FormUpdate.module.scss";
import {
  useState,
  useCallback,
  useEffect,
  useRef,
  useContext,
  useMemo,
} from "react";
import { ModalContext, UserContext } from "@/utils/contexts";
import { getPasswordModal, getChangeCard } from "@/utils/reducers/modalReducer";
import InputText from "@/features/account/components/inputText";
import { accountValidation } from "@/utils/validation";
import { useUppercase } from "@/utils/hooks";

function FormUpdate() {
  const { dispatch } = useContext(ModalContext);
  const { user } = useContext(UserContext);
  const [inputs, setInputs] = useState({
    username: user.username,
    id: user.id,
    card: user.bank_card,
  });
  const [account, setAccount] = useState({
    username: user.username,
    password: "abcxyz",
    card: user.bank_card,
  });
  const [isAccountValid, setAccountValid] = useState({
    username: true,
    password: true,
  });
  const changedKey = useRef();
  const handleAccountChange = useCallback(
    (value, key) => {
      setAccount((prev) => {
        return {
          ...prev,
          [key]: value,
        };
      });
      changedKey.current = key;
    },
    //eslint-disable-next-line
    [account]
  );
  useEffect(() => {
    const changedField = changedKey.current;
    if (changedField) {
      setAccountValid((prev) => {
        return {
          ...prev,
          [changedField]: accountValidation(
            changedField,
            account[changedField],
            "",
            true
          ),
        };
      });
    }
  }, [account]);

  const banks = useMemo(
    () => [
      {
        title: "BIDV",
        description: "BIDV-Ngân Hàng ABC",
      },
      {
        title: "SaccomBank",
        description: "Saccombank-Ngân Hàng ABC",
      },
      {
        title: "VietcomBank",
        description: "VietcomBank-Ngân Hàng ABC",
      },
      {
        title: "TechcomBank",
        description: "Techcombank-Ngân Hàng ABC",
      },
      {
        title: "Ba mẹ Bank",
        description: "Ba mẹ Bank-Ngân Hàng uy tín vcl",
      },
    ],
    []
  );

  const handleChange = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setInputs((values) => ({ ...values, [name]: value }));
  };
  const onClickHandler = (e) => {
    e.preventDefault();
    dispatch(getChangeCard({ isOpen: true }));
  };
  const formSubmit = (e) => {};

  return (
    <div className={FormUpdateStyle["container"]}>
      <form onSubmit={formSubmit}>
        <div className={FormUpdateStyle["form-field"]}>
          {Object.keys(account).map((key, index) => (
            <span key={index}>
              <InputText
                value={account[key]}
                id={key}
                onValueChange={handleAccountChange}
                isValid={isAccountValid[key]}
                isSignIn={true}
                // eslint-disable-next-line react-hooks/rules-of-hooks
                label={useUppercase(key)}
                type={key === "password" ? "password" : "text"}
                icon="faWrench"
                onClickHandler={onClickHandler}
              />
            </span>
          ))}
          <span className={FormUpdateStyle["text-input-field"]}>
            <label htmlFor="bank">
              <b className={FormUpdateStyle["label"]}>Ngân Hàng</b>
            </label>
            <select
              value={inputs.bank || ""}
              onChange={handleChange}
              className={FormUpdateStyle["input-update"]}
              name="bank"
            >
              {banks.map((selectOption, index) => (
                <option key={index} value={selectOption.title}>
                  {selectOption.description}
                </option>
              ))}
            </select>
          </span>
        </div>
      </form>
    </div>
  );
}

export default FormUpdate;
