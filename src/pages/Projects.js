import React from "react";
import { FilePicker } from "react-file-picker";
import web3 from "../web3";

function App() {
    const swarm = () => {
        // web3.bzz.upload({ pick: "file" }).then((hash) => {
        //     console.log(hash);
        // });
    };

    return (
        // <FilePicker
        //     onChange={(FileObject) => {
        //         console.log(FileObject);
        //         web3.bzz.upload({ pick: "file" }).then((hash) => {
        //             console.log(hash);
        //         });
        //     }}
        //     onError={(errMsg) => console.log(errMsg)}
        // >
        <button onClick={swarm}>Click to upload markdown</button>
        // </FilePicker>
    );
}

export default App;
