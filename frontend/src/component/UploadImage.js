import React, { Component } from "react"
import { Dimmer, Loader, Header, Icon, Segment, Image } from "semantic-ui-react"
import axios from "axios"

export default class UploadImage extends Component {
  state = {
    isUploaded: false,
    imagePreviewUrl: "",
    isAnalyzing: false
  }
  handleOnChange(e) {
    this.setState({
      isUploaded: true,
      isAnalyzing: true
    })
    let reader = new FileReader()
    let file = e.target.files[0]

    const fd = new FormData()
    fd.append("image", file, file.name)
    axios.post("http://localhost:5555/upload", fd).then(res => {
      console.log(res)
    })

    reader.onloadend = () => {
      this.setState({
        imagePreviewUrl: reader.result
      })
    }
    reader.readAsDataURL(file)
  }
  render() {
    const { isUploaded, isAnalyzing, imagePreviewUrl } = this.state
    return (
      <Segment placeholder style={{ height: 652 }}>
        {isUploaded && (
          <Image
            src={imagePreviewUrl}
            fluid
            style={{
              height: "100%",
              width: "100%",
              objectFit: "contain"
            }}
          />
        )}
        {!isUploaded && (
          <div
            style={{
              display: "flex",
              flexDirection: "column"
            }}
          >
            <Header icon>
              <Icon name="file image outline" style={{ height: "auto" }} />
              Paperless Record of Entry for Students, Enabling Natural Teaching
            </Header>
            <label
              htmlFor="embedimageinput"
              className="ui medium teal icon right labeled button"
            >
              <Icon name="upload" />
              Select a image
            </label>
            <input
              onChange={this.handleOnChange.bind(this)}
              hidden
              type="file"
              id="embedimageinput"
            />
            <p
              style={{
                textAlign: "center",
                fontSize: "0.8em",
                marginTop: "1em"
              }}
            >
              *The maximum number of persons per image is limited to 15 persons.
            </p>
          </div>
        )}
        <Dimmer active={isAnalyzing}>
          <Loader content="Analyzing" />
        </Dimmer>
      </Segment>
    )
  }
}
