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
import useFiche from "../../hooks/fiche/useFiche";
import API from "../../api/api";

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
    const [affaires, setAffaires] = useState([]);

    const {loadFichesAPlanifierMachine} = useFiche()

    function reload() {
        API.planning.get_planning_machine(week).then((response) => {
            setMachines(response.results);
        });
        loadFichesAPlanifierMachine().then((response) => {
            setAffaires(response.results);
        });
    }

    function handle_etape_drop(etapeId, machineId, affectationId = null) {
        if (affectationId === null) {
            let newAffectation = {
                semaine_affectation: getWeekDate(week),
                etape: etapeId,
                machine: machineId,
            };

            API.affectation_machine.create_affectation_machine(newAffectation).then((response) => {
                reload()
            });
        }
        else {
            let newAffectation = {
                semaine_affectation: getWeekDate(week),
                etape: etapeId,
                machine: machineId,
            }
            API.affectation_machine.update_affectation_machine(affectationId, newAffectation).then((response) => {
                reload()
            })
        }
    }


    useEffect(() => {
        reload()
    }, [week]);

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

    const [isDragging, setIsDragging] = useState(false);


    const ZoneContainer = {
        display: "flex",
        flexDirection: "row",
        gap: "10px",
        width: "100%",
        height: "100%",
        borderRadius: "6px",
        overflow: "auto",
        cursor: isDragging ? 'grabbing' : 'grab',
        //WebkitCursor: isDragging ? '-webkit-grabbing' : '-webkit-grab',
        // cursor: "grab",

    };

    const handleWheel = (e) => {
        const container = document.getElementById("zone-container");
        let containerScrollPosition = document.getElementById('zone-container').scrollLeft;
        container.scrollTo({
            top: 0,
            left: containerScrollPosition + e.deltaY,
            behaviour: 'smooth'
        });
    };

    async function handle_delete_affectation(id_affectation) {
        await API.affectation_machine.delete_affectation_machine(id_affectation).then((response) => {});
        reload();
    }


    return (
        <Page title="Planning Machines" className="flex flex-col bg-blueGray-100">
            <PageHeader title="Planning Machines" />
            <div style={{ marginTop: "-8rem" }}>
                <div
                    id={"planning"}
                    className="min-h-screen-60 h-full mb-8 shadow-lg rounded-lg bg-black"
                    style={ContainerStyle}
                >
                    <ZoneDropMachines isZone={false} title={"À planifier"}  style={ZonePlannifierStyle} affaires_data={affaires} />
                    <div id={"dddd"} style={DropZoneStyle} className="cursor">
                        <div style={SelectWeek}>
                            <p>Semaine :</p>
                            <Select
                                options={options}
                                defaultValue={{ label: week, value: week }}
                                onChange={(e) => setWeek(e.value)}
                            />
                        </div>
                        <div style={ZoneContainer} id={"zone-container"}
                            /*ref={containerRef}
                            onMouseDown={handleMouseDown}
                            onMouseMove={handleMouseMove}
                            onMouseUp={handleMouseUp}
                            onMouseLeave={handleMouseUp}*/
                            onWheel={handleWheel}
                        >
                        {machines.map((machine, id) => {
                            return (<ZoneDropMachines id={id} accept={["fiche", "etape"]} isZone={true} isZoneMachine={true} onDeleteAffectation={handle_delete_affectation}
                                                      onDrop={(etapeId, affectation) => handle_etape_drop(etapeId, machine.id, affectation)} affaires_data={machine.affaires} title={machine.nom_machine}  style={ZonePlannifierStyle} />)
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
    //minHeight: "60vh",
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


const ContainerStyle = {
    display: "flex",
    justifyContent: "space-around",
    height: "60vh",
    marginLeft: "3rem",
    marginRight: "3rem",
    backgroundColor: "white",
    padding: "10px",
    gap: "10px",
};