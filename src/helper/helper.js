/* eslint-disable react/prop-types */
import { TextField } from '@material-ui/core'
import * as React from 'react'

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
        variant="outlined"
        value={value}
        error={false}
        type="text"
        placeholder={placeholder}
        fullWidth={true}
        onChange={handleChange}
      />
    </>
  )
}
export function CustomEmail({ handleChange, value, name, placeholder, label, required }) {
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
        value={value}
        variant="outlined"
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
        error={false}
        placeholder={placeholder}
        fullWidth={true}
        onChange={handleChange}
      />
    </>
  )
}

export function CustomPhone({ handleChange, value, name, placeholder, label, required }) {
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
export function CustomSelect({ handleChange,options, value, name, label, required }) {
  return (
    <>
      <h6 className="color-gray">
        {label}
        <sup>{required === true ? '*' : ''}</sup>
      </h6>
      { console.log(options) }
      <select
          labelId="demo-simple-select-helper-label"
          id={name}
          label={label}
          name={name}
          fullWidth={true}
          onChange={(e) => handleChange(e)}
        >
          {
          options.map((ovalue,key) => {
            return (<option selected={value==ovalue.eid?"selected":""} key={ovalue.eid} value={ovalue.eid}>{ovalue.name}</option>)
          }) 

          }
      </select>
      </>
  )
}
      
export function CustomDate({ handleChange, value, name, placeholder, label, required }) {
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
        type="date"
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
