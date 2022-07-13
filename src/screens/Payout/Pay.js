/* eslint-disable react/prop-types */
//react imports
import React, { useEffect } from 'react'
import { useState } from 'react'
import { useSelector } from 'react-redux'
//material UI imports
import Modal from '@mui/material/Modal'
import Box from '@mui/material/Box'
//custom component imports
import { addPay } from 'src/services/PayoutService'

//main function starts here
function Pay({ openPay, handlePayClose, style, eidNum }) {
  const getState = useSelector((state) => state)
  const {
    userSignin: { userInfo },
  } = getState

  //states
  const [payData, setPayData] = useState()

  //updating eid state and re rendering if that changes
  useEffect(() => {
    setPayData({ eid: eidNum })
  }, [eidNum])

  //function to handle changes in inputs
  const handleChange = (event) => {
    const name = event.target.name
    const value = event.target.value
    setPayData((values) => ({ ...values, [name]: value }))
  }

  //function to hanlde form submission
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
