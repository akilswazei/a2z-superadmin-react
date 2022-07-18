/* eslint-disable react/prop-types */
import { TextField } from '@material-ui/core'

import React from 'react'

export function CustomText({ name, value, handleChange, placeholder, error, required, label }) {
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
        value={value}
        variant="outlined"
        defaultValue=""
        error={false}
        type="text"
        placeholder={placeholder}
        fullWidth={true}
        onChange={handleChange}
      />
    </>
  )
}
export function CustomEmail({ handleChange, name, placeholder, label, required }) {
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
        defaultValue=""
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

export function CustomPhone({ handleChange, name, placeholder, label, required }) {
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
        value=""
        error={false}
        placeholder={placeholder}
        fullWidth={true}
        onChange={handleChange}
      />
    </>
  )
}
