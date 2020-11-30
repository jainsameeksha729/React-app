import React from "react";
import PropTypes from "prop-types";
import ReactSelect from "react-select";

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
};

const Select = ({ isDisable, name, onChange, value, options, placeholder, defaultValue }) => {
  return (
    <ReactSelect
      onChange={(e) => onChange({ name, value: e.value })}
      placeholder={placeholder}
      defaultValue={defaultValue}
      value={options.find((ele) => ele.value === value)}
      options={options}
      classNamePrefix="ss_select"
      isSearchable={false}
      // menuIsOpen={true}
    ></ReactSelect>
  );
};

Select.propTypes = propTypes;
Select.defaultProps = defaultProps;

export default Select;

// how to use
// <Select options={options} value={osName} onChange={(e) => setOsName(e.value)} />;
