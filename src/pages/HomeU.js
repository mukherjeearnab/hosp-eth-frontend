import React, { Component } from "react";
import { Link } from "react-router-dom";
import contract from "../contract-h";

class App extends Component {
    state = {
        pcontent: "",
        phash: "",
    };

    onFindPatient = async (event) => {
        event.preventDefault();

        let patientDetails = await contract.methods
            .patientMap(this.state.phash)
            .call();

        let pcontent = this.createContent(patientDetails);

        this.setState({ pcontent });
    };

    createContent = (pd) => {
        var date0 = new Date(parseInt(pd.DoB));
        date0 =
            date0.getDate() +
            "-" +
            (date0.getMonth() + 1) +
            "-" +
            date0.getFullYear();
        return (
            <div>
                <p>Name - {pd.name}</p>
                <p>DoB - {date0}</p>
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
                <button>
                    <Link to={`/presBrowser/${this.state.phash}`}>
                        Browse Prescriptions
                    </Link>
                </button>
            </div>
        );
    };

    render() {
        return (
            <div>
                <h2>Unrecognized Account!</h2>
                <h4>
                    If you're a Patient, you can Browse your Prescription Below.
                </h4>
                <div>
                    <h4>Patient Search</h4>
                    <form onSubmit={this.onFindPatient}>
                        <div>
                            <label>Patient ID : </label>
                            <input
                                value={this.state.phash}
                                onChange={(event) =>
                                    this.setState({
                                        phash: event.target.value,
                                    })
                                }
                            />
                        </div>
                        <button>Find Patient</button>
                    </form>
                    {this.state.pcontent}
                </div>
            </div>
        );
    }
}

export default App;
