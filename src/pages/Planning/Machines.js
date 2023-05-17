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
import Select from "react-select";

const Alert = React.forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation={60} ref={ref} variant="filled" {...props} />;
});

let options = [];
for (let i = 1; i <= 52; i++) {
    options.push({ value: i, label: i });
}

export default function PlanningMachines() {

    const {loadMachines } = useMachine()
    const [machines, setMachines] = useState([]);
    const [week, setWeek] = useState(getWeekNumber(new Date()));

    useEffect(() => {
        loadMachines().then((response) => {
            setMachines(response);
        });
    }, []);

    function getWeekNumber(d) {
        d = new Date(Date.UTC(d.getFullYear(), d.getMonth(), d.getDate()));
        d.setUTCDate(d.getUTCDate() + 4 - (d.getUTCDay() || 7));
        var yearStart = new Date(Date.UTC(d.getUTCFullYear(), 0, 1));
        var weekNo = Math.ceil(((d - yearStart) / 86400000 + 1) / 7);
        return weekNo;
    }

    // week number to date in format YYYY-MM-DD
    function getWeekDate(weekNumber) {
        let d = new Date();
        let numDays = (weekNumber - getWeekNumber(d)) * 7;
        d.setDate(d.getDate() + numDays);
        return d.toISOString().split("T")[0];
    }

    useEffect(() => {
        const handleScroll = (event) => {
            const container = document.getElementById('zone-container');
            container.scrollLeft += event.deltaY;
        };

        const container = document.getElementById('zone-container');
        container.addEventListener('wheel', handleScroll);

        return () => {
            container.removeEventListener('wheel', handleScroll);
        };
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
                        <div style={SelectWeek}>
                            <p>Semaine :</p>
                            <Select
                                options={options}
                                defaultValue={{ label: week, value: week }}
                                onChange={(e) => setWeek(e.value)}
                            />
                        </div>
                        <div style={ZoneContainer} id={"zone-container"} className="min-h-screen-60">
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
    width: "25%",
    minWidth: "25%",
    height: "100%",
    minHeight: "60vh",
    "border-radius": "6px",
    border: "1px solid rgb(216, 222, 228)",
    "overflow-x": "auto",

};

const SelectWeek = {
    display: "flex",
    flexDirection: "row",
    gap: "10px",
    alignItems: "center",
    marginBottom: "10px",
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