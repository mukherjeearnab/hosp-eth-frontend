import React, { Component } from "react";
import web3 from "../web3";
import contract from "../contract";

class App extends Component {
    state = {
        address_add: "",
        address_rem: "",
        message: "",
    };

    onAddModerator = async (event) => {
        event.preventDefault();

        const accounts = await web3.eth.getAccounts();

        this.setState({ message: "Waiting on transaction success..." });

        await contract.methods.addModerator(this.state.address_add).send({
            from: accounts[0],
        });

        let message = "Added " + this.state.address_add;

        this.setState({ message });
    };

    onRemoveModerator = async (event) => {
        event.preventDefault();

        const accounts = await web3.eth.getAccounts();

        this.setState({ message: "Waiting on transaction success..." });

        await contract.methods.removeModerator(this.state.address_rem).send({
            from: accounts[0],
        });

        let message = "Removed " + this.state.address_rem;

        this.setState({ message });
    };

    onKill = async (event) => {
        event.preventDefault();

        const accounts = await web3.eth.getAccounts();

        this.setState({ message: "Waiting on transaction success..." });

        await contract.methods.kill().send({
            from: accounts[0],
        });

        let message = "Killed Contract";

        this.setState({ message });
    };

    render() {
        return (
            <div>
                <h1>Admin's Home</h1>
                <h3>{this.state.message}</h3>
                <form onSubmit={this.onAddModerator}>
                    <h4>Adder New Moderator</h4>
                    <div>
                        <label>Address of Moderator : </label>
                        <input
                            value={this.state.address_add}
                            onChange={(event) =>
                                this.setState({
                                    address_add: event.target.value,
                                })
                            }
                        />
                    </div>
                    <button>Add Moderator</button>
                </form>
                <hr />
                <form onSubmit={this.onRemoveModerator}>
                    <h4>Remove Moderator</h4>
                    <div>
                        <label>Address of Moderator : </label>
                        <input
                            value={this.state.address_rem}
                            onChange={(event) =>
                                this.setState({
                                    address_rem: event.target.value,
                                })
                            }
                        />
                    </div>
                    <button>Remove Moderator</button>
                </form>
                <hr />
                <form onSubmit={this.onKill}>
                    <h4>Kill Contract (Threre's no going back!)</h4>
                    <button>
                        Click to Kill Contract (Threre's no going back!)
                    </button>
                </form>
            </div>
        );
    }
}

export default App;
