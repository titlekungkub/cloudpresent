import React, { Component } from "react"
import { Table, Button, Icon } from "semantic-ui-react"

export default class Header extends Component {
  constructor(props) {
    super(props)
    this.state = {
      results: [
        // {
        //   id: "5831071821",
        //   name: "Supanat Limjitti"
        // },
        // {
        //   id: "5831078221",
        //   name: "Siraphat Gruysiriwong"
        // }
      ]
    }
  }
  renderResults(results) {
    return results.map((res, idx) => {
      return (
        <Table.Row key={idx}>
          <Table.Cell collapsing>{res.id}</Table.Cell>
          <Table.Cell>{res.name}</Table.Cell>
        </Table.Row>
      )
    })
  }
  handleOnClick = () => console.log("Button received click with mouse")
  render() {
    const { results } = this.state
    return (
      <Table celled striped>
        <Table.Header>
          <Table.Row>
            <Table.HeaderCell colSpan="3">
              <span>Result</span>
              <Button
                animated="vertical"
                inverted
                floated="right"
                primary
                size="small"
                onClick={this.handleOnClick}
              >
                <Button.Content hidden>Export</Button.Content>
                <Button.Content visible>
                  <Icon name="download" />
                </Button.Content>
              </Button>
            </Table.HeaderCell>
          </Table.Row>
        </Table.Header>
        <Table.Body>{this.renderResults(results)}</Table.Body>
      </Table>
    )
  }
}
