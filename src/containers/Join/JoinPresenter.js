import AddUserForm from 'components/forms/AddUserForm';
import React from 'react';

const JoinPresenter = ({ onSubmit, errorData }) => {
  return (
    <div className="content dashboard">
      <AddUserForm onSubmit={onSubmit} errorData={errorData} />
    </div>
  );
};
export default JoinPresenter;
