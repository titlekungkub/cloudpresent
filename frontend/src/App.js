import React, { Component } from "react"
import UploadImage from "./component/UploadImage"
import Header from "./component/Header"
import TableResult from "./component/Table"
import { Grid } from "semantic-ui-react"

class App extends Component {
  render() {
    return (
      <div>
        <Header />
        <Grid>
          <Grid.Column width={10}>
            <UploadImage />
          </Grid.Column>
          <Grid.Column width={6}>
            <TableResult />
          </Grid.Column>
        </Grid>
      </div>
    )
  }
}

export default App
