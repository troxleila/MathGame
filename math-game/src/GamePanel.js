import React from "react";
import Router from "react-router-dom";

class GamePanel extends React.Component {
  render() {
    <Router>
      <table>
        <td>
          <tr>
            <Route path="/addition" component={<Game operator="addition" />}>
              +
            </Route>
          </tr>
          <tr>
            <Route
              path="/multiplication"
              component={<Game operator="multiplication" />}
            >
              x
            </Route>
          </tr>
        </td>
        <td>
          <tr>
            <Route
              path="/subtraction"
              component={<Game operator="subtraction" />}
            >
              -
            </Route>
          </tr>
          <tr>
            <Route path="/division" component={<Game operator="division" />}>
              &division;
            </Route>
          </tr>
        </td>
      </table>
    </Router>;
  }
}
