import React, { Component } from "react";
import { Link } from "react-router-dom";
import contract from "../../contract-h";
import contractp from "../../contract-p";

class App extends Component {
    state = {
        pres: [],
        content: "",
    };

    async componentDidMount() {
        const { presID } = this.props.match.params;
        const presI = await contract.methods
            .retPatientPrescriptions(presID)
            .call();

        let pres = [];

        for (let a = 0; a < presI.length; a++) {
            let pre = await contractp.methods.prescriptionMap(presI[a]).call();
            let doc = await contract.methods.doctorsMap(pre.doctor).call();
            let time = new Date(parseInt(pre.timestamp)).toString();
            let obj = {
                doctor: doc.name,
                timestamp: time,
                id: presI[a],
            };
            pres.push(obj);
        }

        this.setState({ pres });
    }

    render() {
        return (
            <div>
                <Link to="/">Home</Link>
                <h1>Patient Prescription Browser</h1>
                <div>
                    <table align="center" border="1">
                        <tbody>
                            <tr>
                                <th>Doctor's Name</th>
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
                                                    Dr. {content.doctor}
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
