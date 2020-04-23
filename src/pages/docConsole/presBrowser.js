import React, { Component } from "react";
import { Link } from "react-router-dom";
import web3 from "../../web3";
import contract from "../../contract-h";
import contractp from "../../contract-p";
import NavBar from "../../components/docNav";

class App extends Component {
    state = {
        pres: [],
        daddress: "",
        content: "",
    };

    async componentDidMount() {
        const accounts = await web3.eth.getAccounts();
        const presID = await contract.methods
            .retDoctorsPrescriptions(accounts[0])
            .call();

        let pres = [];

        for (let a = 0; a < presID.length; a++) {
            let pre = await contractp.methods.prescriptionMap(presID[a]).call();
            let pat = await contract.methods.patientMap(pre.patient).call();
            let time = new Date(parseInt(pre.timestamp)).toString();
            let obj = {
                patient: pat.name,
                timestamp: time,
                id: presID[a],
            };
            pres.push(obj);
        }

        this.setState({ pres, daddress: accounts[0] });
    }

    render() {
        return (
            <div>
                <NavBar />
                <h1>Prescription Browser</h1>
                <div>
                    <table align="center" border="1">
                        <tbody>
                            <tr>
                                <th>Patient Name</th>
                                <th>Date & Time</th>
                            </tr>

                            {this.state.pres
                                .slice(0)
                                .reverse()
                                .map((content) => {
                                    return (
                                        <tr key={content.id}>
                                            <td>
                                                <Link
                                                    to={`/presViewer/${content.id}`}
                                                >
                                                    {content.patient}
                                                </Link>
                                            </td>
                                            <td>{content.timestamp}</td>
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
