import React, { Component } from "react";
import { CircularProgress, Button, TextField } from "@material-ui/core";
import web3 from "../../web3";
import contract from "../../contract-h";
import NavBar from "../../components/modNav";

class Com extends Component {
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
    };

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

        // let date = this.state.pdate.split("-");
        // date = date[1] + "/" + date[0] + "/" + date[2];
        // console.log(date);
        let date = new Date(this.state.pdate).getTime(); //will alert 1330210800000

        await contract.methods
            .editPatient(
                this.state.phash,
                this.state.pname,
                date,
                this.state.pgender,
                this.state.pheight,
                this.state.pweight,
                this.state.pbgroup
            )
            .send({
                from: accounts[0],
            });

        let message = "Modified Patient with ID - " + this.state.phash;

        this.setState({ message, color: "#83e85a" });
    };

    onFindPatient = async (event) => {
        event.preventDefault();

        let pd = await contract.methods.patientMap(this.state.phash).call();

        var d = new Date(parseInt(pd.DoB));
        var date = d.getFullYear() + "-";

        date +=
            d.getMonth() + 1 < 10 ? "0" + (d.getMonth() + 1) : d.getMonth() + 1;
        date += "-" + d.getDate();

        this.setState({
            pname: pd.name,
            pdate: date,
            pgender: pd.gender,
            pheight: pd.height,
            pweight: pd.weight,
            pbgroup: pd.bloodGroup,
        });
    };

    render() {
        return (
            <div>
                <h3 style={{ color: this.state.color }}>
                    {this.state.message}
                </h3>
                <NavBar />
                <h4>Modify Patient Details</h4>
                <form onSubmit={this.onFindPatient}>
                    <div>
                        <label> : </label>
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
                    <Button onClick={this.onFindPatient} variant="contained">
                        Find Patient
                    </Button>
                </form>
                <hr />
                <form onSubmit={this.onEditPatient}>
                    <div>
                        <TextField
                            className="inputs"
                            label="Patient Name"
                            variant="outlined"
                            value={this.state.pname}
                            onChange={(event) =>
                                this.setState({
                                    pname: event.target.value,
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
                            value={this.state.pdate}
                            type="date"
                            onChange={(event) =>
                                this.setState({
                                    pdate: event.target.value,
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
                            value={this.state.pgender}
                            type="number"
                            onChange={(event) =>
                                this.setState({
                                    pgender: event.target.value,
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
                            value={this.state.pheight}
                            type="number"
                            onChange={(event) =>
                                this.setState({
                                    pheight: event.target.value,
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
                            value={this.state.pweight}
                            type="number"
                            onChange={(event) =>
                                this.setState({
                                    pweight: event.target.value,
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
                            value={this.state.pbgroup}
                            onChange={(event) =>
                                this.setState({
                                    pbgroup: event.target.value,
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
                        Save Patient Details
                    </Button>
                </form>
            </div>
        );
    }
}

export default Com;
