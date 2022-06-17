import { useNavigate } from 'react-router-dom'
import { Container } from '@mui/system'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import MainBoard from 'src/components/include/MainBoard'
import { Grid } from '@material-ui/core'
import AccessTimeIcon from '@mui/icons-material/AccessTime'
import StorefrontIcon from '@mui/icons-material/Storefront'
import EmailIcon from '@mui/icons-material/Email'
import LocalPhoneIcon from '@mui/icons-material/LocalPhone'
import {getSubscription} from 'src/services/SubscriptionService'
import { useParams } from 'react-router-dom'

function OrderDetail() {
  const navigate = useNavigate()
  const getState = useSelector((state) => state)
  const {
    userSignin: { userInfo },
  } = getState
  const { eid } = useParams()

  const [order_data, setOrder] = React.useState({})
  const handleChange = (event) => {
   // setAge(event.target.value)
  }
  

  const getSubscriptionData=async (eid) =>{
    const {data}=await getSubscription(userInfo,eid)
    console.log(data)
    setOrder(data)
  }
  useEffect(() => {
    if (eid) {
      getSubscriptionData(eid)
     }

  }, [])
  
  return (
    <MainBoard>
      <Container fluid>
        <Container className="p-0 mt-4">
          <h6 className="p-0">Order Details</h6>
        </Container>
        <Container className="background-white-theme custom-container-white">
          <div className="order-id py-2">
            <h6>Order #{ order_data?.order?.eid}</h6>
          </div>
          <Grid container>
            <Grid item xs={4}>
              <Grid item xs={12}>
                <div className="order-time-detail">
                  <AccessTimeIcon />
                  <p>
                    <span className="date">{ order_data?.order?.created_at}, </span>
                    <span className="time">1:50 PM</span>
                  </p>
                </div>
              </Grid>

              <Grid item xs={12}>
                <div className="input-div mt-4">
                  <input type="text" placeholder="Processing" />
                </div>
              </Grid>
            </Grid>
            <Grid item xs={4}>
              <div className="order-address-details">
                <p className="address-p">{ order_data?.merchant?.authorize_person_first_name},</p>
                <ul>
                  <li>
                    <StorefrontIcon /> <span>MID: #{ order_data?.merchant?.merchant_id}</span>
                  </li>
                  <li>
                    <EmailIcon /> <span>{ order_data?.store?.store_email}</span>
                  </li>
                  <li>
                    <LocalPhoneIcon /> <span>{ order_data?.store?.store_contact}</span>
                  </li>
                </ul>
                <p>{ order_data?.store?.store_address_1}</p>
              </div>
            </Grid>
            <Grid item xs={4}>
              <div className="btn-div">
                <button className="order-status-btn">{ order_data?.order?.status==2?"Proccessing":""}</button>
              </div>
            </Grid>
            <Grid item xs={8} className="my-5">
              <p>Add Notes</p>
              <div className="input-div">
                <input type="text" placeholder="Add a few notes here" className="w-100" />
              </div>
            </Grid>
            <Grid item xs={4}></Grid>
            <Grid item xs={6}>
              <p>Product</p>
            </Grid>
            <Grid item xs={2}>
              <p>Rate</p>
            </Grid>
            <Grid item xs={2}>
              <p>Qty</p>
            </Grid>
            <Grid item xs={2}>
              <p>Price</p>
            </Grid>
            <Grid container={true} items xs={12} className="border-top-bottom product-grid">
            {/* products listing starts here */}
            { order_data?.order_detail?.map((value,key) => {

              return (
                <Grid key={key} container={true} items xs={12}> 
                  <Grid item xs={6}>
                    <p>{value.product_name}</p>
                  </Grid>
                  <Grid item xs={2}>
                    <p>${value.atz_selling_price}</p>
                  </Grid>
                  <Grid item xs={2}>
                    <p>{value.order_detail_quantity}</p>
                  </Grid>
                  <Grid item xs={2}>
                    <p>${value.order_detail_net_price}</p>
                  </Grid>
                </Grid>
            )

          }) 
          }
          </Grid>


            {/* subtotal grid */}
            <Grid item xs={6}></Grid>
            <Grid item xs={2}></Grid>
            <Grid item xs={2}>
              <div className="order-subtotal">
                <ul>
                  <li>
                    <p>Subtotal</p>
                  </li>
                  <li>
                    <p>Tax</p>
                  </li>
                  <li>
                    <p>Discount</p>
                  </li>
                  <li>
                    <p className="bold-li">Total</p>
                  </li>
                </ul>
              </div>
            </Grid>
            <Grid item xs={2}>
              <div className="order-subtotal">
                <ul>
                  <li>
                    <p>$ { order_data?.order?.total_price }</p>
                  </li>
                  <li>
                    <p>${ order_data?.order?.tax_amount }</p>
                  </li>
                  <li>
                    <p>${ order_data?.order?.coupon_amount }</p>
                  </li>
                  <li>
                    <p className="bold-li">${ order_data?.order?.net_amount_to_pay }</p>
                  </li>
                </ul>
              </div>
            </Grid>
          </Grid>
        </Container>
      </Container>
    </MainBoard>
  )
}

export default OrderDetail
