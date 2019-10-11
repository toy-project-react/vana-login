import React from 'react';
import { Link } from 'react-router-dom';

const User = ({
  email,
  fullname,
  phone,
  part,
  sub_part,
  state,
  account_type,
  isAdmin
}) => (
  <tr>
    <td className="txt-bold">
      {fullname ? fullname.replace(/(\D{1})?(\D{1})?(\D{1})/, '$1*$3') : ''}
    </td>
    <td>{email}</td>
    <td>
      {phone ? phone.replace(/^(\d{3})-?(\d{3,4})-?(\d{4})$/, '$1****$3') : ''}
    </td>
    <td>{part}</td>
    <td>{sub_part}</td>
    <td className="txt-bold">{state ? '활성화' : '비활성화'}</td>
    <td>
      <span className={`${account_type ? 'i-auth02' : 'i-auth01'}`} />
    </td>
    <td>
      {isAdmin ? (
        <Link
          to={{
            pathname: `/settings/users/detail`,
            state: {
              email
            }
          }}
        >
          <button className="i-more" />
        </Link>
      ) : null}
    </td>
  </tr>
);
export default User;
