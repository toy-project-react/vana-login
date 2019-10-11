import React from 'react';
import User from 'components/settings/User';

const Users = ({ userList, isAdmin }) => {
  return (
    <table>
      <colgroup>
        <col style={{ width: '13%' }} />
        <col style={{ width: '20%' }} />
        <col style={{ width: '15%' }} />
        <col style={{ width: '12%' }} />
        <col style={{ width: '20%' }} />
        <col style={{ width: '10%' }} />
        <col style={{ width: '5%' }} />
        <col />
      </colgroup>
      <thead>
        <tr>
          <th>이름</th>
          <th>이메일</th>
          <th>핸드폰번호</th>
          <th colSpan="2">소속</th>
          <th>상태</th>
          <th colSpan="2">권한</th>
        </tr>
      </thead>
      <tbody>
        {userList.results.map(user => (
          <User key={user.email} {...user} isAdmin={isAdmin} />
        ))}
      </tbody>
    </table>
  );
};

export default Users;
