import React from 'react';
import LoginForm from 'components/forms/LoginForm';

const LoginPresenter = ({ onSubmit, errorData }) => {
  return (
    <>
      <div className="login_bg"></div>
      <section className="login_wrap">
        <div className="box">
          <section className="logo"></section>
          <section>
            <LoginForm onSubmit={onSubmit} errorData={errorData} />
          </section>
        </div>
      </section>
    </>
  );
};
export default LoginPresenter;
