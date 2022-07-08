import * as React from 'react'

import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { getPosts, deletePosts, getPostsList } from 'src/services/PostService'
import MainBoard from 'src/components/include/MainBoard'
import { Container, createStyles } from '@material-ui/core'
import PersonAddAltIcon from '@mui/icons-material/PersonAddAlt'
import { Pagination } from '@mui/material'
import { DataGrid } from '@mui/x-data-grid'
import { useNavigate } from 'react-router-dom'
import EditIcon from '@mui/icons-material/Edit'
import DeleteIcon from '@mui/icons-material/Delete'
import FormStyles from 'src/helper/FormStyles'
const columns = [
  { field: 'eid', headerName: 'ID', width: 100 },
  { field: 'date', headerName: 'Date', width: 100 },
  { field: 'title', headerName: 'Title', width: 200 },
  { field: 'short_description', headerName: 'Short Description', width: 300 },
  { field: 'description', headerName: 'Description', width: 300 },
  { field: 'image', headerName: 'Image', width: 300 },
  {
    field: 'status',
    renderCell: (cellValues) => {
      return (
        <button className={cellValues?.row?.status == 1 ? 'red-btn' : 'green-btn'}>
          {cellValues?.row?.status == 1 ? 'Inactive' : 'Active'}
        </button>
      )
    },
  },
  {
    field: 'action',
    renderCell: (cellValue) => {
      return (
        <div className="edit-delete-div">
          <span className="pencil-icon">
            <EditIcon />
          </span>
          <span className="delete-icon">
            <DeleteIcon />
          </span>
        </div>
      )
    },
  },
]

const datagridSx = FormStyles

export default function HelpDesk() {
  const navigate = useNavigate()
  const getState = useSelector((state) => state)
  const {
    userSignin: { userInfo },
  } = getState

  const [posts, setPosts] = useState({})
  const [search, setSearch] = useState('')
  const [page, setPage] = useState(1)
  const [success, setSuccess] = useState(0)

  const getPostData = async () => {
    setPosts(await getPosts(userInfo))
  }

  const searchUser = async (value) => {
    setSearch(value)
    setPage(1)
    setPosts(await setPosts(userInfo, 1, value))
  }

  const changePage = async (e, value) => {
    console.log(value)
    setPage(value)
    setPosts(await setPosts(userInfo, value, search))
  }

  const handleDelete = async (eid, e) => {
    deletePosts(userInfo, eid)
    setPosts({ ...posts, data: { ...posts.data, data: [...posts.data.data.filter((v, i) => v.eid != eid)] } })
  }
  //navigating to add page of user
  const navigateFunction = (e) => {
    e.preventDefault()
    navigate('/post/add')
  }
  useEffect(() => {
    getPostData()
  }, [])

  console.log(posts)
  let sr_no = 0
  return (
    // <MainBoard>
    //   <Container fluid>
    <MainBoard>
      <Container fluid>
        <Container className="p-0 mt-4">
          <h6 className="p-0">Posts</h6>
        </Container>
        <Container className="background-white-theme custom-container-white">
          <div className="justify-flex-end input-div">
            <input
              type="text"
              placeholder="Search here"
              onChange={(e) => {
                searchUser(e.target.value)
              }}
            />
            <button className="custom-blue-btn m-2" onClick={navigateFunction}>
              Add Post<span>{<PersonAddAltIcon />}</span>
            </button>
          </div>
          <hr></hr>
          <div style={{ height: '75vh', width: '100%' }} className="py-2">
            {posts?.data?.data && (
              <DataGrid
                className="customTable"
                getRowId={(row) => Math.random() * 100}
                rows={posts.data.data}
                columns={columns}
                pageSize={10}
                rowsPerPageOptions={[0]}
                checkboxSelection
                sx={datagridSx}
              />
            )}
          </div>
          <Container>
            <Pagination
              className="pagination"
              count={posts?.data?.links ? posts.data.links.length - 2 : 1}
              page={page}
              defaultPage={page}
              onChange={(e, number) => changePage(e, number)}
            />
          </Container>
        </Container>
      </Container>
    </MainBoard>
  )
}
