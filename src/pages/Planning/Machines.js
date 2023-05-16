// React
import React, {useEffect, useState} from "react";
import { useNavigate } from 'react-router-dom';

// components
import Page from "../Page";
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';
import ZoneDropMachines from "../../components/Zones/Machine/ZoneDropMachines";
// sections
// ----------------------------------------------------------------------
//user
import PageHeader from "../../components/Headers/PageHeader";
import useMachine from "../../hooks/machine/useMachine";

const Alert = React.forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation={60} ref={ref} variant="filled" {...props} />;
});

export default function PlanningMachines() {

    const {loadMachines } = useMachine()
    const [machines, setMachines] = useState([]);

    useEffect(() => {
        loadMachines().then((response) => {
            setMachines(response);
        });
    }, []);

    return (
        <Page title="Planning Machines" className="flex flex-col bg-blueGray-100">
            <PageHeader title="Planning Machines" />
            <div style={{ marginTop: "-8rem" }}>
                <div
                    id={"planning"}
                    className="min-h-screen-60 h-full mb-8 shadow-lg rounded-lg bg-black"
                    style={{
                        marginLeft: "3rem",
                        marginRight: "3rem",
                        backgroundColor: "white",
                        padding: "10px",
                    }}
                >
                    <div id={"dddd"} style={DropZoneStyle} className="min-h-screen-60">
                        <div style={ZoneContainer} className="min-h-screen-60">
                        {machines.map((machine, id) => {
                            return (<ZoneDropMachines id={id} accept={"all"} isZone={true} title={machine.nom_machine}  style={ZonePlannifierStyle} />)
                        }
                        )}
                        </div>
                    </div>

                </div>
            </div>
        </Page>
    );

}

const ZonePlannifierStyle = {
    flexDirection: "column",
    alignItems: "flex-start",
    padding: "0px",
    gap: "10px",
    width: "30%",
    height: "100%",
    minHeight: "60vh",
    "border-radius": "6px",
    border: "1px solid rgb(216, 222, 228)",
    overflow: "auto",
};

const DropZoneStyle = {
    display: "flex",
    flexDirection: "column",
    width: "100%",
};

const ZoneContainer = {
    display: "flex",
    flexDirection: "row",
    gap: "10px",
    width: "100%",
    borderRadius: "6px",
    overflow: "auto",
};