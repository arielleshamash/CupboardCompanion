import React from "react";
import {Component} from "react";
import Cupboard from "../Cupboard/Cupboard"
import Wrapper from '../Wrapper/index';


class Home extends Component {
  state = {
    data: null
  };

  componentDidMount() {
    // Call our fetch function below once the component mounts
    this.callBackendAPI()
      .then(res => {
        //console.log(res);
        this.setState({ data: res.express });
        console.log(this.state);
      })
      .catch(err => console.log(err));
  }
  // Fetches our GET route from the Express server. (Note the route we are fetching matches the GET route from server.js
  callBackendAPI = async () => {
    const response = await fetch("/express_backend");
    const body = await response.json();

    if (response.status !== 200) {
      throw Error(body.message);
    }
    return body;
  };

  render() {
    return (
      <div className="App">
        <Wrapper>
          <div className="gauge-container">
            {this.state &&
              this.state.data &&
              this.state.data.map(sensor => {
                return (
                  <Cupboard
                    data={Math.round(sensor.reading)}
                    product={sensor.product}
                  />
                );
              })}
          </div>
        </Wrapper>
      </div>
    );
  }
}

export default Home;