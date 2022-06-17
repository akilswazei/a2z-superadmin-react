/* eslint-disable prettier/prettier */
import * as React from 'react'

import { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'

import { Container } from '@material-ui/core'

import { DataGrid } from '@mui/x-data-grid'
import { getMerchants } from 'src/services/MerchantService'
import FormStyles from 'src/helper/FormStyles'
const datagridSx = FormStyles
const MerchantDash = () => {
  const columns = [
    { field: 'authorize_person_first_name', headerName: 'Merchant name', width: 200 },
    { field: 'merchant_id', headerName: 'Merchant ID', width: 200 },
    { field: 'onbording_date', headerName: 'Onboarding Date', width: 200 },

    {
      field: 'status',
      headerName: 'Status',
      width: 150,
      renderCell: (cellValues) => {
        return (
          <button className={cellValues?.row?.status == 1 ? 'red-btn' : 'green-btn'}>
            {cellValues?.row?.status == 1 ? 'Declined' : 'Approved'}
          </button>
        )
      },
    },
  ]
  const getrows = () => {
    let rows = []
    var i = 0
    merchants?.data?.data.map((item, key) => {
      rows[i++] = {
        eid: item.eid,
        business_contact_name: item.business_contact_name,
      }
    })
    return rows
  }
  const getState = useSelector((state) => state)
  const {
    userSignin: { userInfo },
  } = getState

  const [merchants, setMerchant] = useState({})
  const [search, setSearch] = useState('')
  const [page, setPage] = useState(1)

  const getMerchantData = async () => {
    setMerchant(await getMerchants(userInfo))
  }

  useEffect(() => {
    getMerchantData()
  }, [])

  console.log(merchants)

  return (
    <Container>
      <Container className="p-0 ">
        <h6>Merchants</h6>
      </Container>
      <Container className="background-white-theme custom-container-white">
        <div style={{ height: '75vh', width: '100%' }} className="py-3">
          {merchants?.data?.data && (
            <DataGrid getRowId={(row) => Math.random()} rows={merchants.data.data} columns={columns} sx={datagridSx} />
          )}
        </div>
      </Container>
    </Container>
  )
}
export default MerchantDash
