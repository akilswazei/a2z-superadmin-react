import React, { useEffect } from 'react'
import ImageUploader from 'react-images-upload'

export class ImageUpload extends React.Component {
  constructor(props) {
    super(props)
    this.state = { pictures: [] }
    this.onDrop = this.onDrop.bind(this)
  }

  onDrop(pictureFiles, pictureDataURLs) {
    this.setState({
      pictures: this.state.pictures.concat(pictureFiles),
    })
  }

  render() {
    return (
      <>
        <ImageUploader
          withIcon={false}
          withPreview={true}
          buttonText="Choose images"
          onChange={this.onDrop}
          imgExtension={['.jpg', '.gif', '.png', '.gif', '.jpeg']}
          maxFileSize={5242880}
          sendData={this.pictures}
        />
      </>
    )
  }
}
