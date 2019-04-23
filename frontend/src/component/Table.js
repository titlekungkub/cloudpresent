import React, { Component } from "react"
import { Table, Button, Icon } from "semantic-ui-react"
import { CSVLink } from "react-csv"

export default class Header extends Component {
  renderResults(results) {
    return results.map((res, idx) => {
      return (
        <Table.Row key={idx}>
          <Table.Cell collapsing>{res.name}</Table.Cell>
        </Table.Row>
      )
    })
  }
  render() {
    const { results } = this.props
    return (
      <Table celled striped>
        <Table.Header>
          <Table.Row>
            <Table.HeaderCell colSpan="3">
              <span>Result</span>
              <CSVLink data={results} filename={"attendance-check.csv"}>
                <Button
                  animated="vertical"
                  inverted
                  floated="right"
                  primary
                  size="small"
                >
                  <Button.Content hidden>Export</Button.Content>
                  <Button.Content visible>
                    <Icon name="download" />
                  </Button.Content>
                </Button>
              </CSVLink>
            </Table.HeaderCell>
          </Table.Row>
        </Table.Header>
        <Table.Body>{this.renderResults(results)}</Table.Body>
      </Table>
    )
  }
}
