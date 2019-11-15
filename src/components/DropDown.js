import { Dropdown } from 'element-react';
import React from 'react';
export const RenderFormDropDown = ({
  input,
  list,
  placeholder,
  setDisabled,
  valueType,
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
    <SimpleDropDown
      list={list}
      classNames="form"
      onChange={val =>
        input.onChange(valueType === 'number' ? Number(val) : val)
      }
      input={input}
      initialVal={input.value}
      placeholder={placeholder}
    ></SimpleDropDown>
  );
};

export const SimpleDropDown = ({
  initialVal,
  input,
  onChange,
  list,
  placeholder,
  classNames
}) => {
  const initialValue = list.filter(item => item.code === initialVal);
  const valueField = initialValue[0] ? initialValue[0].name : null;
  return (
    <div>
      <Dropdown
        {...input}
        onCommand={code => onChange(code)}
        className={classNames}
        menu={
          <Dropdown.Menu>
            {list.map(item => {
              return (
                <Dropdown.Item
                  key={item.code}
                  disabled={item.disabled}
                  command={item.code.toString()}
                >
                  {item.name}
                </Dropdown.Item>
              );
            })}
          </Dropdown.Menu>
        }
      >
        <span className="el-dropdown-link">
          {valueField || placeholder}
          <i className="el-icon-caret-bottom el-icon--right"></i>
        </span>
      </Dropdown>
    </div>
  );
};
