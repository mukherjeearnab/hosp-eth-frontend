import React, { Component } from "react";
import {
    Table,
    TableBody,
    TableContainer,
    TableHead,
    TableCell,
    TableRow,
    CircularProgress,
} from "@material-ui/core";
import Paper from "@material-ui/core/Paper";
import { Link } from "react-router-dom";
import contract from "../../contract-h";
import contractp from "../../contract-p";

class App extends Component {
    state = {
        pres: [],
        content: "",
        message: "",
    };

    async componentDidMount() {
        this.setState({
            message: (
                <span>
                    <CircularProgress />
                    <br></br> Loading.....
                </span>
            ),
        });

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

        this.setState({ pres, message: "" });
    }

    render() {
        return (
            <div>
                <Link to="/">Home</Link>
                <h1>Patient Prescription Browser</h1>
                <div>
                    <TableContainer component={Paper}>
                        <Table aria-label="simple table">
                            <TableHead>
                                <TableRow>
                                    <TableCell align="left">
                                        <b>Serial</b>
                                    </TableCell>
                                    <TableCell align="left">
                                        <b>Doctor's Name</b>
                                    </TableCell>
                                    <TableCell align="left">
                                        <b>Date & Time</b>
                                    </TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {this.state.pres
                                    .slice(0)
                                    .reverse()
                                    .map((content, index) => {
                                        return (
                                            <TableRow key={content.id}>
                                                <TableCell align="left">
                                                    {index + 1}
                                                </TableCell>
                                                <TableCell align="left">
                                                    <Link
                                                        to={`/presViewer2/${content.id}`}
                                                    >
                                                        {content.doctor}
                                                    </Link>
                                                </TableCell>
                                                <TableCell align="left">
                                                    {content.timestamp}
                                                </TableCell>
                                            </TableRow>
                                        );
                                    })}
                            </TableBody>
                        </Table>
                    </TableContainer>
                </div>
                <br />
                {this.state.message}
            </div>
        );
    }
}

export default App;
