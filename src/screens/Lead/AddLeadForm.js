import PropTypes from 'prop-types'
import React from 'react';

export const AddLeadForm = ({ onSubmit }) => {
  return (
    <form onSubmit={onSubmit}>

        <div className="row">
            <div className="col-md-3">
                <div className="form-group">
                    <label htmlFor="lead_name">Name:</label>
                    <input type="text" className="form-control" name="lead_name" id="lead_name" placeholder="Please enter lead name" />
                </div>
            </div>

            <div className="col-md-3">
                <div className="form-group">
                    <label htmlFor="lead_email">Email:</label>
                    <input type="email" className="form-control" name="lead_email" id="lead_email" placeholder="Please enter email" />
                </div>
            </div>

            <div className="col-md-3">
                <div className="form-group">
                    <label htmlFor="lead_title">Title:</label>
                    <input type="email" className="form-control" name="lead_title" id="lead_title" placeholder="Please enter title" />
                </div>
            </div>

            <div className="col-md-3">
                <div className="form-group">
                    <label htmlFor="email">Phone:</label>
                    <input type="email" className="form-control" name="lead_phone" id="lead_phone" placeholder="Please enter phone number" />
                </div>
            </div>
        </div>

        <div className="row py-3">
            <div className="col-md-3">
                <div className="form-group">
                    <label htmlFor="email">Fax:</label>
                    <input type="email" className="form-control" name="lead_fax" id="lead_fax" placeholder="Please enter fax number" />
                </div>
            </div>

            <div className="col-md-3">
                <div className="form-group">
                    <label htmlFor="email">Address:</label>
                    <input type="email" className="form-control" name="lead_address" id="lead_address" placeholder="Please enter address" />
                </div>
            </div>            
        </div>

        <div className="row py-3">
            <button className="custom-blue-btn m-2">
                Close<span></span>
            </button>
        </div>

    </form>
  );
};

AddLeadForm.propTypes = {
    onSubmit: PropTypes.string
}

export default AddLeadForm;