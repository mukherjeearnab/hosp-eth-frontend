import React, { Component } from "react";
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
            message: "Waiting on transaction success...",
            color: "tomato",
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
                <hr />
                <form onSubmit={this.onEditPatient}>
                    <div>
                        <label>Patient name : </label>
                        <input
                            value={this.state.pname}
                            onChange={(event) =>
                                this.setState({
                                    pname: event.target.value,
                                })
                            }
                        />
                    </div>
                    <div>
                        <label>Date of Birth : </label>
                        <input
                            value={this.state.pdate}
                            type="date"
                            onChange={(event) =>
                                this.setState({
                                    pdate: event.target.value,
                                })
                            }
                        />
                    </div>
                    <div>
                        <label>
                            Gender (0 => Male, 1 => Female, 2 => Other):{" "}
                        </label>
                        <input
                            value={this.state.pgender}
                            type="number"
                            onChange={(event) =>
                                this.setState({
                                    pgender: event.target.value,
                                })
                            }
                        />
                    </div>
                    <div>
                        <label>Height (in Centimeters) : </label>
                        <input
                            value={this.state.pheight}
                            type="number"
                            onChange={(event) =>
                                this.setState({
                                    pheight: event.target.value,
                                })
                            }
                        />
                    </div>
                    <div>
                        <label>Weight (in Kilograms) : </label>
                        <input
                            value={this.state.pweight}
                            type="number"
                            onChange={(event) =>
                                this.setState({
                                    pweight: event.target.value,
                                })
                            }
                        />
                    </div>
                    <div>
                        <label>Blood Group : </label>
                        <input
                            value={this.state.pbgroup}
                            onChange={(event) =>
                                this.setState({
                                    pbgroup: event.target.value,
                                })
                            }
                        />
                    </div>
                    <button>Save Patient Details</button>
                </form>
            </div>
        );
    }
}

export default Com;
