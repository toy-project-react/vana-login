import { Field, reduxForm } from 'redux-form';
import React, { useState } from 'react';

import { PasswordRenderInput } from 'components/Inputs';

const validate = values => {
  const errors = {};
  if (!values.new_password) {
    errors.new_password = '필수입력입니다.';
  }
  if (!values.comfirm_password) {
    errors.comfirm_password = '필수입력입니다.';
  }
  if (!values.current_password) {
    errors.current_password = '필수입력입니다.';
  }
  if (values.new_password !== values.comfirm_password) {
    errors.comfirm_password = '비밀번호가 일치하지 않습니다. 다시 입력하세요.';
  }
  if (
    !/(?=.*\d{1,50})(?=.*[~`!@#$%\\^&*()-+=]{1,50})(?=.*[a-zA-Z]{2,50}).{8,50}$/i.test(
      values.new_password
    )
  ) {
    errors.new_password =
      '영문 , 대소문자 , 숫자 , 특수문자를 포함하여 최소 8자리 이상으로 설정해야 합니다.';
  }
  return errors;
};

const PasswordForm = ({ isChange, handleSubmit, submitting, errorData }) => {
  // hooks
  const [disabled, setDisabled] = useState(true);
  const [pwIcon, setPwIcon] = useState('pw-view-off');
  const [inputType, setInputType] = useState('password');

  const handleIconClick = () => {
    setPwIcon(pwIcon === 'pw-view-off' ? 'pw-view-on' : 'pw-view-off');
    setInputType(inputType === 'password' ? 'text' : 'password');
  };

  if (isChange) {
    return (
      <form onSubmit={handleSubmit}>
        <h2 className="txt-center">비밀번호 재설정</h2>
        <div className="inp-type">
          <strong>현재 비밀번호</strong>
          <Field
            icon={pwIcon}
            onIconClick={handleIconClick}
            name="current_password"
            type={inputType}
            component={PasswordRenderInput}
            setDisabled={setDisabled}
            placeholder="현재 비밀번호를 입력하세요."
          />
        </div>
        <div className="inp-type">
          <strong>새 비밀번호</strong>
          <Field
            icon={pwIcon}
            onIconClick={handleIconClick}
            name="new_password"
            type={inputType}
            component={PasswordRenderInput}
            setDisabled={setDisabled}
            placeholder="새 비밀번호를 입력하세요."
          />
        </div>
        <div className="inp-type">
          <strong>새 비밀번호 확인</strong>
          <Field
            icon={pwIcon}
            onIconClick={handleIconClick}
            name="comfirm_password"
            type={inputType}
            component={PasswordRenderInput}
            setDisabled={setDisabled}
            serverError={errorData}
            placeholder="새 비밀번호를 입력하세요."
          />
        </div>
        <div className="info">
          *비밀번호는 영문대소문자, 숫자, 특수문자를 포함하여 최소 8자리
          이상으로 설정해야 합니다.
        </div>
        <button
          type="submit"
          disabled={submitting || disabled}
          className={`btn-type ${!disabled ? 'active' : ''}`}
        >
          확인
        </button>
      </form>
    );
  }
  return (
    <div className="form-group">
      <h2>비밀번호 설정</h2>
      <form onSubmit={handleSubmit}>
        <div className="inp-type">
          <strong>비밀번호</strong>
          <Field
            icon={pwIcon}
            onIconClick={handleIconClick}
            name="new_password"
            type={inputType}
            component={PasswordRenderInput}
            setDisabled={setDisabled}
            placeholder="비밀번호를 입력하세요."
          />
        </div>
        <div className="inp-type">
          <strong>비밀번호 확인</strong>
          <Field
            icon={pwIcon}
            onIconClick={handleIconClick}
            name="comfirm_password"
            type={inputType}
            component={PasswordRenderInput}
            setDisabled={setDisabled}
            serverError={errorData}
            placeholder="비밀번호를 입력하세요."
          />
        </div>
        <p className="info">
          * 비밀번호는 영문 대소문자 , 숫자 , 특수문자를 포함하여 최소 8자리
          이상으로 설정해야 합니다.
        </p>
        <button
          type="submit"
          disabled={submitting || disabled}
          className={`btn-type ${!disabled ? 'active' : ''}`}
        >
          다음
        </button>
      </form>
    </div>
  );
};

export default reduxForm({
  form: 'pwForm',
  validate
  // warn
})(PasswordForm);
