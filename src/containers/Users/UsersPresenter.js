import { Link } from 'react-router-dom';
import NoData from 'components/NoData';
import Pagination from 'components/Pagination';
import React from 'react';
import Users from 'components/settings/Users';

const UsersPresenter = ({
  loading,
  userList,
  userInfo: { account_type },
  onChangePagination
}) => {
  return (
    !loading && (
      <>
        <div className="title02">
          사용자 목록
          <div className="wrap-r">
            {account_type === 1 ? (
              <Link to={`/settings/users/add`}>
                <button className="btn-line-type active" name="pop01">
                  운영자 추가
                </button>
              </Link>
            ) : null}
          </div>
        </div>
        <div className="tbl-type v1">
          {!userList ? (
            <NoData></NoData>
          ) : (
            <Users userList={userList} isAdmin={account_type === 1}></Users>
          )}
        </div>
        {userList ? (
          <Pagination
            count={userList ? userList.count : 0}
            onChange={onChangePagination}
          ></Pagination>
        ) : null}
      </>
    )
  );
};
export default UsersPresenter;
