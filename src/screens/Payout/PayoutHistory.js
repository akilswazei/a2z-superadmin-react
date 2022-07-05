/* eslint-disable react/prop-types */
import React from 'react'
import Modal from '@mui/material/Modal'
import Box from '@mui/material/Box'
import { DataGrid } from '@mui/x-data-grid'
import FormStyles from 'src/helper/FormStyles'

const datagridSx = FormStyles

const column2 = [
  { field: 'merchant_id', headerName: 'Merchant ID', width: 150 },
  { field: 'payout_amount', headerName: 'Amount', width: 150 },
  { field: 'payout_date', headerName: 'Amount', width: 150 },
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
function PayoutHistory({ openHistoryPayout, handleHistoryClose, payoutHistory, style }) {
  return (
    <>
      <Modal
        open={openHistoryPayout}
        onClose={handleHistoryClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style} className="w-50">
          <h3>Payout History</h3>
          <div style={{ height: '40vh', width: '100%' }} className="py-2">
            {payoutHistory?.data?.data && (
              <DataGrid
                className="customTable"
                getRowId={(row) => Math.random()}
                rows={payoutHistory.data.data}
                columns={column2}
                pageSize={10}
                rowsPerPageOptions={[10]}
                sx={datagridSx}
              />
            )}
          </div>
          <button className="custom-close-btn my-3" onClick={handleHistoryClose}>
            Close
          </button>
        </Box>
      </Modal>
    </>
  )
}

export default PayoutHistory
