/* eslint-disable prettier/prettier */
//react imports
import { useNavigate } from 'react-router-dom'
import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
//material UI imports
import Dialog from '@mui/material/Dialog'
import DialogActions from '@mui/material/DialogActions'
import DialogContent from '@mui/material/DialogContent'
import DialogContentText from '@mui/material/DialogContentText'
import DialogTitle from '@mui/material/DialogTitle'
import { Container, Button, InputLabel, MenuItem, Select, Grid } from '@material-ui/core'
//custom style imports
//custom component imports
import { addPost } from 'src/services/PostService'
import MainBoard from 'src/components/include/MainBoard'
import { getPostsList } from 'src/services/PostService'

//main function
function AddTeam() {
  //redux
  const getState = useSelector((state) => state)
  //navigator
  const navigate = useNavigate()

  const {
    userSignin: { userInfo },
  } = getState

  //state
  const [inputs, setInputs] = useState({ status: 1, merchant_id: '211019041655' })
  const [open, setOpen] = React.useState(false)
  const [errors, setErros] = React.useState(false)
  const [postList, setPostList] = useState({})

  //events starts here
  const handleChange = (event) => {
    const name = event.target.name
    const value = event.target.value
    console.log(event.target.value)
    setInputs((values) => ({ ...values, [name]: value }))
  }
  //const [validated, setValidated] = useState(false);
  const submitHandler = async (e) => {
    e.preventDefault()
    if (inputs.password == inputs.confirm_password) {
      setErros({ ...errors, confirm_password: '' })
      await addPost(userInfo, inputs)
      setOpen(true)
    } else {
      setErros({ ...errors, confirm_password: 'password not matched' })
    }
  }
  const handleClose = () => {
    setOpen(false)
    navigate('../posts', { replace: true })
  }
  //events ends here
  //fetch
  const getPostList = async () => {
    setPostList(await getPostsList(userInfo))
  }

  //re-rendrer
  useEffect(() => {
    getPostList()
  }, [])

  console.log(postList)
  return (
    <MainBoard>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">{'Alert'}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">Successfully Submitted</DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>OK</Button>
        </DialogActions>
      </Dialog>

      <Container fluid>
        <Container className="p-0 mt-4">
          <h6>Add Support</h6>
        </Container>
        <Container className="background-white-theme my-3 custom-container-white">
          <form onSubmit={submitHandler}>
            <Grid container spacing={2}>
              <Grid item xs={12} className="my-3 p-0">
                <h6 className="m-0 p-0">Post Infomation</h6>
              </Grid>
              <Grid item xs={12}>
                <input
                  className="custom-select-input"
                  placeholder="Title"
                  type="text"
                  name="title"
                  onChange={handleChange}
                />
              </Grid>

              <Grid item xs={12}>
                <input
                  className="custom-select-input custom-short-desc"
                  placeholder="Short Description"
                  type="text"
                  name="short_description"
                  onChange={handleChange}
                />
              </Grid>
              <Grid item xs={12}>
                <textarea
                  className="custom-select-input custom-textarea"
                  placeholder="Description"
                  type="text"
                  name="description"
                  onChange={handleChange}
                />
              </Grid>

              <Grid item xs={6}>
                <InputLabel id="demo-simple-select-helper-label">Category</InputLabel>
                <Select
                  labelId="demo-simple-select-helper-label"
                  id="demo-simple-select-helper1"
                  value={inputs.eid}
                  label="Status"
                  name="cat_id"
                  defaultValue=""
                  fullWidth={true}
                  onChange={(e) => handleChange(e)}
                >
                  {/* <MenuItem value={''}>
                    <em>Select Status</em>
                  </MenuItem>
                  <MenuItem value={1}>Active</MenuItem>
                  <MenuItem value={2}>Inactive</MenuItem> */}
                  {postList?.data?.map((postli) => (
                    <MenuItem key={postli.eid} value={postli.eid}>
                      <em>{postli.cat_name}</em>
                    </MenuItem>
                  ))}
                </Select>
              </Grid>
              <Grid item xs={12} style={{ display: 'flex', justifyContent: 'flex-end', alignItems: 'center' }}>
                <Button
                  type="submit"
                  variant="outlined"
                  color="primary"
                  className="name"
                  style={{ margin: '15px 5px' }}
                >
                  Cancel
                </Button>
                <Button
                  type="submit"
                  variant="contained"
                  color="primary"
                  className="name"
                  style={{ margin: '15px 5px', boxShadow: 'none' }}
                >
                  Submit
                </Button>
              </Grid>
            </Grid>
          </form>
        </Container>
      </Container>
    </MainBoard>
  )
}
export default AddTeam
