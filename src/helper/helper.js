/* eslint-disable react/prop-types */
import { TextField } from '@material-ui/core'
import { useDispatch, useSelector } from 'react-redux'
import { useEffect } from 'react'

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
        {...(value==''?{}:{value:value})}
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
export function CustomFileUpload({ handleChange,error, value, name, label, required }) {
  const getState = useSelector((state) => state)
  const dispatch = useDispatch()
  const {
    media: {fileFields},
  } = getState

  useEffect(() => {
   // if(fileFields[name]==undefined){
      console.log({[name]: {id:value,url:""}})
      dispatch({ type: "UpdateFileField", payload: {[name]: {id:value,url:"https://upload.wikimedia.org/wikipedia/commons/4/41/Sunflower_from_Silesia2.jpg"} } })
    //}

  }, [])
  function handleButton(){
    console.log(fileFields)
    dispatch({ type: "MediaOpen", payload: true })
    dispatch({ type: "setFileInput", payload: name })
  }

  return (
    <>

      <h6 className="color-gray">
        {label}
        <sup>{required === true ? '*' : ''}</sup>
      </h6>
      <img width="100" src={fileFields?.[name]?.url} /><br/>
      <button  onClick={(e)=> handleButton()} >Upload Image</button>
    </>
  )
}

export function CustomSelect({ handleChange, options,error, value, name, label, required }) {
  return (
    <>
      <h6 className="color-gray">
        {label}
        <sup>{required === true ? '*' : ''}</sup>
      </h6>
      <select
        labelId="demo-simple-select-helper-label"
        id={name}
        className={error[name]?"custom-select-input error":"custom-select-input"}
        label={label}
        name={name}
        {...(value==''?{}:{value:value})}
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
      {error[name]?(<p className='MuiFormHelperText-root MuiFormHelperText-contained Mui-error Mui-required'>{ error[name] }</p>):""}
    </>
  )
}