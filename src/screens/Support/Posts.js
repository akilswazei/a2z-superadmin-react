//react imports
import * as React from 'react'
import { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
//material UI imports
import { Container } from '@material-ui/core'
import PersonAddAltIcon from '@mui/icons-material/PersonAddAlt'
import { Pagination } from '@mui/material'
import { DataGrid } from '@mui/x-data-grid'
import EditIcon from '@mui/icons-material/Edit'
import DeleteIcon from '@mui/icons-material/Delete'
//custom style imports
import FormStyles from 'src/helper/FormStyles'
//custom component imports
import { getPosts, deletePosts } from 'src/services/PostService'
import MainBoard from 'src/components/include/MainBoard'

//columns for data grid
const columns = [
  { field: 'eid', headerName: 'ID', width: 100 },
  { field: 'date', headerName: 'Date', width: 100 },
  { field: 'title', headerName: 'Title', width: 200 },
  { field: 'short_description', headerName: 'Short Description', width: 300 },
  { field: 'description', headerName: 'Description', width: 300 },
  {
    field: 'image',
    renderCell: (cellValues) => {
      return <img src={cellValues?.row?.image} />
    },
    headerName: 'Image',
    width: 300,
    height: 300,
  },
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

//custom style for data grid
const datagridSx = FormStyles

//main fucntion
export default function HelpDesk() {
  //navigator
  const navigate = useNavigate()
  //redux
  const getState = useSelector((state) => state)
  const {
    userSignin: { userInfo },
  } = getState

  //state
  const [posts, setPosts] = useState({})
  const [search, setSearch] = useState('')
  const [page, setPage] = useState(1)
  const [success, setSuccess] = useState(0)

  //fetch
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
    setPosts(await getPosts(userInfo, value, search))
  }
  //events starts here
  const handleDelete = async (eid, e) => {
    deletePosts(userInfo, eid)
    setPosts({ ...posts, data: { ...posts.data, data: [...posts.data.data.filter((v, i) => v.eid != eid)] } })
  }
  //navigating to add page of user
  const navigateFunction = (e) => {
    e.preventDefault()
    navigate('/post/add')
  }
  //re-rendrer
  useEffect(() => {
    getPostData()
  }, [])

  console.log(posts)

  return (
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
