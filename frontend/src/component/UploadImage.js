import React from "react"
import { Button, Header, Icon, Segment } from "semantic-ui-react"

const UploadImage = () => (
  <Segment placeholder style={{ minHeight: 652 }}>
    <Header icon>
      <Icon name="file image outline" style={{ height: "auto" }} />
      Paperless Record of Entry for Students, Enabling Natural Teaching
    </Header>
    <Button color="teal" icon labelPosition="right">
      Select a photo
      <Icon name="upload" />
    </Button>
    <p style={{ textAlign: "center", fontSize: "0.8em", marginTop: "1em" }}>
      the maximum number of persons per image is limited to 15 persons
    </p>
  </Segment>
)

export default UploadImage
