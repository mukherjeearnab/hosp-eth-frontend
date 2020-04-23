import React, { Component } from "react";
import contractp from "../../contract-p";
import contract from "../../contract-h";
import { Link } from "react-router-dom";

class App extends Component {
    state = {
        presID: "",
        pname: "",
        dname: "",
        time: "",
        content: "",
    };

    async componentDidMount() {
        const { presID } = this.props.match.params;

        const presContent = await contractp.methods
            .prescriptionMap(presID)
            .call();

        const dContent = await contract.methods
            .doctorsMap(presContent.doctor)
            .call();
        const pContent = await contract.methods
            .patientMap(presContent.patient)
            .call();

        // console.log(presContent);
        // console.log(dContent);
        // console.log(pContent);

        var date0 = new Date(parseInt(presContent.timestamp));
        date0 =
            date0.getDate() +
            "-" +
            (date0.getMonth() + 1) +
            "-" +
            date0.getFullYear();

        this.setState({
            presID,
            dname: dContent.name,
            pname: pContent.name,
            time: date0,
            content: presContent.content,
        });

        // console.log(presID);
    }

    render() {
        return (
            <div>
                <h3>Patient Prescription Viewer</h3>
                <Link to="/">Home</Link>
                <h4>Prescription ID - {this.state.presID}</h4>
                <h5>Doctor - {this.state.dname}</h5>
                <h5>Patient - {this.state.pname}</h5>
                <p>Date & Time - {this.state.time}</p>
                <textarea readOnly value={this.state.content}></textarea>
            </div>
        );
    }
}

export default App;
