import React from 'react';
import { Link } from 'react-router-dom';

const NotFound = () => {
  return (
    <>
      <div className="page-error">
        <h4>페이지를 찾을 수 없습니다.</h4>
        <p>
          지금 입력하신 주소의 페이지는 사라졌거나 사용이 중단되었습니다.다시
          확인해주세요.
        </p>
        <Link to="/">
          <button className="btn-type active">메인으로 이동</button>
        </Link>
      </div>
    </>
  );
};

export default NotFound;
