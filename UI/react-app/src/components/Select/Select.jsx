import React, { Fragment } from "react";
import PropTypes from "prop-types";

// css
import "./Select.scss";

const propTypes = {
  placeholder: PropTypes.string,
  onChange: PropTypes.func,
  options: PropTypes.array,
};

const defaultProps = {
  onChange: () => {},
  options: [],
  placeholder: "--Select--",
  isDisable: false,
};

const Select = ({ isDisable, name, onChange, value, options, placeholder }) => {
  return (
    <Fragment>
      <div className="select_wrapper">
        <select className="form-control" name={name} value={value} onChange={onChange} disabled={isDisable}>
          <option value="" selected disabled>
            {placeholder}
          </option>
          {options.map((item, index) => {
            return (
              <option key={index} value={item.value}>
                {item.label}
              </option>
            );
          })}
        </select>
      </div>
    </Fragment>
  );
};

Select.propTypes = propTypes;
Select.defaultProps = defaultProps;

export default Select;

// how to use
// <Select options={options} value={osName} onChange={(e) => setOsName(e.target.value)} />;
