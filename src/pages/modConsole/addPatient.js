import React, { Component } from "react";
import { CircularProgress, Button, TextField } from "@material-ui/core";
import md5 from "md5";
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
    };

    onAddPatient = async (event) => {
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

        let hash = md5(
            this.state.pname +
                this.state.pdate +
                this.state.pheight +
                this.state.pweight +
                this.state.pgender +
                this.state.pbgroup
        );

        // let date = this.state.pdate.split("-");
        // date = date[1] + "/" + date[0] + "/" + date[2];
        // console.log(date);
        let date = new Date(this.state.pdate).getTime(); //will alert 1330210800000

        hash = "0x" + hash;

        // console.log(hash, date);

        await contract.methods
            .addPatient(
                hash,
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

        let message = "Added Patient with ID - " + hash;

        this.setState({ message, color: "#83e85a" });
    };

    render() {
        return (
            <div>
                <h3 style={{ color: this.state.color }}>
                    {this.state.message}
                </h3>
                <NavBar />
                <form onSubmit={this.onAddPatient}>
                    <h4>Adder New Patient</h4>
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
                        onClick={this.onAddPatient}
                        variant="contained"
                        color="primary"
                    >
                        Add Patient
                    </Button>
                </form>
            </div>
        );
    }
}

export default Com;
