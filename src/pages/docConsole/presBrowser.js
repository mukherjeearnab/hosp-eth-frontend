import React, { Component } from "react";
import { Link } from "react-router-dom";
import web3 from "../../web3";
import contract from "../../contract-h";
import NavBar from "../../components/docNav";

class App extends Component {
    state = {
        pres: [],
        daddress: "",
        content: "",
    };

    async componentDidMount() {
        const accounts = await web3.eth.getAccounts();
        const pres = await contract.methods
            .retDoctorsPrescriptions(accounts[0])
            .call();

        this.setState({ pres, daddress: accounts[0] });
    }

    render() {
        return (
            <div>
                <NavBar />
                <h1>Prescription Browser</h1>
                <div>
                    <table border="1">
                        <tbody>
                            <tr>
                                <th>Prescription ID</th>
                            </tr>

                            {this.state.pres
                                .slice(0)
                                .reverse()
                                .map((id) => {
                                    return (
                                        <tr key={id}>
                                            <td>
                                                <Link to={`/presViewer/${id}`}>
                                                    {id}
                                                </Link>
                                            </td>
                                        </tr>
                                    );
                                })}
                        </tbody>
                    </table>
                </div>
            </div>
        );
    }
}

export default App;
