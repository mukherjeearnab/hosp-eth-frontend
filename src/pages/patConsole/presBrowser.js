import React, { Component } from "react";
import { Link } from "react-router-dom";
import contract from "../../contract-h";

class App extends Component {
    state = {
        pres: [],
        content: "",
    };

    async componentDidMount() {
        const { presID } = this.props.match.params;
        const pres = await contract.methods
            .retPatientPrescriptions(presID)
            .call();

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
                                <th>Prescription ID</th>
                            </tr>

                            {this.state.pres
                                .slice(0)
                                .reverse()
                                .map((id) => {
                                    return (
                                        <tr key={id}>
                                            <td>
                                                <Link to={`/presViewer2/${id}`}>
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
