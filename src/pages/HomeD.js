import React, { Component } from "react";
import md5 from "md5";
import web3 from "../web3";
import contract from "../contract-h";
import NavBar from "../components/docNav";

class App extends Component {
    state = {
        message: "",
        color: "",
        dname: "",
        daddress: "",
        presContent: "",
        presPat: "",
    };

    async componentDidMount() {
        const accounts = await web3.eth.getAccounts();
        const dinfo = await contract.methods.doctorsMap(accounts[0]).call();
        this.setState({ dname: dinfo.name, daddress: accounts[0] });
    }

    onNewPresciption = async (event) => {
        event.preventDefault();
        this.setState({
            message: "Waiting on transaction success...",
            color: "tomato",
        });

        const now = new Date().getTime();
        let hash = md5(
            this.state.presContent +
                this.state.presPat +
                this.state.presTime +
                now
        );
        hash = "0x" + hash;
        await contract.methods
            .addNewPrescription(
                hash,
                this.state.daddress,
                this.state.presPat,
                now,
                this.state.presContent
            )
            .send({
                from: this.state.daddress,
            });

        let message = "Added Prescription with ID - " + hash;

        this.setState({ message, color: "green" });
    };

    render() {
        return (
            <div>
                <h1>Doctor's Console</h1>
                <h2>Welcome, {this.state.dname}!</h2>
                <h3 style={{ color: this.state.color }}>
                    {this.state.message}
                </h3>
                <NavBar />
                <div>
                    <form onSubmit={this.onNewPresciption}>
                        <div>
                            <label>Patient ID : </label>
                            <input
                                value={this.state.presPat}
                                onChange={(event) =>
                                    this.setState({
                                        presPat: event.target.value,
                                    })
                                }
                            />
                        </div>
                        <div>
                            <label>Precription Content : </label>
                            <textarea
                                value={this.state.presContent}
                                onChange={(event) =>
                                    this.setState({
                                        presContent: event.target.value,
                                    })
                                }
                            />
                        </div>
                        <button>Save Prescription</button>
                    </form>
                </div>
            </div>
        );
    }
}

export default App;
