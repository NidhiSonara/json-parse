import React, { useEffect, useState } from "react";
import axios from "axios";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
    this.componentDidMount = this.componentDidMount.bind(this);
  }
  componentDidMount() {
    this._isMounted = true;
    const Data = { Service: "" };
    const additionalData = { data: [{ mainService: [{ subService: "" }] }] };
    const purchaseData = { data: [{ mainService: [{ subService: "" }] }] };
    const purchased_office_services = { data: "" };

    axios
      .get("https://api.jsonbin.io/b/5efdf1000bab551d2b6ab1c9/1")
      // .get("https://91bc18c07855.ngrok.io/")
      .then((res) => {
        additionalData.data = [];
        purchaseData.data = [];
        Data.Service = res.data.data.purchased_services;
        for (let i = 0; i < Data.Service.length; i++) {
          purchased_office_services.data =
            Data.Service[i].purchased_office_template.purchased_office_services;

          additionalData.data.push({ mainService: [] });
          purchaseData.data.push({ mainService: [] });
          for (let j = 0; j < purchased_office_services.data.length; j++) {
            if (purchased_office_services.data[j].service_selected === null) {
              additionalData.data[i].mainService.push({ subService: j });
            } else {
              purchaseData.data[i].mainService.push({ subService: j });
            }
          }
        }
        this.setState({ addData: additionalData.data });
        this.setState({ purData: purchaseData.data });
      })
      .catch((err) => {
        console.log(err);
      });
  }

  displayPur(array) {
    const c =
      array && array.purData ? (
        <ol>
          {array.purData.map((ms) =>
            ms.mainService.length > 0 ? (
              <li>
                {" "}
                mainService
                <ul>
                  {ms.mainService.map((sub) => (
                    <li>subService: {sub.subService + 1}</li>
                  ))}
                </ul>
              </li>
            ) : (
              <li>mainService</li>
            )
          )}
        </ol>
      ) : (
        "null"
      );
    return c;
  }
  displayAdd(array) {
    const c =
      array && array.addData ? (
        <ol>
          {array.addData.map((ms) =>
            ms.mainService.length > 0 ? (
              <li>
                {" "}
                mainService
                <ul>
                  {ms.mainService.map((sub) => (
                    <li>subService: {sub.subService + 1}</li>
                  ))}
                </ul>
              </li>
            ) : (
              <li>mainService</li>
            )
          )}
        </ol>
      ) : (
        "null"
      );
    return c;
  }

  render() {
    return (
      <>
        <h3>Purchased Services</h3>
        <h4>{this.displayPur(this.state)}</h4>
        <h3>Additional Service</h3>
        <h4>{this.displayAdd(this.state)}</h4>
      </>
    );
  }
}
export default App;
