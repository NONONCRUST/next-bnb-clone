import React, { useState } from "react";
import styled from "styled-components";
import CloseXIcon from "../../public/static/svg/modal/modal_close_x_icon.svg";
import MailIcon from "../../public/static/svg/auth/mail.svg";
import PersonIcon from "../../public/static/svg/auth/person.svg";
import OpenedEyeIcon from "../../public/static/svg/auth/opened_eye.svg";
import ClosedEyeIcon from "../../public/static/svg/closed_eye.svg";
import palette from "../../styles/palette";
import Input from "../common/Input";

const Container = styled.div`
  width: 568px;
  height: 614px;
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
`;

const SignUpModal: React.FC = () => {
  const [email, setEmail] = useState("");
  const [lastName, setLastName] = useState("");
  const [firstName, setFirstName] = useState("");
  const [password, setPassword] = useState("");

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

  return (
    <Container>
      <CloseXIcon className="modal-close-x-icon" />
      <div className="input-wrapper">
        <Input
          placeholder="이메일 주소"
          type="email"
          icon={<MailIcon />}
          name="email"
          value={email}
          onChange={onChangeEmail}
        />
      </div>
      <div className="input-wrapper">
        <Input
          placeholder="이름"
          icon={<PersonIcon />}
          value={lastName}
          onChange={onChangeLastName}
        />
      </div>
      <div className="input-wrapper">
        <Input
          placeholder="성"
          icon={<PersonIcon />}
          value={firstName}
          onChange={onChangeFirstName}
        />
      </div>
      <div className="input-wrapper">
        <Input
          placeholder="비밀번호 설정하기"
          type="password"
          icon={<OpenedEyeIcon />}
          value={password}
          onChange={onChangePassword}
        />
      </div>
    </Container>
  );
};

export default SignUpModal;
