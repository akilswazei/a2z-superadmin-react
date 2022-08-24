/* eslint-disable react/prop-types */
import { cond } from 'lodash'
import React, { useEffect, useState } from 'react'
import ImageUploader from 'react-images-upload'
import { useDispatch, useSelector } from 'react-redux'
import { addMedia, getMedias } from 'src/services/MediaService'
//material UI imports
import Modal from '@mui/material/Modal'
import Box from '@mui/material/Box'
import { Grid } from '@material-ui/core'
import Radio from '@mui/material/Radio'
import RadioGroup from '@mui/material/RadioGroup'
import FormControlLabel from '@mui/material/FormControlLabel'
import FormControl from '@mui/material/FormControl'

function ImageUpload(props) {
  const getState = useSelector((state) => state)
  const [mdls, setMdls] = useState([])
  const [pictures, setPictures] = useState({})
  const dispatch = useDispatch()

  const {
    userSignin: { userInfo },
    media: { mediaOpen, fileFields, fileInput },
  } = getState

  function onDrop(pictureFiles, pictureDataURLs) {
    setPictures(pictureDataURLs)
  }
  async function UploadMedia() {
    // upload api
    //imageUploader.clearPictures()
    console.log(pictures)
    let result = await addMedia(userInfo, { image: pictures })
    console.log(...result.data.media)
    setMdls([...mdls, ...result.data.media])
  }
  function Set(fid, url) {
    dispatch({ type: 'MediaOpen', payload: true })
    dispatch({ type: 'UpdateFileField', payload: { [fileInput]: { eid: fid, file: url } } })
  }
  const handleSet = () => {
    dispatch({ type: 'MediaOpen', payload: false })
  }
  function handleMediaClose() {
    dispatch({ type: 'MediaOpen', payload: false })
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
      if (mediaOpen == true) {
        let fn = (async function () {
          let mediadata = await getMedias(userInfo)
          setMdls(mediadata.data.data)
        })()
      }
    }
  }, [mediaOpen])

  const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-37%, -50%)',
    width: '80%',
    height: '90vh',
    bgcolor: 'background.paper',
    border: '1px solid #000',
    boxShadow: 24,
    p: 4,
    overflowY: 'scroll',
  }

  return (
    <>
      {console.log('mucore:' + mdls)}
      <Modal
        open={mediaOpen}
        onClose={handleMediaClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style} className="">
          <h3>Image Upload</h3>
          <div style={{ height: '80vh', width: '100%' }} className="py-2">
            <ImageUploader
              key="imup"
              withIcon={false}
              withPreview={true}
              buttonText="Choose images"
              onChange={onDrop}
              imgExtension={['.jpg', '.gif', '.png', '.gif', '.jpeg', '.pdf']}
              maxFileSize={5242880}
              sendData={pictures}
              name="imagepicker"
            />
            <div className="upload-btn">
              <button onClick={(e) => UploadMedia(e)}>Upload</button>
            </div>

            <form className="setImageForm" onSubmit={handleSet}>
              <Grid container>
                {mdls?.map((value, key) => {
                  return (
                    <>
                      <Grid item xs={3} key={key} className="setImageGrid">
                        <input
                          type="radio"
                          id={value.url}
                          name="image"
                          value={value.url}
                          onClick={(e) => Set(value.eid, value.file)}
                        />
                        <div className="imageSelect">
                          <a onClick={(e) => Set(value.eid, value.file)}>
                            <img src={value.file} />
                          </a>
                        </div>
                      </Grid>
                    </>
                  )
                })}
                <Grid item xs={12}>
                  <div className="set-btn">
                    <button>Set</button>
                  </div>
                </Grid>
              </Grid>
            </form>
          </div>
        </Box>
      </Modal>
    </>
  )
}
export default ImageUpload
