import React, { useEffect, useState } from "react";
import axios from "axios";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      // mainService: [],
      // addData: [],
      // purData: [],
      // subService: []
    };
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
        // console.log(Data.Service);
        for (let i = 0; i < Data.Service.length; i++) {
          purchased_office_services.data =
            Data.Service[i].purchased_office_template.purchased_office_services;

          additionalData.data.push({ mainService: [] });
          purchaseData.data.push({ mainService: [] });
          //  console.log('Data: ',i,purchased_office_services.data)
          for (let j = 0; j < purchased_office_services.data.length; j++) {
            if (purchased_office_services.data[j].service_selected === null) {
              additionalData.data[i].mainService.push({ subService: j });
              // this.setState({ mainService: i, subService: j });
              // this.setState(this.addData.push({ mainService: i, subService: j }))
            } else {
              purchaseData.data[i].mainService.push({ subService: j });
              // this.setState({ mainService: i, subService: j });
              // this.setState(this.purData.push({ mainService: i, subService: j }))
            }
          }
        }
        this.setState({ addData: additionalData.data });
        this.setState({ purData: purchaseData.data });
        // console.log(this.state.purData[0].mainService[0].subService);
        // console.log(this.state.addData[0].mainService);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  displayPur(array){
    const c =  (array&&array.purData) ? 
    <ol>
      {array.purData.map(ms => 
        <li>mainService
          <ul>subService
            {ms.mainService.map(sub => 
              <li>{sub.subService+1}</li>)
            }
          </ul>
        </li>)
      }</ol> : "yes";
    return c;
  }
  displayAdd(array){
    const c =  (array&&array.addData) ? 
    <ol>
      {array.addData.map(ms => 
        <li>mainService
          <ul>subService
            {ms.mainService.map(sub => 
              <li>{sub.subService+1}</li>)
            }
          </ul>
        </li>)
      }</ol> : "yes";
    return c;
  }

  render() {
    return (
      <>
      <h1>hello</h1>
      <h3>Purchase Services</h3>
      <h4>{this.displayPur(this.state)}</h4>
      <h3>Additional Service</h3>
      <h4>{this.displayAdd(this.state)}</h4>
      </>
    );
  }
}
export default App;
