import React, { Component } from "react";
import { Redirect } from "react-router-dom";
import { CircularProgress, Button, TextField } from "@material-ui/core";
import web3 from "../../web3";
import NavBar from "../../components/modNav";
import contract from "../../contract-h";

class App extends Component {
    state = {
        color: "red",
        message: "",
        daddress: "",
        dcontent: "",
    };

    async componentDidMount() {
        this.checkAccess();
    }

    async checkAccess() {
        const accounts = await web3.eth.getAccounts();
        const result = await contract.methods.moderators(accounts[0]).call();
        if (!result) this.setState({ message: <Redirect to="/" /> });
    }

    onFindDoctor = async (event) => {
        event.preventDefault();

        let doctorsDetails = await contract.methods
            .doctorsMap(this.state.daddress)
            .call();

        let dcontent = this.createContent(doctorsDetails);

        this.setState({ dcontent });
    };

    createContent = (pd) => {
        var date = new Date(parseInt(pd.DoB));
        date =
            date.getDate() +
            "-" +
            (date.getMonth() + 1) +
            "-" +
            date.getFullYear();
        return (
            <div>
                <p>Doctor's Name - {pd.name}</p>
                <p>Doctor's ID - {pd.ID}</p>
                <p>DoB - {date}</p>
                <p>
                    Gender -{" "}
                    {pd.gender === "0"
                        ? "Male"
                        : pd.gender === "1"
                        ? "Female"
                        : "Other"}
                </p>
                <p>Height - {pd.height} Centimeters</p>
                <p>Weight - {pd.weight} Kilograms</p>
                <p>Bloog Group - {pd.bloodGroup}</p>
                <form onSubmit={this.onEnable}>
                    <Button
                        onClick={this.onEnable}
                        variant="contained"
                        color="primary"
                    >
                        Enable Doctor
                    </Button>
                </form>
            </div>
        );
    };

    onEnable = async (event) => {
        event.preventDefault();

        const accounts = await web3.eth.getAccounts();

        this.setState({
            message: (
                <span>
                    <CircularProgress />
                    <br></br> Waiting on transaction success...
                </span>
            ),
            color: "#f26d5b",
        });

        await contract.methods.enableDoctor(this.state.daddress).send({
            from: accounts[0],
        });

        let doctorsDetails = await contract.methods
            .doctorsMap(this.state.daddress)
            .call();

        let dcontent = this.createContent(doctorsDetails);

        let message =
            "Reinstated Doctor with Ethereum Address - " + this.state.daddress;

        this.setState({ message, color: "#83e85a" });
        this.setState({ dcontent });
    };

    render() {
        return (
            <div>
                <h3 style={{ color: this.state.color }}>
                    {this.state.message}
                </h3>
                <NavBar />
                <div>
                    <h4>Enable / Reinstate Doctor</h4>
                    <form onSubmit={this.onFindDoctor}>
                        <div>
                            <TextField
                                className="inputs"
                                label="Doctor's Ethereum Address"
                                variant="outlined"
                                value={this.state.daddress}
                                onChange={(event) =>
                                    this.setState({
                                        daddress: event.target.value,
                                    })
                                }
                            />
                        </div>
                        <br />
                        <Button
                            onClick={this.onFindDoctor}
                            variant="contained"
                            color="primary"
                        >
                            Find Doctor
                        </Button>
                    </form>
                    {this.state.dcontent}
                </div>
                <hr />
            </div>
        );
    }
}

export default App;
