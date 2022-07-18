/* eslint-disable react/prop-types */
import { TextField } from '@material-ui/core'

import React from 'react'

export function CustomText({ name, value, handleChange, placeholder, error={}, required, label }) {
  return (
    <>
      <h6 className="color-gray">
        {label}
        <sup>{required === true ? '*' : ''}</sup>
      </h6>
      <TextField
        className="custom-form-field"
        required={required}
        id={name}
        name={name}
        variant="outlined"
        {...(value==''?{}:{value:value})}
        error={error[name]?true:false}
        helperText={error[name]?error[name]:false}
        type="text"
        placeholder={placeholder}
        fullWidth={true}
        onChange={handleChange}
      />
    </>
  )
}
export function CustomEmail({ handleChange,value, name, placeholder, label, required }) {
  return (
    <>
      <h6 className="color-gray">
        {label}
        <sup>{required === true ? '*' : ''}</sup>
      </h6>
      <TextField
        className="custom-form-field"
        required={required}
        id={name}
        name={name}
        type="email"
        variant="outlined"
        value={value}
        error={false}
        placeholder={placeholder}
        fullWidth={true}
        onChange={handleChange}
      />
    </>
  )
}
export function CustomPasssword({ handleChange, name, placeholder, label, required }) {
  return (
    <>
      <h6 className="color-gray">
        {label}
        <sup>{required === true ? '*' : ''}</sup>
      </h6>
      <TextField
        className="custom-form-field"
        required={required}
        id={name}
        name={name}
        type="password"
        variant="outlined"
        value=""
        error={false}
        placeholder={placeholder}
        fullWidth={true}
        onChange={handleChange}
      />
    </>
  )
}

export function CustomPhone({ handleChange,value, name, placeholder, label, required }) {
  return (
    <>
      <h6 className="color-gray">
        {label}
        <sup>{required === true ? '*' : ''}</sup>
      </h6>
      <TextField
        className="custom-form-field"
        required={required}
        id={name}
        name={name}
        type="number"
        variant="outlined"
        value={value}
        error={false}
        placeholder={placeholder}
        fullWidth={true}
        onChange={handleChange}
      />
    </>
  )
}
export function CustomSelect({ handleChange, options, value, name, label, required }) {
  return (
    <>
      <h6 className="color-gray">
        {label}
        <sup>{required === true ? '*' : ''}</sup>
      </h6>
      <select
        labelId="demo-simple-select-helper-label"
        id={name}
        className="custom-select-input"
        label={label}
        name={name}
        fullWidth={true}
        onChange={(e) => handleChange(e)}
      >
        <option  key={"noselect"} value={''}>
              Select..
            </option>
        {options.map((ovalue, key) => {
          return (
            <option selected={value == ovalue.eid ? 'selected' : ''} key={ovalue.eid} value={ovalue.eid}>
              {ovalue.name}
            </option>
          )
        })}
      </select>
    </>
  )
}
