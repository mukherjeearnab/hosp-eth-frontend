import React, { Component } from "react";
import md5 from "md5";
import web3 from "../../web3";
import contract from "../../contract";
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
            message: "Waiting on transaction success...",
            color: "tomato",
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

        console.log(hash, date);

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

        this.setState({ message, color: "green" });
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
                    <button>Add Patient</button>
                </form>
            </div>
        );
    }
}

export default Com;
