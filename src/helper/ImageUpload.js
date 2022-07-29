/* eslint-disable react/prop-types */
import { cond } from 'lodash'
import React, { useEffect, useState } from 'react'
import ImageUploader from 'react-images-upload'
import { useDispatch, useSelector } from 'react-redux'
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
    media: { mediaOpen, fileFields, fileInput },
  } = getState

  function onDrop(pictureFiles, pictureDataURLs) {
    setPictures(pictureDataURLs)
  }
  function UploadMedia() {
    // upload api
    //imageUploader.clearPictures()
    setMdls([...mdls, { id: Math.floor(Math.random() * 1000), url: pictures }])
  }
  function Set(fid, url) {
    dispatch({ type: 'MediaOpen', payload: true })
    dispatch({ type: 'UpdateFileField', payload: { [fileInput]: { id: fid, url: url } } })
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
        setMdls([
          { id: 1, url: 'https://upload.wikimedia.org/wikipedia/commons/4/41/Sunflower_from_Silesia2.jpg' },
          { id: 2, url: 'https://onlinejpgtools.com/images/examples-onlinejpgtools/sunflower.jpg' },
          { id: 4, url: 'https://upload.wikimedia.org/wikipedia/commons/4/41/Sunflower_from_Silesia2.jpg' },
          { id: 5, url: 'https://onlinejpgtools.com/images/examples-onlinejpgtools/sunflower.jpg' },
          { id: 11, url: 'https://upload.wikimedia.org/wikipedia/commons/4/41/Sunflower_from_Silesia2.jpg' },
          { id: 21, url: 'https://onlinejpgtools.com/images/examples-onlinejpgtools/sunflower.jpg' },
          { id: 41, url: 'https://upload.wikimedia.org/wikipedia/commons/4/41/Sunflower_from_Silesia2.jpg' },
          { id: 51, url: 'https://onlinejpgtools.com/images/examples-onlinejpgtools/sunflower.jpg' },
          { id: 12, url: 'https://upload.wikimedia.org/wikipedia/commons/4/41/Sunflower_from_Silesia2.jpg' },
          { id: 22, url: 'https://onlinejpgtools.com/images/examples-onlinejpgtools/sunflower.jpg' },
          { id: 42, url: 'https://upload.wikimedia.org/wikipedia/commons/4/41/Sunflower_from_Silesia2.jpg' },
          { id: 52, url: 'https://onlinejpgtools.com/images/examples-onlinejpgtools/sunflower.jpg' },
        ])
        console.log('mucore:' + mdls)
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
              singleImage="true"
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
                          onClick={(e) => Set(value.id, value.url)}
                        />
                        <div className="imageSelect">
                          <a onClick={(e) => Set(value.id, value.url)}>
                            <img src={value.url} />
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
