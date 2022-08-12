import PropTypes from 'prop-types'
import React, { useEffect } from "react";
import {
  makeStyles,
  Box,
  Typography,
  IconButton,
  Popover,
  TextField,
  InputLabel,
  Button
} from "@material-ui/core";
import red from "@material-ui/core/colors/red";
import { fade } from "@material-ui/core/styles/colorManipulator";
import EditIcon from "@material-ui/icons/Edit";
import CloseIcon from "@material-ui/icons/Close";

const useStyle = makeStyles({
  paper: {
    minWidth: 250
  },
  icon: {
    fontSize: 10
  },
  editIcon: {
    fontSize: 20
  },
  popoverContainer: {
    position: "relative"
  },
  popoverCloseIcon: {
    position: "absolute",
    top: 0,
    right: 0
  },
  errorButton: {
    color: red[500],
    borderColor: fade(red[500], 0.5),
    "&:hover": {
      backgroundColor: fade(red[500], 0.08),
      borderColor: red[500]
    }
  },
  labelClass:{
    marginLeft: -10
  }
});

const InlineEditor = ({ labelText, variant, value, onConfirmChange }) => {
  const [editMode, setEditMode] = React.useState(false);
  const [internalValue, setInternalValue] = React.useState(value);

  const classes = useStyle();
  const typoRef = React.useRef();

  useEffect(() => {
    setInternalValue(value);
  }, [value]);

  const handleClick = () => {
    setEditMode(!editMode);
  };
  const handleClickConfirm = () => {
    setEditMode(!editMode);
    onConfirmChange(internalValue);
  };

  const handleChange = ev => {

    if(ev.target.value == "") {
        alert("Feild can not be blank.");
        return false;
    } else {
        setInternalValue(ev.target.value);
    }
  };
  return (
    <Box display="flex" flexDirection="row" alignItems="center">
      {labelText && (
        <Box pr={1} >
          <InputLabel>{labelText}</InputLabel>
        </Box>
      )}
      <Box pr={1}>
        <Typography ref={typoRef} variant={variant} className={classes.labelClass}>
          {value}
        </Typography>

        <Popover
          classes={{ paper: classes.paper }}
          open={editMode}
          anchorEl={typoRef.current}
          anchorOrigin={{ vertical: "top", horizontal: "center" }}
          transformOrigin={{ vertical: "top", horizontal: "center" }}
        >
          <Box
            p={0.5}
            display="flex"
            flexDirection="column"
            className={classes.popoverContainer}
          >
            <Box
              mt={0.5}
              mr={0.5}
              display="flex"
              width="100%"
              justifyContent="flex-end"
              className={classes.popoverCloseIcon}
            >
              <IconButton key="close" size="small" onClick={handleClick}>
                <CloseIcon className={classes.icon} />
              </IconButton>
            </Box>
            <Box p={1}>
                
              <TextField
                label="Text to edit"
                fullWidth
                variant="standard"
                value={internalValue}
                onChange={handleChange}
              />
            </Box>
            <Box p={1} display="flex" justifyContent="space-between">
              <Button
                color="primary"
                size="small"
                variant="outlined"
                onClick={handleClickConfirm}
              >
                Confirm
              </Button>
              <Button
                classes={{
                  outlined: classes.errorButton
                }}
                size="small"
                variant="outlined"
                onClick={handleClick}
              >
                Cancel
              </Button>
            </Box>
          </Box>
        </Popover>
      </Box>
      <Box>
        <IconButton size="small" color="primary" onClick={handleClick}>
          <EditIcon className={classes.editIcon} />
        </IconButton>
      </Box>
    </Box>
  );
};

export default InlineEditor;

InlineEditor.propTypes = {
    labelText: PropTypes.string,
    variant: PropTypes.string,
    value: PropTypes.string,
    onConfirmChange: PropTypes.func
}