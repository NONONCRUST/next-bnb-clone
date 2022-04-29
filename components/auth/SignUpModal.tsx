import React, { useEffect, useMemo, useState } from "react";
import styled from "styled-components";
import CloseXIcon from "../../public/static/svg/modal/modal_close_x_icon.svg";
import MailIcon from "../../public/static/svg/auth/mail.svg";
import PersonIcon from "../../public/static/svg/auth/person.svg";
import OpenedEyeIcon from "../../public/static/svg/auth/opened_eye.svg";
import ClosedEyeIcon from "../../public/static/svg/auth/closed_eye.svg";
import palette from "../../styles/palette";
import Input from "../common/Input";
import Selector from "../common/Selector";
import { dayList, monthList, yearList } from "../../lib/staticData";
import Button from "../common/Button";
import { signupAPI } from "../../lib/api/auth";
import { useDispatch } from "react-redux";
import { userActions } from "../../store/userSlice";
import useValidateMode from "../../hooks/useValidateMode";
import PasswordWarning from "./PasswordWarning";
import { authActions } from "../../store/authSlice";

const Container = styled.form`
  width: 568px;
  min-height: 614px;
  padding: 32px;
  background-color: white;
  z-index: 11;
  .modal-close-x-icon {
    cursor: pointer;
    display: block;
    margin: 0 0 40px auto;
  }
  .input-wrapper {
    position: relative;
    margin-bottom: 16px;
  }
  .sign-up-birthday-label {
    font-size: 16px;
    font-weight: 600;
    margin-top: 16px;
    margin-bottom: 8px;
  }
  .sign-up-modal-birthday-info {
    margin-bottom: 16px;
    color: ${palette.charcoal};
  }
  .sign-up-modal-birthday-selectors {
    display: flex;
    margin-bottom: 24px;
    .sign-up-modal-birthday-month-selector {
      margin-right: 16px;
      flex-grow: 1;
    }
    .sign-up-modal-birthday-day-selector {
      margin-right: 16px;
      width: 25%;
    }
    .sign-up-modal-birthday-year-selector {
      width: 33.3333%;
    }
  }
  .sign-up-modal-set-login-wrapper {
    margin-top: 10px;
    .sign-up-modal-set-login {
      color: ${palette.dark_cyan};
      margin-left: 8px;
      cursor: pointer;
    }
  }
`;

interface Props {
  closeModal: () => void;
}

const PASSWORD_MIN_LENGTH = 8;
const disabledMonths = ["월"];
const disabledDays = ["일"];
const disabledYears = ["년"];

const SignUpModal: React.FC<Props> = ({ closeModal }) => {
  const [email, setEmail] = useState("");
  const [lastName, setLastName] = useState("");
  const [firstName, setFirstName] = useState("");
  const [password, setPassword] = useState("");

  const [isPasswordHidden, setIsPasswordHidden] = useState(true);

  const [birthYear, setBirthYear] = useState<string | undefined>();
  const [birthDay, setBirthDay] = useState<string | undefined>();
  const [birthMonth, setBirthMonth] = useState<string | undefined>();

  const [passwordFocused, setPasswordFocused] = useState(false);

  const dispatch = useDispatch();

  const { setValidateMode } = useValidateMode();

  const onFocusPassword = () => {
    setPasswordFocused(true);
  };

  const isPasswordHasNameOrEmail = useMemo(
    () =>
      !password ||
      !lastName ||
      password.includes(lastName) ||
      password.includes(email.split("@")[0]),
    [password, lastName, email]
  );

  const isPasswordOverMinLength = useMemo(
    () => password.length >= PASSWORD_MIN_LENGTH,
    [password]
  );

  const isPasswordHasNumberOrSymbol = useMemo(
    () =>
      !(
        /[{}[\]/?.,;:|)*~`!^\-_+<>@#$%&\\=('"]/g.test(password) ||
        /[0-9]/g.test(password)
      ),
    [password]
  );

  const changeToLoginModal = () => {
    dispatch(authActions.setAuthMode("login"));
  };

  const onChangeEmail = (event: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(event.target.value);
  };
  const onChangeLastName = (event: React.ChangeEvent<HTMLInputElement>) => {
    setLastName(event.target.value);
  };
  const onChangeFirstName = (event: React.ChangeEvent<HTMLInputElement>) => {
    setFirstName(event.target.value);
  };
  const onChangePassword = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(event.target.value);
  };

  const toggleHidePassword = () => {
    setIsPasswordHidden(!isPasswordHidden);
  };

  const onChangeBirthMonth = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setBirthMonth(event.target.value);
  };
  const onChangeBirthDay = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setBirthDay(event.target.value);
  };
  const onChangeBirthYear = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setBirthYear(event.target.value);
  };

  const validateSignUpForm = () => {
    if (!email || !lastName || !firstName || !password) {
      return false;
    }
    if (
      isPasswordHasNameOrEmail ||
      !isPasswordOverMinLength ||
      isPasswordHasNumberOrSymbol
    ) {
      return false;
    }
    if (!birthDay || !birthMonth || !birthYear) {
      return false;
    }
    return true;
  };

  // 설정된 validationMode의 상태가 다른 컴포넌트에 영향이 가지 않게 하기 위해
  useEffect(() => {
    return () => {
      setValidateMode(false);
    };
  }, []);

  const onSubmitSignUp = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    setValidateMode(true);

    if (validateSignUpForm) {
      try {
        const signUpBody = {
          email: email,
          lastName: lastName,
          firstName: firstName,
          password: password,
          birthday: new Date(
            `${birthYear}-${birthMonth!.replace("월", "")}-${birthDay}`
          ).toISOString(),
        };
        const { data } = await signupAPI(signUpBody); // axios.post("/api/auth/signup", body);

        console.log(data);

        dispatch(userActions.setUserLogged(data));

        closeModal();
      } catch (e) {
        console.log(e);
      }
    }
  };

  return (
    <Container onSubmit={onSubmitSignUp}>
      <CloseXIcon className="modal-close-x-icon" onClick={closeModal} />
      <div className="input-wrapper">
        <Input
          placeholder="이메일 주소"
          type="email"
          icon={<MailIcon />}
          name="email"
          value={email}
          onChange={onChangeEmail}
          useValidation
          isValid={!!email}
          errorMessage="이메일이 필요합니다."
        />
      </div>
      <div className="input-wrapper">
        <Input
          placeholder="이름"
          icon={<PersonIcon />}
          value={lastName}
          onChange={onChangeLastName}
          useValidation
          isValid={!!lastName}
          errorMessage="이름을 입력하세요."
        />
      </div>
      <div className="input-wrapper">
        <Input
          placeholder="성"
          icon={<PersonIcon />}
          value={firstName}
          onChange={onChangeFirstName}
          useValidation
          isValid={!!firstName}
          errorMessage="성을 입력하세요."
        />
      </div>
      <div className="input-wrapper sign-up-password-input-wrapper">
        <Input
          placeholder="비밀번호 설정하기"
          type={isPasswordHidden ? "password" : "text"}
          icon={
            isPasswordHidden ? (
              <OpenedEyeIcon onClick={toggleHidePassword} />
            ) : (
              <ClosedEyeIcon onClick={toggleHidePassword} />
            )
          }
          value={password}
          onChange={onChangePassword}
          useValidation
          isValid={
            !isPasswordHasNameOrEmail &&
            isPasswordOverMinLength &&
            !isPasswordHasNumberOrSymbol
          }
          errorMessage="비밀번호를 입력하세요."
          onFocus={onFocusPassword}
        />
      </div>
      {passwordFocused && (
        <>
          <PasswordWarning
            isValid={isPasswordHasNameOrEmail}
            text="비밀번호에 본인 이름이나 이메일 주소를 포함할 수 없습니다."
          />
          <PasswordWarning isValid={!isPasswordOverMinLength} text="최소 8자" />
          <PasswordWarning
            isValid={isPasswordHasNumberOrSymbol}
            text="숫자나 기호를 포함하세요"
          />
        </>
      )}
      <p className="sign-up-birthday-label">생일</p>
      <p className="sign-up-modal-birthday-info">
        만 18세 이상의 성인만 회원으로 가입할 수 있습니다. 생일은 다른
        에어비앤비 이용자에게 공개되지 않습니다.
      </p>
      <div className="sign-up-modal-birthday-selectors">
        <div className="sign-up-modal-birthday-month-selector">
          <Selector
            options={monthList}
            disabledOptions={disabledMonths}
            defaultValue="월"
            value={birthMonth}
            onChange={onChangeBirthMonth}
            isValid={!!birthMonth}
          />
        </div>
        <div className="sign-up-modal-birthday-day-selector">
          <Selector
            options={dayList}
            disabledOptions={disabledDays}
            defaultValue="일"
            value={birthDay}
            onChange={onChangeBirthDay}
            isValid={!!birthDay}
          />
        </div>
        <div className="sign-up-modal-birthday-year-selector">
          <Selector
            options={yearList}
            disabledOptions={disabledYears}
            defaultValue="년"
            value={birthYear}
            onChange={onChangeBirthYear}
            isValid={!!birthYear}
          />
        </div>
      </div>
      <div className="sign-up-modal-submit-button-wrapper">
        <Button type="submit">가입하기</Button>
      </div>
      <div className="sign-up-modal-set-login-wrapper">
        <p>
          이미 에어비앤비 계정이 있나요?
          <span
            className="sign-up-modal-set-login"
            role="presentation"
            onClick={changeToLoginModal}
          >
            로그인
          </span>
        </p>
      </div>
    </Container>
  );
};

export default SignUpModal;
