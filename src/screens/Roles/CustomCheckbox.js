import * as React from 'react'
import Box from '@mui/material/Box'
import Checkbox from '@mui/material/Checkbox'
import FormControlLabel from '@mui/material/FormControlLabel'

export default function IndeterminateCheckbox() {
  const [checked, setChecked] = React.useState([true, false, false, false])

  const handleChange1 = (event) => {
    setChecked([event.target.checked, event.target.checked, event.target.checked, event.target.checked])
  }

  const handleChange2 = (event) => {
    setChecked([event.target.checked, checked[1], checked[2], checked[3]])
  }

  const handleChange3 = (event) => {
    setChecked([checked[0], event.target.checked, checked[2], checked[3]])
  }
  const handleChange4 = (event) => {
    setChecked([checked[0], checked[1], event.target.checked, checked[3]])
  }
  const handleChange5 = (event) => {
    setChecked([checked[0], checked[1], checked[2], event.target.checked])
  }

  const children = (
    <Box sx={{ display: 'flex', flexDirection: 'rows', ml: 3 }}>
      <FormControlLabel label="Add" control={<Checkbox checked={checked[0]} onChange={handleChange2} />} />
      <FormControlLabel label="View" control={<Checkbox checked={checked[1]} onChange={handleChange3} />} />
      <FormControlLabel label="Edit" control={<Checkbox checked={checked[2]} onChange={handleChange4} />} />
      <FormControlLabel label="Delete" control={<Checkbox checked={checked[3]} onChange={handleChange5} />} />
    </Box>
  )

  return (
    <div className="custom-checkbox-div">
      <FormControlLabel
        label="Select All"
        className="mx-auto"
        control={
          <Checkbox
            checked={checked[0] && checked[1] && checked[2] && checked[3]}
            indeterminate={((checked[0] !== checked[1]) !== checked[2]) !== checked[3]}
            onChange={handleChange1}
          />
        }
      />
      {children}
    </div>
  )
}
