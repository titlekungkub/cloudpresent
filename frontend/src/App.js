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
        <div
          style={{
            display: "flex",
            justifyContent: "center"
          }}
        >
          <Grid
            style={{
              minWidth: "80%"
            }}
          >
            <Grid.Column width={10}>
              <UploadImage />
            </Grid.Column>
            <Grid.Column width={6}>
              <TableResult />
            </Grid.Column>
          </Grid>
        </div>
      </div>
    )
  }
}

export default App
