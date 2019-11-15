import { Field, reduxForm } from 'redux-form';
import React, { useState } from 'react';

import { RenderInput } from 'components/Inputs';

const validate = values => {
  const errors = {};
  if (!values.part) {
    errors.part = '소속은 필수입력입니다.';
  }
  if (!values.fullname) {
    errors.name = '이름은 필수입력입니다.';
  }
  if (!values.email) {
    errors.email = '이메일은 필수입력입니다.';
  } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
    errors.email = '이메일 주소가 올바르지 않습니다.';
  }
  return errors;
};
const AddUserForm = ({ handleSubmit, loading, submitting, errorData }) => {
  const [disabled, setDisabled] = useState(true);

  return (
    <form onSubmit={handleSubmit}>
      <div className="form-group">
        <h2 className="txt-center">신규 사용자 기본 정보</h2>
        <div className="inp-type">
          <strong>소속</strong>
          <Field
            name="part"
            type="text"
            required={true}
            component={RenderInput}
            setDisabled={setDisabled}
            placeholder=""
          ></Field>
        </div>
        <div className="inp-type">
          <strong>이름</strong>
          <Field
            name="fullname"
            type="text"
            required={true}
            component={RenderInput}
            setDisabled={setDisabled}
            placeholder="이름을 입력하세요."
          ></Field>
        </div>
        <div className="inp-type">
          <strong>이메일</strong>
          <Field
            name="email"
            type="text"
            required={true}
            component={RenderInput}
            setDisabled={setDisabled}
            placeholder="이메일을 입력하세요."
            serverError={errorData}
          ></Field>
        </div>
        <button
          type="submit"
          disabled={loading || disabled}
          className={`btn-type ${!disabled && !loading ? 'active' : ''}`}
        >
          등록하기
        </button>
      </div>
    </form>
  );
};

export default reduxForm({
  form: 'addUserForm',
  validate
})(AddUserForm);
