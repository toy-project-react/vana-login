import React, { useState } from 'react';
import { Field, reduxForm } from 'redux-form';
import { Link } from 'react-router-dom';
import { RenderInput, PasswordRenderInput } from 'components/Inputs';
import styled from 'styled-components';

const validate = values => {
  const errors = {};
  if (!values.password) {
    errors.password = '비밀번호는 필수입력입니다.';
  }
  if (!values.email) {
    errors.password = '이메일은 필수입력입니다.';
  } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
    errors.password = '이메일 주소가 올바르지 않습니다.';
  }
  return errors;
};

const LoginButton = styled.button.attrs(({ disabled, submitting }) => ({
  type: 'submit',
  disabled: disabled || submitting
}))`
  font-size: 14px;
  height: 48px;
`;

const LoginForm = ({ handleSubmit, submitting, errorData }) => {
  // hooks
  const [disabled, setDisabled] = useState(true);
  const [pwIcon, setPwIcon] = useState('pw-view-off');
  const [inputType, setInputType] = useState('password');

  const handleIconClick = () => {
    setPwIcon(pwIcon === 'pw-view-off' ? 'pw-view-on' : 'pw-view-off');
    setInputType(inputType === 'password' ? 'text' : 'password');
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="inp-type">
        <strong>이메일</strong>
        <Field
          name="email"
          type="email"
          notUseError={true}
          component={RenderInput}
          setDisabled={setDisabled}
          placeholder="이메일을 입력하세요."
        />
      </div>
      <div className="inp-type">
        <strong>비밀번호</strong>
        <Field
          icon={pwIcon}
          onIconClick={handleIconClick}
          name="password"
          type={inputType}
          notUseError={true}
          component={PasswordRenderInput}
          setDisabled={setDisabled}
          serverError={errorData}
          placeholder="비밀번호를 입력하세요."
        />
      </div>
      <LoginButton
        className={`btn-type ${!disabled ? 'active' : ''}`}
        submitting={submitting}
        disabled={disabled}
      >
        로그인
      </LoginButton>
      <Link className="lnk-type" to="/findPassword">
        비밀번호를 잊으셨나요?
      </Link>
    </form>
  );
};

export default reduxForm({
  form: 'loginForm',
  validate
})(LoginForm);
