import React, { Component } from "react";
import web3 from "../../web3";
import contract from "../../contract";
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

    onEditPatient = async (event) => {
        event.preventDefault();

        const accounts = await web3.eth.getAccounts();

        this.setState({
            message: "Waiting on transaction success...",
            color: "tomato",
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

        this.setState({ message, color: "green" });
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
                <hr />
                <form onSubmit={this.onEditPatient}>
                    <div>
                        <label>Doctor's name : </label>
                        <input
                            value={this.state.dname}
                            onChange={(event) =>
                                this.setState({
                                    dname: event.target.value,
                                })
                            }
                        />
                    </div>
                    <div>
                        <label>Doctor's ID : </label>
                        <input
                            value={this.state.did}
                            onChange={(event) =>
                                this.setState({
                                    did: event.target.value,
                                })
                            }
                        />
                    </div>
                    <div>
                        <label>Date of Birth : </label>
                        <input
                            value={this.state.ddate}
                            type="date"
                            onChange={(event) =>
                                this.setState({
                                    ddate: event.target.value,
                                })
                            }
                        />
                    </div>
                    <div>
                        <label>
                            Gender (0 => Male, 1 => Female, 2 => Other):{" "}
                        </label>
                        <input
                            value={this.state.dgender}
                            type="number"
                            onChange={(event) =>
                                this.setState({
                                    dgender: event.target.value,
                                })
                            }
                        />
                    </div>
                    <div>
                        <label>Height (in Centimeters) : </label>
                        <input
                            value={this.state.dheight}
                            type="number"
                            onChange={(event) =>
                                this.setState({
                                    dheight: event.target.value,
                                })
                            }
                        />
                    </div>
                    <div>
                        <label>Weight (in Kilograms) : </label>
                        <input
                            value={this.state.dweight}
                            type="number"
                            onChange={(event) =>
                                this.setState({
                                    dweight: event.target.value,
                                })
                            }
                        />
                    </div>
                    <div>
                        <label>Blood Group : </label>
                        <input
                            value={this.state.dbgroup}
                            onChange={(event) =>
                                this.setState({
                                    dbgroup: event.target.value,
                                })
                            }
                        />
                    </div>
                    <button>Save Doctor's Details</button>
                </form>
            </div>
        );
    }
}

export default Com;
