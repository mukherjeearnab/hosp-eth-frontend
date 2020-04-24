import React, { Component } from "react";
import { Button, TextField } from "@material-ui/core";
import NavBar from "../components/modNav";
import contract from "../contract-h";

class App extends Component {
    state = {
        color: "red",
        message: "",
        pname: "",
        pdate: "",
        pheight: 0,
        pweight: 0,
        pgender: "",
        pbgroup: "",
        phash: "",
        pcontent: "",
        dhash: "",
        dname: "",
        daddress: "",
        ddate: "",
        dheight: 0,
        dweight: 0,
        dgender: "",
        dbgroup: "",
        dcontent: "",
    };

    onFindPatient = async (event) => {
        event.preventDefault();

        let patientDetails = await contract.methods
            .patientMap(this.state.phash)
            .call();

        let pcontent = this.createContent(patientDetails, 0);

        this.setState({ pcontent });
    };

    onFindDoctor = async (event) => {
        event.preventDefault();

        let doctorsDetails = await contract.methods
            .doctorsMap(this.state.dhash)
            .call();

        let dcontent = this.createContent(doctorsDetails, 1);

        this.setState({ dcontent });
    };

    createContent = (pd, signal) => {
        if (signal === 0) {
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
                    <p>Blood Group - {pd.bloodGroup}</p>
                </div>
            );
        } else {
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
                    <p>Blood Group - {pd.bloodGroup}</p>
                </div>
            );
        }
    };

    render() {
        return (
            <div>
                <h1>Moderator's Console</h1>
                <h3 style={{ color: this.state.color }}>
                    {this.state.message}
                </h3>
                <NavBar />
                <div>
                    <h4>Patient Search</h4>
                    <form onSubmit={this.onFindPatient}>
                        <div>
                            <TextField
                                className="inputs"
                                label="Patient ID"
                                variant="outlined"
                                value={this.state.phash}
                                onChange={(event) =>
                                    this.setState({
                                        phash: event.target.value,
                                    })
                                }
                            />
                        </div>
                        <br />
                        <Button
                            onClick={this.onFindPatient}
                            variant="contained"
                            color="primary"
                        >
                            Find Patient
                        </Button>
                    </form>
                    {this.state.pcontent}
                </div>
                <hr />
                <div>
                    <h4>Doctor Search</h4>
                    <form onSubmit={this.onFindDoctor}>
                        <div>
                            <TextField
                                className="inputs"
                                label="Doctor's Ethereum ID"
                                variant="outlined"
                                value={this.state.dhash}
                                onChange={(event) =>
                                    this.setState({
                                        dhash: event.target.value,
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
            </div>
        );
    }
}

export default App;
