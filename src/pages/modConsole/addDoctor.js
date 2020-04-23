import React, { Component } from "react";
import md5 from "md5";
import web3 from "../../web3";
import contract from "../../contract-h";
import NavBar from "../../components/modNav";

class Com extends Component {
    state = {
        color: "red",
        message: "",
        daddress: "",
        dname: "",
        did: "",
        ddate: "",
        dheight: 0,
        dweight: 0,
        dgender: "",
        dbgroup: "",
    };

    // async componentDidMount() {
    //     await this.checkAccess();
    // }

    // async checkAccess() {
    //     const accounts = await web3.eth.getAccounts();
    //     const result = await contract.methods.moderators(accounts[0]).call();
    //     if (!result) Router.transitionTo("/");
    // }

    onAddDoctor = async (event) => {
        event.preventDefault();

        const accounts = await web3.eth.getAccounts();

        this.setState({
            message: "Waiting on transaction success...",
            color: "tomato",
        });

        let hash = md5(
            this.state.dname +
                this.state.ddate +
                this.state.dheight +
                this.state.dweight +
                this.state.dgender +
                this.state.dbgroup +
                this.state.daddress
        );

        // let date = this.state.ddate.split("-");
        // date = date[1] + "/" + date[0] + "/" + date[2];
        // console.log(date);
        let date = new Date(this.state.ddate).getTime();

        hash = "0x" + hash;
        this.setState({ did: hash });

        console.log(hash, date);

        await contract.methods
            .addDoctor(
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

        let message = "Added Doctor with ID - " + hash;

        this.setState({ message, color: "green" });
    };

    render() {
        return (
            <div>
                <h3 style={{ color: this.state.color }}>
                    {this.state.message}
                </h3>
                <NavBar />
                <form onSubmit={this.onAddDoctor}>
                    <h4>Adder New Doctor</h4>
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
                    <button>Add Patient</button>
                </form>
            </div>
        );
    }
}

export default Com;
