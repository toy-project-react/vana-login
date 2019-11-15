import React from 'react';

export const RenderInput = ({
  input,
  type,
  placeholder,
  setDisabled,
  serverError,
  notUseError,
  disabled,
  required,
  readOnly,
  meta
}) => {
  if (setDisabled) {
    if (meta.error || meta.warnings) {
      setDisabled(true);
    } else {
      setDisabled(false);
    }
  }

  return (
    <div
      className={
        (!notUseError && serverError && serverError.isError) ||
        (!notUseError && meta.visited && meta.error)
          ? 'error'
          : null
      }
    >
      <input
        required={required}
        {...input}
        type={type}
        placeholder={placeholder}
        disabled={disabled ? 'disabled' : ''}
        readOnly={readOnly ? 'readonly' : ''}
      />
      {(serverError && serverError.isError) || (meta.visited && meta.error) ? (
        <div className="msg-error">
          {(serverError && serverError.message) ||
            (meta.error ? meta.error : meta.warnings ? meta.warnings : null)}
        </div>
      ) : null}
    </div>
  );
};

export const PasswordRenderInput = ({
  input,
  icon,
  type,
  placeholder,
  onIconClick,
  setDisabled,
  serverError,
  notUseError,
  disabled,
  required,
  readOnly,
  meta
}) => {
  if (setDisabled) {
    if (meta.error || meta.warnings) {
      setDisabled(true);
    } else {
      setDisabled(false);
    }
  }

  return (
    <div
      className={
        (!notUseError && serverError && serverError.isError) ||
        (!notUseError && meta.visited && meta.error)
          ? 'error'
          : null
      }
    >
      <input
        required={required}
        {...input}
        type={type}
        placeholder={placeholder}
        disabled={disabled ? 'disabled' : ''}
        readOnly={readOnly ? 'readonly' : ''}
      />
      <button
        className={icon}
        type="button"
        onClick={icon ? () => onIconClick() : null}
      ></button>
      {(serverError && serverError.isError) || (meta.visited && meta.error) ? (
        <>
          <div className="msg-error">
            {(serverError && serverError.message) ||
              (meta.error ? meta.error : meta.warnings ? meta.warnings : null)}
          </div>
        </>
      ) : null}
    </div>
  );
};
