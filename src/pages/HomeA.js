import React, { Component } from "react";
import { CircularProgress, Button, TextField } from "@material-ui/core";
import web3 from "../web3";
import contract from "../contract-h";

class App extends Component {
    state = {
        address_add: "",
        address_rem: "",
        message: "",
        color: "red",
    };

    onAddModerator = async (event) => {
        event.preventDefault();

        const accounts = await web3.eth.getAccounts();

        this.setState({
            message: (
                <span>
                    <CircularProgress /> "Waiting on transaction success..."
                </span>
            ),
            color: "#f26d5b",
        });

        await contract.methods.addModerator(this.state.address_add).send({
            from: accounts[0],
        });

        let message = "Added " + this.state.address_add;

        this.setState({ message, color: "#83e85a" });
    };

    onRemoveModerator = async (event) => {
        event.preventDefault();

        const accounts = await web3.eth.getAccounts();

        this.setState({
            message: (
                <span>
                    <CircularProgress /> "Waiting on transaction success..."
                </span>
            ),
            color: "#f26d5b",
        });

        await contract.methods.removeModerator(this.state.address_rem).send({
            from: accounts[0],
        });

        let message = "Removed " + this.state.address_rem;

        this.setState({ message, color: "#83e85a" });
    };

    onKill = async (event) => {
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

        await contract.methods.kill().send({
            from: accounts[0],
        });

        let message = "Killed Contract";

        this.setState({ message });
    };

    render() {
        return (
            <div>
                <h1>Admin's Console</h1>
                <h1 style={{ color: this.state.color }}>
                    {this.state.message}
                </h1>
                <form onSubmit={this.onAddModerator}>
                    <h4>Adder New Moderator</h4>
                    <div>
                        <TextField
                            className="inputs"
                            label="Address of Moderator"
                            variant="outlined"
                            value={this.state.address_add}
                            onChange={(event) =>
                                this.setState({
                                    address_add: event.target.value,
                                })
                            }
                        />
                    </div>
                    <br />
                    <Button
                        onClick={this.onAddModerator}
                        variant="contained"
                        color="primary"
                    >
                        Add Moderator
                    </Button>
                </form>
                <hr />
                <form onSubmit={this.onRemoveModerator}>
                    <h4>Remove Moderator</h4>
                    <div>
                        <TextField
                            label="Address of Moderator"
                            variant="outlined"
                            value={this.state.address_rem}
                            onChange={(event) =>
                                this.setState({
                                    address_rem: event.target.value,
                                })
                            }
                        />
                    </div>
                    <br />
                    <Button
                        onClick={this.onRemoveModerator}
                        variant="contained"
                        color="primary"
                    >
                        Remove Moderator
                    </Button>
                </form>
                <hr />
                <form onSubmit={this.onKill}>
                    <h4>Kill Contract (Threre's no going back!)</h4>
                    <Button
                        onClick={this.onKill}
                        variant="contained"
                        color="secondary"
                    >
                        Click to Kill Contract (Threre's no going back!)
                    </Button>
                </form>
            </div>
        );
    }
}

export default App;
