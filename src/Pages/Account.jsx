import { Component } from "react";

class Account extends Component {

  componentDidMount(){
    console.log("Mounted");
  }

  render(){
    return (
      <>
        <h1>User Account</h1>
      </>
    );
  }
}

export default Account;