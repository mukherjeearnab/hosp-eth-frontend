import React, { Component } from "react";
import { TextField } from "@material-ui/core";
import contractp from "../../contract-p";
import contract from "../../contract-h";
import NavBar from "../../components/docNav";

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
                <NavBar />
                <h2>Prescription Viewer</h2>
                <h3>Prescription ID - {this.state.presID}</h3>
                <p>Doctor - {this.state.dname}</p>
                <p>Patient - {this.state.pname}</p>
                <p>Date & Time - {this.state.time}</p>
                <TextField
                    className="inputs"
                    label="Precription Content"
                    variant="outlined"
                    multiline
                    rows={8}
                    readOnly
                    value={this.state.content}
                ></TextField>
            </div>
        );
    }
}

export default App;
