import React from 'react';
import AddUserForm from 'components/forms/AddUserForm';

const JoinPresenter = ({ onSubmit, errorData }) => {
  return (
    <div className="content dashboard">
      <AddUserForm onSubmit={onSubmit} errorData={errorData} />
    </div>
  );
};
export default JoinPresenter;
