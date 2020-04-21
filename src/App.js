import React, { Component } from "react";
import web3 from "./web3";
import contract from "./contract";
import "./App.css";
import { Route } from "react-router-dom";
import HomeA from "./pages/HomeA";
import HomeM from "./pages/HomeM";
import HomeD from "./pages/HomeD";
import HomeU from "./pages/HomeU";

class App extends Component {
    state = {
        account: "0x000",
        contractName: "Unknown Hospital",
        userType: 0,
    };

    async componentDidMount() {
        await window.ethereum.enable();
        const accounts = await web3.eth.getAccounts();
        const contractName = await contract.methods.hospitalName().call();
        this.setState({ account: accounts[0], contractName });
        this.getUserType();
    }

    async getUserType() {
        let user = await contract.methods.moderators(this.state.account).call();
        if (user) this.setState({ userType: 2 });
        else if (!user) {
            user = await contract.methods.doctors(this.state.account).call();
            console.log(user);
            if (user) this.setState({ userType: 3 });
            else if (!user) {
                user = await contract.methods.admin().call();
                console.log(user);
                if (user === this.state.account) this.setState({ userType: 1 });
                else this.setState({ userType: 9 });
            }
        }
    }

    render() {
        return (
            <div className="App">
                <h1>Account - {this.state.account}</h1>
                <Route
                    exact
                    path="/"
                    component={
                        this.state.userType === 1
                            ? HomeA
                            : this.state.userType === 2
                            ? HomeM
                            : this.state.userType === 3
                            ? HomeD
                            : HomeU
                    }
                ></Route>
            </div>
        );
    }
}

export default App;