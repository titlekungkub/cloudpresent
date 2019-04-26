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

    reader.onloadend = () => {
      this.setState({
        imagePreviewUrl: reader.result
      })
      axios
        .post(
          // replace this with AWS API Gateway URL
          "API_Gateway_URL",
          JSON.stringify({ image_data: this.state.imagePreviewUrl })
        )
        .then(res => {
          let checklist = res.data.map(item => ({ name: item }))
          this.props.onClickUpload(checklist)
          this.setState({
            isAnalyzing: false
          })
        })
    }
    reader.readAsDataURL(file)
  }
  render() {
    const { isUploaded, isAnalyzing, imagePreviewUrl } = this.state
    return (
      <Segment placeholder style={{ height: 652, alignItems: "center" }}>
        {isUploaded && (
          <Image
            src={imagePreviewUrl}
            fluid
            style={{
              height: "90%",
              width: "90%",
              objectFit: "contain",
              marginBottom: "10px"
            }}
          />
        )}
        <div
          style={{
            display: "flex",
            flexDirection: "column"
          }}
        >
          {!isUploaded && (
            <Header icon>
              <Icon name="file image outline" style={{ height: "auto" }} />
              Paperless Record of Entry for Students, Enabling Natural Teaching
            </Header>
          )}
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
          {!isUploaded && (
            <p
              style={{
                textAlign: "center",
                fontSize: "0.8em",
                marginTop: "1em"
              }}
            >
              *The maximum number of persons per image is limited to 15 persons.
            </p>
          )}
        </div>
        <Dimmer active={isAnalyzing}>
          <Loader content="Analyzing" />
        </Dimmer>
      </Segment>
    )
  }
}
