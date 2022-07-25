/* eslint-disable react/prop-types */
import { cond } from 'lodash'
import React, { useEffect, useState } from 'react'
import ImageUploader from 'react-images-upload'
import { useDispatch, useSelector } from 'react-redux'
import Modal from '@mui/material/Modal'
import Box from '@mui/material/Box'

import { Container, Button, Grid } from '@material-ui/core'

function ImageUpload(props){
  const getState = useSelector((state) => state)
  const [mdls,setMdls] = useState([])
  const [pictures, setPictures] = useState({})
  const dispatch = useDispatch()

  const {
    media: {mediaOpen,fileFields,fileInput},
  } = getState

  
  function onDrop(pictureFiles, pictureDataURLs) { 
  setPictures(pictureDataURLs)
  }
  function UploadMedia(){
    // upload api
    //imageUploader.clearPictures()
    setMdls([...mdls,{id: 3, url: pictures}]);
  }
  function SetNClose(fid,url){
    dispatch({ type: "MediaOpen", payload: false });
    dispatch({ type: "UpdateFileField", payload: {[fileInput]: {id: fid, url: url }} });
  }

  function handleMediaClose(){
    dispatch({ type: "MediaOpen", payload: false });
  }
  // function triggerInput(enteredName, enteredValue) {
  //   const input = document.getElementById(enteredName);
  //   const lastValue = input.value;
  //   input.value = enteredValue;
  //   const event = new Event("input", { bubbles: true });
  //   const tracker = input._valueTracker;
  //   if (tracker) {
  //     tracker.setValue(lastValue);
  //   }
  //   input.dispatchEvent(event);
  // }
    useEffect(() => {
      {    
        if(mediaOpen==true){
          setMdls([{id:1, url: 'https://upload.wikimedia.org/wikipedia/commons/4/41/Sunflower_from_Silesia2.jpg'},{id:2, url: 'https://onlinejpgtools.com/images/examples-onlinejpgtools/sunflower.jpg'}])
          console.log("mucore:"+mdls)
        }
      }
    }, [mediaOpen])

    const style = {
      position: 'absolute',
      top: '50%',
      left: '50%',
      transform: 'translate(-30%, -50%)',
      width: 400,
      bgcolor: 'background.paper',
      border: '1px solid #000',
      boxShadow: 24,
      p: 4,
    }

    return (
      <>

      <Modal
        open={mediaOpen}
        onClose={handleMediaClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style} className="w-50">
          <h3>Payout History</h3>     
          <div style={{ height: '80vh', width: '100%' }} className="py-2"> 
              <ImageUploader
                key="imup"
                withIcon={false}
                withPreview={true}
                buttonText="Choose images"
                onChange={onDrop}
                imgExtension={['.jpg', '.gif', '.png', '.gif', '.jpeg','.pdf']}
                maxFileSize={5242880}
                sendData={pictures}
                name="imagepicker"
                singleImage="true"
              /> 
              <button onClick={(e) => UploadMedia(e)}> upload</button>
              { mdls?.map((value, key) => {
                  return (  <a key="dfdsfs" onClick={(e) => SetNClose(value.id,value.url)}><img width="50"  src={value.url} /></a>
                  )
              }) }
            </div>    
          </Box>
        </Modal>
        </>

    )
  
}
export default ImageUpload