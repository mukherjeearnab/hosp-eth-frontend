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
                <Link to="/removeDoctor">Remove Doctor</Link>
            </li>
        </ul>
    );
}

export default NavBar;
