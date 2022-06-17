import { Container } from '@mui/system'
import React from 'react'
import MainBoard from 'src/components/include/MainBoard'
import { Grid } from '@material-ui/core'
import AccessTimeIcon from '@mui/icons-material/AccessTime'
import StorefrontIcon from '@mui/icons-material/Storefront'
import EmailIcon from '@mui/icons-material/Email'
import LocalPhoneIcon from '@mui/icons-material/LocalPhone'
function SubscriptionDetail() {
  const [age, setAge] = React.useState('')
  const handleChange = (event) => {
    setAge(event.target.value)
  }
  return (
    <MainBoard>
      <Container fluid>
        <Container className="p-0 mt-4">
          <h6 className="p-0">Subscription Details</h6>
        </Container>
        <Container className="background-white-theme custom-container-white">
          <div className="subscription-id py-2">
            <h6>{`Subscription #12345`}</h6>
          </div>
          <Grid container>
            <Grid item xs={4}>
              <Grid item xs={12}>
                <div className="subscription-time-detail">
                  <AccessTimeIcon />
                  <p>
                    <span className="date">Tue, Apr 19, 2022, </span>
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
              <div className="subscription-address-details">
                <p className="address-p">A and B Market Plus, Inc,</p>
                <ul>
                  <li>
                    <StorefrontIcon /> <span>MID: #12132</span>
                  </li>
                  <li>
                    <EmailIcon /> <span>example@gmail.com</span>
                  </li>
                  <li>
                    <LocalPhoneIcon /> <span>23122323</span>
                  </li>
                </ul>
                <p>7453 Somewhere raod new Berlin, W122323</p>
              </div>
            </Grid>
            <Grid item xs={4}>
              <div className="btn-div">
                <button className="subscription-status-btn">processing</button>
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

            {/* products listing starts here */}
            <Grid container={true} items xs={12} className="bsubscription-top-bottom product-grid">
              <Grid item xs={6}>
                <p>Hardware equipment</p>
              </Grid>
              <Grid item xs={2}>
                <p>$16</p>
              </Grid>
              <Grid item xs={2}>
                <p>1</p>
              </Grid>
              <Grid item xs={2}>
                <p>$16.56</p>
              </Grid>
            </Grid>
            {/* subtotal grid */}
            <Grid item xs={6}></Grid>
            <Grid item xs={2}></Grid>
            <Grid item xs={2}>
              <div className="subscription-subtotal">
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
              <div className="subscription-subtotal">
                <ul>
                  <li>
                    <p>$16.90</p>
                  </li>
                  <li>
                    <p>$5.00</p>
                  </li>
                  <li>
                    <p>$1.00</p>
                  </li>
                  <li>
                    <p className="bold-li">$20.90</p>
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

export default SubscriptionDetail
