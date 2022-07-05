/* eslint-disable react/prop-types */
import React from 'react'
import Modal from '@mui/material/Modal'
import Box from '@mui/material/Box'
import { DataGrid } from '@mui/x-data-grid'
import FormStyles from 'src/helper/FormStyles'

const datagridSx = FormStyles

const column2 = [
  { field: 'payout_payment_eid', headerName: 'Payout ID', width: 150 },
  { field: 'credit', headerName: 'Credited $', width: 120 },
  { field: 'debit', headerName: 'Debited $', width: 120 },
  { field: 'payment_detail', headerName: 'Payment Detail', width: 150 },
  { field: 'payment_type', headerName: 'Payment type', width: 150 },
  {
    field: 'status',
    width: 150,
    renderCell: (cellValues) => {
      return (
        <button className={cellValues?.row?.status == 1 ? 'red-btn' : 'green-btn'}>
          {cellValues?.row?.status == 1 ? 'Processing' : 'Completed'}
        </button>
      )
    },
  },
]
function PayHistory({ openPayHistory, handleHistoryPayClose, payHistory, style }) {
  return (
    <>
      <Modal
        open={openPayHistory}
        onClose={handleHistoryPayClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style} className="w-50">
          <h3>Payout History</h3>
          <div style={{ height: '40vh', width: '100%' }} className="py-2">
            {payHistory?.data?.data && (
              <DataGrid
                className="customTable"
                getRowId={(row) => Math.random()}
                rows={payHistory.data.data}
                columns={column2}
                pageSize={10}
                rowsPerPageOptions={[10]}
                sx={datagridSx}
              />
            )}
          </div>
          <button className="custom-close-btn my-3" onClick={handleHistoryPayClose}>
            Close
          </button>
        </Box>
      </Modal>
    </>
  )
}

export default PayHistory
