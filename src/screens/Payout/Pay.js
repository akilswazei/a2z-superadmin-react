/* eslint-disable react/prop-types */
import React, { useEffect } from 'react'
import Modal from '@mui/material/Modal'
import Box from '@mui/material/Box'
import { CustomText } from 'src/helper/helper'
import { useState } from 'react'
import { addPay } from 'src/services/PayoutService'
import { useSelector } from 'react-redux'

function Pay({ openPay, handlePayClose, style, eidNum }) {
  const getState = useSelector((state) => state)
  const {
    userSignin: { userInfo },
  } = getState

  const [payData, setPayData] = useState()
  useEffect(() => {
    setPayData({ eid: eidNum })
  }, [eidNum])
  const handleChange = (event) => {
    const name = event.target.name
    const value = event.target.value
    setPayData((values) => ({ ...values, [name]: value }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    await addPay(userInfo, payData)
    handlePayClose()
  }

  return (
    <>
      <Modal
        open={openPay}
        onClose={handlePayClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style} className="w-50">
          <h3>Pay</h3>
          <form onSubmit={handleSubmit}>
            <div>
              <label className="custom-label">Amount: </label>
              <input
                className="custom-select-input"
                placeholder="Pay value ($)"
                type="number"
                name="amount"
                onChange={handleChange}
              />
            </div>
            <div className="mt-3">
              <label className="custom-label">Description: </label>
              <input
                className="custom-select-input"
                placeholder="Pay Description"
                type="text"
                name="payment_detail"
                onChange={handleChange}
              />
            </div>

            <button className="custom-pay-btn my-3">Pay</button>
          </form>
        </Box>
      </Modal>
    </>
  )
}

export default Pay
