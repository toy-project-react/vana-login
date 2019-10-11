import React from 'react';

export const Alerts = props => {
  return (
    <div className="mask" style={{ display: 'block' }}>
      <div className="flex-center">
        <div className="popup">
          {!props.isConfirm ? (
            <button className="btn-close" onClick={props.onClose} />
          ) : null}
          {props.children}
        </div>
      </div>
    </div>
  );
};

export const ConfirmOk = ({
  onSubmit,
  noTitle,
  title,
  text,
  submitText,
  emText
}) => {
  return (
    <>
      {noTitle ? null : (
        <div className="pop-title">
          <span className="i-check"></span>
          {title || '등록완료'}
        </div>
      )}
      <pre style={{ textAlign: 'center' }}>
        {emText && <strong className="txt-blue">{emText}</strong>}
        {text}
      </pre>
      <button onClick={onSubmit} className="btn-type active">
        {submitText || '확인'}
      </button>
    </>
  );
};
