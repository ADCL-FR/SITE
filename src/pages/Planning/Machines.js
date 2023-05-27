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
import Select from "react-select";
import useFiche from "../../hooks/fiche/useFiche";
import API from "../../api/api";

import {getWeeksInYear, getYearsRange, getDateFromWeek, getWeekNumber} from "../../utils/dates";
export default function PlanningMachines() {

    const [machines, setMachines] = useState([]);
    const [affaires, setAffaires] = useState([]);
    const [salarieOptions, setSalarieOptions] = useState([]);
    const [isDragging, setIsDragging] = useState(false);

    const [year, setYear] = useState(new Date().getFullYear());
    const [week, setWeek] = useState(getWeekNumber(new Date(), year));

    const {loadFichesAPlanifierMachine} = useFiche()

    function reload() {
        API.planning.get_planning_machine(week, year).then((response) => {
            setMachines(response.results);
        });
        loadFichesAPlanifierMachine().then((response) => {
            setAffaires(response.results);
        });
    }

    function handle_etape_drop(etapeId, machineId, affectationId = null) {
        if (affectationId === null) {
            let newAffectation = {
                semaine_affectation: getDateFromWeek(year, week),
                etape: etapeId,
                machine: machineId,
            };

            API.affectation_machine.create_affectation_machine(newAffectation).then((response) => {
                reload()
            });
        }
        else {
            let newAffectation = {
                semaine_affectation: getDateFromWeek(year, week),
                etape: etapeId,
                machine: machineId,
            }
            API.affectation_machine.update_affectation_machine(affectationId, newAffectation).then((response) => {
                reload()
            })
        }
    }

    useEffect(() => {
        API.salarie.get_salaries_form_options().then((response) => {
            setSalarieOptions(response.results);
        });
    }, []);

    useEffect(() => {
        reload()
    }, [year, week]);

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
                        <div className="flex flex-row">
                            <div style={SelectWeek}>
                                <p>Année :</p>
                                <Select
                                    options={getYearsRange(5)}
                                    defaultValue={{ label: year, value: year }}
                                    onChange={(e) => setYear(e.value)}
                                />
                            </div>
                            <div style={SelectWeek}>
                                <p>Semaine :</p>
                                <Select
                                    options={getWeeksInYear(year)}
                                    defaultValue={{ label: week, value: week }}
                                    onChange={(e) => setWeek(e.value)}
                                />
                            </div>
                        </div>

                        <div style={ZoneContainer} id={"zone-container"}
                            onWheel={handleWheel}
                        >
                        {machines.map((machine, id) => {
                            return (
                                <ZoneDropMachines id={id}
                                      accept={["fiche", "etape"]}
                                      isZone={true}
                                      onDeleteAffectation={handle_delete_affectation}
                                      onDrop={(etapeId, affectation) => handle_etape_drop(etapeId, machine.id, affectation)}
                                      affaires_data={machine.affaires}
                                      title={machine.nom_machine}
                                      style={ZonePlannifierStyle}
                                      salarieOptions={salarieOptions}
                                />)
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
    marginLeft: "10px",
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