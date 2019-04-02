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
  </Segment>
)

export default UploadImage
