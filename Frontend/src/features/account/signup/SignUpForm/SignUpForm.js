import { InputField } from "@/components";
import formStyles from "./SignUpForm.module.scss";
import {
  useState,
  memo,
  useEffect,
  useRef,
  useCallback,
  useMemo,
  useContext,
} from "react";
import { accountValidation } from "@/utils/validation";
import { useUppercase, useSignUser } from "@/utils/hooks";
import { faGoogle } from "@fortawesome/free-brands-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

function SignUpForm() {
  const { SignUpFn } = useSignUser();
  const [registerAccount, setRegisterAccount] = useState({
    username: null,
    email: null,
    password: null,
    rePassword: null,
  });
  const [isAccountValid, setAccountValid] = useState({
    username: true,
    email: true,
    password: true,
    rePassword: true,
  });
  const [isLoading, setLoading] = useState(false);
  const isInformationFilled = useMemo(() => {
    const isAllFilled = Object.keys(registerAccount).every((key) => {
      return registerAccount[key] !== null;
    });
    const isAllValid = Object.keys(isAccountValid).every((key) => {
      return isAccountValid[key];
    });
    return isAllFilled && isAllValid;
  }, [registerAccount, isAccountValid]);
  const [isAgreed, setAggreed] = useState(false);
  const changedKey = useRef();

  const handleSubmit = async (event) => {
    event.stopPropagation();
    event.preventDefault();
    if (isLoading || !isInformationFilled) {
      return;
    } else {
      setLoading(true);
      try {
        SignUpFn(registerAccount);
      } finally {
        setLoading(false);
      }
    }
  };

  const handleValueChange = useCallback(
    (value, key) => {
      console.log(key);
      setRegisterAccount({
        ...registerAccount,
        [key]: value,
      });
      changedKey.current = key;
    },
    [registerAccount]
  );

  useEffect(() => {
    const changedField = changedKey.current;
    const { password, rePassword } = registerAccount;

    if (changedField) {
      setAccountValid((prev) => {
        if (changedField === "rePassword") {
          return {
            ...prev,
            [changedField]: accountValidation(
              changedField,
              password,
              rePassword
            ),
          };
        }
        return {
          ...prev,
          [changedField]: accountValidation(
            changedField,
            registerAccount[changedField]
          ),
        };
      });
    }
    //eslint-disable-next-line
  }, [registerAccount]);

  const isInfomationValid = useMemo(() => {
    const isAllValid = Object.values(isAccountValid).every(
      (state) => state === true
    );
    const isAllFullfilled = Object.keys(registerAccount).every(
      (key) => registerAccount[key] !== null
    );

    return isAllValid && isAllFullfilled && isAgreed;

    //eslint-disable-next-line
  }, [isAccountValid, isAgreed]);

  console.log("form re-render ");
  return (
    <div className={formStyles["form-wrapper"]}>
      <form
        onSubmit={handleSubmit}
        className={formStyles["form"]}
        spellCheck={false}
      >
        {Object.keys(registerAccount).map((key) => (
          <InputField
            key={key}
            value={registerAccount[key]}
            id={key}
            onValueChange={handleValueChange}
            isValid={isAccountValid[key]}
            // eslint-disable-next-line react-hooks/rules-of-hooks
            label={useUppercase(key)}
            type={
              key === "password" || key === "rePassword" ? "password" : "text"
            }
          />
        ))}

        <label htmlFor="term-check">
          <input
            type="checkbox"
            id="term-check"
            onChange={() => {
              setAggreed(!isAgreed);
            }}
            checked={isAgreed}
          />
          I agree to the
          <span className={formStyles["text-link"]}> Term of Service </span>
          and
          <span className={formStyles["text-link"]}> Privacy Policy</span>
        </label>
        <div className={formStyles["button-wrapper"]}>
          <button
            className={[
              formStyles["sign-up-button"],
              isInfomationValid ? "" : formStyles["button-disabled"],
            ].join(" ")}
          >
            Sign Up
          </button>
          <button className={formStyles["google-sign-up-button"]}>
            <FontAwesomeIcon icon={faGoogle} />
            Sign Up by Google
          </button>
        </div>
      </form>
    </div>
  );
}

export default memo(SignUpForm);
