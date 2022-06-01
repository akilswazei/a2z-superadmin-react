/* eslint-disable prettier/prettier */
import * as React from 'react'

import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import MainBoard from 'src/components/include/MainBoard'
import { Container } from '@material-ui/core'
import PersonAddAltIcon from '@mui/icons-material/PersonAddAlt'
import { makeStyles,Pagination } from '@mui/material'
import { DataGrid } from '@mui/x-data-grid'
import { deleteStore, getStores } from 'src/services/StoreService';

const columns = [
  { field: 'eid', headerName: 'id' },
  { field: 'store_name', headerName: 'Name' }
]


const Store = () => {
 
  const getState = useSelector(state => state);
  const {userSignin: { userInfo }} = getState

  const [stores, setStore] = useState({});
  const [search, setSearch] = useState('');
  const [page, setPage] = useState(1);

  const getStoreData = async () => {
    setStore(await getStores(userInfo));
  }

  const searchStore =async (value) => {
    setSearch(value);
    setPage(1);
    setStore(await getStores(userInfo,1,value));
  }

  const changePage =async (value) => {
    setPage(value);
    setStore(await getStores(userInfo,value,search));
  }

  const handleDelete =async (eid,e) => {
    deleteStore(userInfo,eid)
    setStore({...Store, data: {...Store.data,data:[...Store.data.data.filter((v,i) => v.eid!=eid)]}});
  }

  useEffect(() => {
    getStoreData();
  }, []);
  
  
console.log(Store);
  let sr_no = 0;
  
  return (
    <MainBoard>
    <Container fluid className="background-theme-purple">
      <Container className="pt-3">
        <h6>Stores</h6>
      </Container>
      <Container className="background-white-theme">
        <div className="justify-flex-end">
          <input
            type="text"
            placeholder="Search here"
            onChange={(e) => {
              searchStore(e.target.value)
            }}
          />
          <button className="custom-blue-btn m-2">
            Add Store<span>{<PersonAddAltIcon />}</span>
          </button>
        </div>
        <div style={{ height: 400, width: '100%' }}>
          {stores?.data?.data && (
            <DataGrid
              getRowId={(row) => Math.random()}
              rows={stores.data.data}
              columns={columns}
              pageSize={10}
              rowsPerPageOptions={[10]}
              checkboxSelection
            />
          )}
          <Pagination count={11} defaultPage={6}  />
        </div>
        
      </Container>
    </Container>
  </MainBoard>


    )
}
export default Store;
