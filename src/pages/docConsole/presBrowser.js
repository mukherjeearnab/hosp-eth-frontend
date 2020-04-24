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
import web3 from "../../web3";
import contract from "../../contract-h";
import contractp from "../../contract-p";
import NavBar from "../../components/docNav";

class App extends Component {
    state = {
        pres: [],
        daddress: "",
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

        this.setState({ pres, daddress: accounts[0], message: "" });
    }

    render() {
        return (
            <div>
                <NavBar />
                <h1>Prescription Browser</h1>
                <div>
                    <TableContainer component={Paper}>
                        <Table aria-label="simple table">
                            <TableHead>
                                <TableRow>
                                    <TableCell align="left">
                                        <b>Serial</b>
                                    </TableCell>
                                    <TableCell align="left">
                                        <b>Patient Name</b>
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
                                                        to={`/presViewer/${content.id}`}
                                                    >
                                                        {content.patient}
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
