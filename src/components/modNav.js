import React from "react";
import { Link } from "react-router-dom";

function NavBar() {
    return (
        <ul>
            <li>
                <Link to="/">Home</Link>
            </li>
            <li>
                <Link to="/addPatient">Add Patient</Link>
            </li>
            <li>
                <Link to="/editPatient">Edit Patient</Link>
            </li>
            <li>
                <Link to="/addDoctor">Add Doctor</Link>
            </li>
            <li>
                <Link to="/editDoctor">Edit Doctor</Link>
            </li>
            <li>
                <Link to="/removeDoctor">Disable / Remove Doctor</Link>
            </li>
            <li>
                <Link to="/enableDoctor">Enable / Reinstate Doctor</Link>
            </li>
        </ul>
    );
}

export default NavBar;
