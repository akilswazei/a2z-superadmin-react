/* eslint-disable prettier/prettier */
import * as React from 'react'

import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import MainBoard from 'src/components/include/MainBoard'
import { Container } from '@material-ui/core'
import PersonAddAltIcon from '@mui/icons-material/PersonAddAlt'
import { makeStyles, Pagination } from '@mui/material'
import { DataGrid } from '@mui/x-data-grid'
import { deleteIndividual, getIndividuals } from 'src/services/IndividualService'
import { useNavigate } from 'react-router-dom'
const columns = [{ field: 'eid', headerName: 'id' }]

const datagridSx = {
  '& .MuiDataGrid-virtualScrollerRenderZone': {
    '& .MuiDataGrid-row': {
      '&:nth-of-type(2n)': { backgroundColor: 'rgba(235, 235, 235, .7)' },
    },
  },
  '& .MuiDataGrid-columnHeaders': {
    backgroundColor: 'rgba(255,255,255)',

    fontSize: '1.1em',
    textTransform: 'capitalize',
    color: 'gray',
  },
  '& .MuiDataGrid-row': {
    fontSize: '0.9em',
    fontWeight: '600',
  },
}
const Individual = () => {
  const getState = useSelector((state) => state)
  const {
    userSignin: { userInfo },
  } = getState

  const [individual, setIndividual] = useState({})
  const [search, setSearch] = useState('')
  const [page, setPage] = useState(1)

  const getIndividualData = async () => {
    setIndividual(await getIndividuals(userInfo))
  }

  const searchIndividual = async (value) => {
    setSearch(value)
    setPage(1)
    setIndividual(await getIndividuals(userInfo, 1, value))
  }

  const changePage = async (value) => {
    setPage(value)
    setIndividual(await getIndividuals(userInfo, value, search))
  }

  const handleDelete = async (eid, e) => {
    deleteIndividual(userInfo, eid)
    setIndividual({
      ...individual,
      data: { ...individual.data, data: [...individual.data.data.filter((v, i) => v.eid != eid)] },
    })
  }
  //navigating to add page of individual
  const navigate = useNavigate()
  const navigateFunction = (e) => {
    e.preventDefault()
    navigate('/individual/add')
  }
  useEffect(() => {
    getIndividualData()
  }, [])

  console.log(individual)
  let sr_no = 0

  return (
    <MainBoard>
      <Container fluid>
        <Container className="pt-3">
          <h6>Individuals</h6>
        </Container>
        <Container className="background-white-theme custom-container-white">
          <div className="justify-flex-end input-div">
            <input
              type="text"
              placeholder="Search here"
              onChange={(e) => {
                searchIndividual(e.target.value)
              }}
            />
            <button className="custom-blue-btn m-2" onClick={navigateFunction}>
              Add Individual<span>{<PersonAddAltIcon />}</span>
            </button>
          </div>
          <hr></hr>
          <div style={{ height: '75vh', width: '100%' }}>
            {individual?.data?.data && (
              <DataGrid
                getRowId={(row) => Math.random()}
                rows={individual.data.data}
                columns={columns}
                pageSize={10}
                rowsPerPageOptions={[10]}
                checkboxSelection
                sx={datagridSx}
              />
            )}
            {/* <Pagination count={11} defaultPage={6}  /> */}
          </div>
        </Container>
      </Container>
    </MainBoard>
  )
}
export default Individual
