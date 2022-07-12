import PropTypes from 'prop-types'
import React from 'react';
import PersonAddAltIcon from '@mui/icons-material/PersonAddAlt'

const Trigger = ({ triggerText, buttonRef, showModal }) => {
  return (
    <button className="custom-blue-btn m-2 center modal-button" ref={buttonRef} onClick={showModal}>
      Add Lead<span>{<PersonAddAltIcon />}</span>
    </button>
  );
};

Trigger.propTypes = {
    triggerText: PropTypes.string,
    buttonRef: PropTypes.string,
    showModal: PropTypes.string
}

export default Trigger;