import React, { Component } from "react";
import web3 from "./web3";
import contract from "./contract-h";
import "./App.css";
import { Route } from "react-router-dom";
import HomeA from "./pages/HomeA";
import HomeM from "./pages/HomeM";
import HomeD from "./pages/HomeD";
import HomeU from "./pages/HomeU";
import addDoc from "./pages/modConsole/addDoctor";
import addPat from "./pages/modConsole/addPatient";
import editDoc from "./pages/modConsole/editDoctor";
import editPat from "./pages/modConsole/editPatient";
import remDoc from "./pages/modConsole/removeDoctor";
import enbDoc from "./pages/modConsole/enableDoctor";
import presBro from "./pages/docConsole/presBrowser";
import presView from "./pages/docConsole/presViewer";
import presBro2 from "./pages/patConsole/presBrowser";
import presView2 from "./pages/patConsole/presViewer";

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
            // console.log(user);
            if (user) this.setState({ userType: 3 });
            else if (!user) {
                user = await contract.methods.admin().call();
                // console.log(user);
                if (user === this.state.account) this.setState({ userType: 1 });
                else this.setState({ userType: 9 });
            }
        }
    }

    render() {
        return (
            <div className="App">
                <h1>{this.state.contractName}</h1>
                <h2>Account - {this.state.account}</h2>
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
                <Route exact path="/addPatient" component={addPat}></Route>
                <Route exact path="/editPatient" component={editPat}></Route>
                <Route exact path="/addDoctor" component={addDoc}></Route>
                <Route exact path="/editDoctor" component={editDoc}></Route>
                <Route exact path="/removeDoctor" component={remDoc}></Route>
                <Route exact path="/enableDoctor" component={enbDoc}></Route>
                <Route exact path="/presBrowser" component={presBro}></Route>
                <Route
                    exact
                    path="/presViewer/:presID"
                    component={presView}
                ></Route>
                <Route
                    exact
                    path="/presBrowser/:presID"
                    component={presBro2}
                ></Route>
                <Route
                    exact
                    path="/presViewer2/:presID"
                    component={presView2}
                ></Route>
            </div>
        );
    }
}

export default App;
