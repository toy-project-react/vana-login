import { Link } from 'react-router-dom';
import React from 'react';
import { UserInfoForm } from 'components/settings';

const UserDetailPresenter = ({
  userDetail,
  onSubmit,
  errorData,
  openChangePassword
}) => {
  return (
    <>
      <div>
        <Link to={`/settings/users`}>
          <button className="btn-back">&lt; 뒤로가기</button>
        </Link>
      </div>
      <UserInfoForm
        info={userDetail}
        errorData={errorData}
        onSubmit={onSubmit}
        onChangePw={openChangePassword}
      />
    </>
  );
};
export default UserDetailPresenter;
