import { Field, reduxForm } from 'redux-form';
import React, { useState } from 'react';

import { RenderFormDropDown } from 'components/DropDown';
import { RenderInput } from 'components/Inputs';
import { connect } from 'react-redux';

const validate = values => {
  const errors = {};
  if (!values.phone) {
    errors.phone = '핸드폰번호는 필수입력입니다.';
  } else if (!/^(\d{3})-?(\d{3,4})-?(\d{4})$/i.test(values.phone)) {
    errors.phone = '핸드폰번호가 올바르지 않습니다.';
  }
  if (!values.part) {
    errors.part = '소속은 필수입력입니다.';
  }
  if (!values.sub_part) {
    errors.sub_part = '부서는 필수입력입니다.';
  }
  return errors;
};

let UserInfoForm = ({
  info,
  handleSubmit,
  submitting,
  errorData,
  onChangePw
}) => {
  const [disabled, setDisabled] = useState(true);
  const codeDisabled = info && info.account_type ? false : true;
  const roleList = [
    {
      name: '관리자',
      code: 1,
      disabled: codeDisabled
    },
    {
      name: '운영자',
      code: 0,
      disabled: codeDisabled
    }
  ];
  return (
    <form onSubmit={handleSubmit}>
      <div className="form-group">
        <h2 className="txt-center">사용자 정보</h2>
        <div className="inp-type">
          <strong>이름</strong>
          <Field
            name="fullname"
            type="text"
            component={RenderInput}
            disabled={true}
            readOnly={true}
          ></Field>
        </div>
        <div className="inp-type">
          <strong>이메일</strong>
          <Field
            name="email"
            type="text"
            disabled={true}
            readOnly={true}
            component={RenderInput}
          ></Field>
        </div>
        <div className="inp-type">
          <strong>비밀번호</strong>
          <div>
            <input type="password" value="password" readOnly disabled={true} />
            <button className="inp-btn" name="pop01" onClick={onChangePw}>
              변경
            </button>
          </div>
        </div>
        <div className="inp-type">
          <strong>핸드폰번호</strong>
          <Field
            name="phone"
            type="text"
            required={true}
            component={RenderInput}
            setDisabled={setDisabled}
            placeholder="핸드폰번호를 입력하세요."
          ></Field>
        </div>
        <div className="inp-type">
          <strong>소속</strong>
          <Field
            name="part"
            type="text"
            required={true}
            component={RenderInput}
            setDisabled={setDisabled}
            placeholder="소속을 입력하세요."
          ></Field>
        </div>
        <div className="inp-type">
          <strong>부서</strong>
          <Field
            name="sub_part"
            type="text"
            required={true}
            component={RenderInput}
            setDisabled={setDisabled}
            placeholder="부서를 입력하세요."
          ></Field>
        </div>
        <div className="inp-type">
          <strong>권한</strong>
          <Field
            name="account_type"
            list={roleList}
            component={RenderFormDropDown}
            valueType="number"
            setDisabled={setDisabled}
          ></Field>
        </div>
        <button
          type="submit"
          disabled={submitting || disabled}
          className={`btn-type ${!disabled ? 'active' : ''}`}
        >
          저장하기
        </button>
      </div>
    </form>
  );
};

UserInfoForm = reduxForm({
  form: 'userForm',
  enableReinitialize: true,
  validate
})(UserInfoForm);
UserInfoForm = connect(state => ({
  initialValues: state.users.userDetail
}))(UserInfoForm);

export default UserInfoForm;
