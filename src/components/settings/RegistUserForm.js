import { Field, reduxForm } from 'redux-form';
import React, { useState } from 'react';

import { RenderInput } from 'components/Inputs';

const validate = values => {
  const errors = {};
  if (!values.email) {
    errors.email = '이메일은 필수입력입니다.';
  } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
    errors.email = '이메일 주소가 올바르지 않습니다.';
  }
  if (!values.sub_part) {
    errors.sub_part = '부서는 필수입력입니다.';
  }
  if (!values.phone) {
    errors.phone = '핸드폰번호는 필수입력입니다.';
  } else if (!/^(\d{3})-?(\d{3,4})-?(\d{4})$/i.test(values.phone)) {
    errors.phone = '핸드폰번호가 올바르지 않습니다.';
  }
  return errors;
};

const RegistUser = ({ handleSubmit, submitting, errorData }) => {
  // hooks
  const [disabled, setDisabled] = useState(true);

  return (
    <div className="form-group">
      <h2>사용자 등록 정보</h2>
      <form onSubmit={handleSubmit}>
        <div className="inp-type">
          <strong>이메일</strong>
          <Field
            name="email"
            type="email"
            component={RenderInput}
            setDisabled={setDisabled}
            placeholder="이메일을 입력하세요."
          />
        </div>
        <h2>부가 정보를 입력하세요</h2>
        <div className="inp-type">
          <strong>부서</strong>
          <Field
            name="sub_part"
            type="text"
            component={RenderInput}
            setDisabled={setDisabled}
            placeholder="부서를 입력하세요"
          />
        </div>
        <div className="inp-type">
          <strong>핸드폰번호</strong>
          <Field
            name="phone"
            type="text"
            component={RenderInput}
            setDisabled={setDisabled}
            serverError={errorData}
            placeholder="핸드폰번호를 입력하세요"
          />
        </div>
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
  form: 'userForm',
  validate
})(RegistUser);
