import React, { Component } from "react";
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
                <form onSubmit={this.onRemove}>
                    <button>Remove Doctor & Delete Data</button>
                </form>
            </div>
        );
    };

    onRemove = async (event) => {
        event.preventDefault();

        const accounts = await web3.eth.getAccounts();

        this.setState({
            message: "Waiting on transaction success...",
            color: "tomato",
        });

        await contract.methods.removeDoctor(this.state.daddress).send({
            from: accounts[0],
        });

        let doctorsDetails = await contract.methods
            .doctorsMap(this.state.daddress)
            .call();

        let dcontent = this.createContent(doctorsDetails);

        let message =
            "Removed Doctor with Ethereum Address - " + this.state.daddress;

        this.setState({ message, color: "green" });
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
                    <h4>Remove Doctor</h4>
                    <form onSubmit={this.onFindDoctor}>
                        <div>
                            <label>Doctor's Ethereum Address : </label>
                            <input
                                value={this.state.daddress}
                                onChange={(event) =>
                                    this.setState({
                                        daddress: event.target.value,
                                    })
                                }
                            />
                        </div>
                        <button>Find Doctor</button>
                    </form>
                    {this.state.dcontent}
                </div>
                <hr />
            </div>
        );
    }
}

export default App;
