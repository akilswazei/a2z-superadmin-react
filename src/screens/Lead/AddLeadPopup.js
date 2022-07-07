import PropTypes from 'prop-types'
import React, { Component } from 'react';
import { Modal } from '../../Modal/AddLeadModal';
import TriggerButtonAddLead from 'src/screens/Lead/TriggerButtonAddLead';

export class AddLeadPopup extends Component {
  state = { isShown: false };
  showModal = () => {
    this.setState({ isShown: true }, () => {
      this.closeButton.focus();
    });
    this.toggleScrollLock();
  };
  closeModal = () => {
    this.setState({ isShown: false });
    this.TriggerButtonAddLead.focus();
    this.toggleScrollLock();
  };
  onKeyDown = (event) => {
    if (event.keyCode === 27) {
      this.closeModal();
    }
  };
  onClickOutside = (event) => {
    if (this.modal && this.modal.contains(event.target)) return;
    this.closeModal();
  };

  toggleScrollLock = () => {
    document.querySelector('html').classList.toggle('scroll-lock');
  };

  render() {
    return (
      <React.Fragment>
        <TriggerButtonAddLead
          showModal={this.showModal}
          buttonRef={(n) => (this.TriggerButtonAddLead = n)}
          triggerText={this.props.triggerText}
        />
        {this.state.isShown ? (
          <Modal
            onSubmit={this.props.onSubmit}
            modalRef={(n) => (this.modal = n)}
            buttonRef={(n) => (this.closeButton = n)}
            closeModal={this.closeModal}
            onKeyDown={this.onKeyDown}
            onClickOutside={this.onClickOutside}
          />
        ) : null}
      </React.Fragment>
    );
  }
}

AddLeadPopup.propTypes = {
    triggerText: PropTypes.string,
    onSubmit: PropTypes.string
}

export default AddLeadPopup;
