import React, { Component } from "react"
import UploadImage from "./component/UploadImage"
import Header from "./component/Header"
import TableResult from "./component/Table"
import { Grid } from "semantic-ui-react"

class App extends Component {
  state = {
    results: []
  }
  onClickUpload(results) {
    this.setState({ results: results })
  }
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
              width: "80%"
            }}
          >
            <Grid.Column width={10}>
              <UploadImage onClickUpload={this.onClickUpload.bind(this)} />
            </Grid.Column>
            <Grid.Column width={6}>
              <TableResult results={this.state.results} />
            </Grid.Column>
          </Grid>
        </div>
      </div>
    )
  }
}

export default App
