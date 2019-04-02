import React from "react"
import { Table, Button, Icon } from "semantic-ui-react"

const TableResult = () => (
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
          >
            <Button.Content hidden>Export</Button.Content>
            <Button.Content visible>
              <Icon name="download" />
            </Button.Content>
          </Button>
        </Table.HeaderCell>
      </Table.Row>
    </Table.Header>

    <Table.Body>
      <Table.Row>
        <Table.Cell collapsing>5831078221</Table.Cell>
        <Table.Cell>Siraphat Gruysiriwong</Table.Cell>
      </Table.Row>
      <Table.Row>
        <Table.Cell>5831078221</Table.Cell>
        <Table.Cell>Siraphat Gruysiriwong</Table.Cell>
      </Table.Row>
      <Table.Row>
        <Table.Cell>5831078221</Table.Cell>
        <Table.Cell>Siraphat Gruysiriwong</Table.Cell>
      </Table.Row>
      <Table.Row>
        <Table.Cell>5831078221</Table.Cell>
        <Table.Cell>Siraphat Gruysiriwong</Table.Cell>
      </Table.Row>
      <Table.Row>
        <Table.Cell>5831078221</Table.Cell>
        <Table.Cell>Siraphat Gruysiriwong</Table.Cell>
      </Table.Row>{" "}
      <Table.Row>
        <Table.Cell>5831078221</Table.Cell>
        <Table.Cell>Siraphat Gruysiriwong</Table.Cell>
      </Table.Row>{" "}
      <Table.Row>
        <Table.Cell>5831078221</Table.Cell>
        <Table.Cell>Siraphat Gruysiriwong</Table.Cell>
      </Table.Row>{" "}
      <Table.Row>
        <Table.Cell>5831078221</Table.Cell>
        <Table.Cell>Siraphat Gruysiriwong</Table.Cell>
      </Table.Row>{" "}
      <Table.Row>
        <Table.Cell>5831078221</Table.Cell>
        <Table.Cell>Siraphat Gruysiriwong</Table.Cell>
      </Table.Row>{" "}
      <Table.Row>
        <Table.Cell>5831078221</Table.Cell>
        <Table.Cell>Siraphat Gruysiriwong</Table.Cell>
      </Table.Row>{" "}
      <Table.Row>
        <Table.Cell>5831078221</Table.Cell>
        <Table.Cell>Siraphat Gruysiriwong</Table.Cell>
      </Table.Row>{" "}
      <Table.Row>
        <Table.Cell>5831078221</Table.Cell>
        <Table.Cell>Siraphat Gruysiriwong</Table.Cell>
      </Table.Row>
    </Table.Body>
  </Table>
)

export default TableResult
