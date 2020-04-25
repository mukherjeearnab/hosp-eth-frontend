import React, { Component } from "react";
import { Redirect } from "react-router-dom";
import { CircularProgress, Button, TextField } from "@material-ui/core";
import web3 from "../../web3";
import contract from "../../contract-h";
import NavBar from "../../components/modNav";

class Com extends Component {
    state = {
        color: "red",
        message: "",
        dname: "",
        daddress: "",
        ddate: "",
        dheight: 0,
        dweight: 0,
        dgender: "",
        dbgroup: "",
        did: "",
    };

    async componentDidMount() {
        this.checkAccess();
    }

    async checkAccess() {
        const accounts = await web3.eth.getAccounts();
        const result = await contract.methods.moderators(accounts[0]).call();
        if (!result) this.setState({ message: <Redirect to="/" /> });
    }

    onEditPatient = async (event) => {
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

        // let date = this.state.ddate.split("-");
        // date = date[1] + "/" + date[0] + "/" + date[2];
        // console.log(date);
        let date = new Date(this.state.ddate).getTime(); //will alert 1330210800000

        await contract.methods
            .editDoctor(
                this.state.daddress,
                this.state.did,
                this.state.dname,
                date,
                this.state.dgender,
                this.state.dheight,
                this.state.dweight,
                this.state.dbgroup
            )
            .send({
                from: accounts[0],
            });

        let message = "Modified Doctor with ID - " + this.state.did;

        this.setState({ message, color: "#83e85a" });
    };

    onFindDoctor = async (event) => {
        event.preventDefault();

        let dd = await contract.methods.doctorsMap(this.state.daddress).call();

        var d = new Date(parseInt(dd.DoB));
        var date = d.getFullYear() + "-";

        date +=
            d.getMonth() + 1 < 10 ? "0" + (d.getMonth() + 1) : d.getMonth() + 1;
        date += "-";
        date += d.getDate() < 10 ? "0" + d.getDate() : d.getDate();

        this.setState({
            did: dd.ID,
            dname: dd.name,
            ddate: date,
            dgender: dd.gender,
            dheight: dd.height,
            dweight: dd.weight,
            dbgroup: dd.bloodGroup,
        });
    };

    render() {
        return (
            <div>
                <h3 style={{ color: this.state.color }}>
                    {this.state.message}
                </h3>
                <NavBar />
                <h4>Modify Doctor's Details</h4>
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
                    <Button onClick={this.onFindDoctor} variant="contained">
                        Find Doctor
                    </Button>
                </form>
                <hr />
                <form onSubmit={this.onEditPatient}>
                    <div>
                        <TextField
                            className="inputs"
                            label="Doctor's Name"
                            variant="outlined"
                            value={this.state.dname}
                            onChange={(event) =>
                                this.setState({
                                    dname: event.target.value,
                                })
                            }
                        />
                    </div>
                    <br />
                    <div>
                        <TextField
                            className="inputs"
                            label="Doctor's ID"
                            variant="outlined"
                            value={this.state.did}
                            onChange={(event) =>
                                this.setState({
                                    did: event.target.value,
                                })
                            }
                        />
                    </div>
                    <br />
                    <div>
                        <TextField
                            className="inputs"
                            label="Date of Birth"
                            variant="outlined"
                            value={this.state.ddate}
                            type="date"
                            onChange={(event) =>
                                this.setState({
                                    ddate: event.target.value,
                                })
                            }
                        />
                    </div>
                    <br />
                    <div>
                        <TextField
                            className="inputs"
                            label="Gender"
                            variant="outlined"
                            value={this.state.dgender}
                            type="number"
                            onChange={(event) =>
                                this.setState({
                                    dgender: event.target.value,
                                })
                            }
                        />
                        <p>(0 => Male, 1 => Female, 2 => Other): </p>
                    </div>
                    <br />
                    <div>
                        <TextField
                            className="inputs"
                            label="Height (in cm)"
                            variant="outlined"
                            value={this.state.dheight}
                            type="number"
                            onChange={(event) =>
                                this.setState({
                                    dheight: event.target.value,
                                })
                            }
                        />
                    </div>
                    <br />
                    <div>
                        <TextField
                            className="inputs"
                            label="Weight (in Kg)"
                            variant="outlined"
                            value={this.state.dweight}
                            type="number"
                            onChange={(event) =>
                                this.setState({
                                    dweight: event.target.value,
                                })
                            }
                        />
                    </div>
                    <br />
                    <div>
                        <TextField
                            className="inputs"
                            label="Blood Group"
                            variant="outlined"
                            value={this.state.dbgroup}
                            onChange={(event) =>
                                this.setState({
                                    dbgroup: event.target.value,
                                })
                            }
                        />
                    </div>
                    <br />
                    <Button
                        onClick={this.onEditPatient}
                        variant="contained"
                        color="primary"
                    >
                        Save Doctor's Details
                    </Button>
                </form>
            </div>
        );
    }
}

export default Com;
