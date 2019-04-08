import React, { Component } from "react"
import { Menu, Container } from "semantic-ui-react"

export default class Header extends Component {
  render() {
    return (
      <Container>
        <Menu secondary size="massive">
          <Menu.Item>
            <img
              src="https://www.shareicon.net/data/2016/09/09/827451_birthday_512x512.png"
              alt="logo"
            />
            <Menu.Item name="PRESENT" />
          </Menu.Item>
        </Menu>
      </Container>
    )
  }
}
