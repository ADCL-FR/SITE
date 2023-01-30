// React
import React, {useEffect, useState} from "react";
import { useNavigate } from 'react-router-dom';

// components
import Page from "../Page";
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';
import Zone from '../../components/Zones/Zone';
import Droppable from '../../components/DND/Droppable';
import Select from 'react-select';


// drap and drop
import { DndProvider, useDrag, useDrop } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import { COLUMN_NAMES } from "../../constants/dragAndDrop/coloumns";

//Constants
import { ZONES } from "../../constants/zones";
// ----------------------------------------------------------------------
//user
import PageHeader from "../../components/Headers/PageHeader";
import { borderRadius } from "tailwindcss/defaultTheme";
import { width } from "@mui/system";


const {DO_IT} = COLUMN_NAMES;
const tasks = [
    {id: 1, name: 'Item 1', column: DO_IT},
    {id: 2, name: 'Item 2', column: DO_IT},
    {id: 3, name: 'Item 3', column: DO_IT},
    {id: 4, name: 'Item 4', column: DO_IT},
];
let options = []
for (let i = 1; i <= 52; i++) {
    options.push({value: i, label: i})
}


export default function PlanningZone() {

    const [zone1, setZone1] = useState([])
    const [zone2, setZone2] = useState([])
    const [fiche, setFiche] = useState(tasks)
    const [week, setWeek] = useState(getWeekNumber(new Date()))

    // calculate the week number
    function getWeekNumber(d) {
        d = new Date(Date.UTC(d.getFullYear(), d.getMonth(), d.getDate()));
        d.setUTCDate(d.getUTCDate() + 4 - (d.getUTCDay()||7));
        var yearStart = new Date(Date.UTC(d.getUTCFullYear(),0,1));
        var weekNo = Math.ceil(( ( (d - yearStart) / 86400000) + 1)/7);
        return weekNo;
    }

    // week number to date
    function getWeekDate(weekNumber){
        var d = new Date();
        var num = d.getYear();
        var start = new Date(num, 0, 1);
        var startDate = start.getDay();
        var weekStart = new Date(num, 0, 2 + ((7 - startDate) % 7) + (weekNumber - 1) * 7);
        return weekStart;
    }
    
   

    function ajout_fiche_zone1(item){
        setZone1((zone1) => 
                            !zone1.includes(item) ? [...zone1, item] : zone1)
        setFiche((fiche) => fiche.filter((current) => current.id !== item.id))
        // remove from zone2
        setZone2((zone2) => zone2.filter((current) => current.id !== item.id))
    
    }
    function ajout_fiche_zone2(item){
        setZone2((zone2) => 
                            !zone2.includes(item) ? [...zone2, item] : zone2)
        setFiche((fiche) => fiche.filter((current) => current.id !== item.id))
        // remove from zone1
        setZone1((zone1) => zone1.filter((current) => current.id !== item.id))
        
        
    }

    function ajout_fiche_a_plannifier(item){
        setFiche((fiche) => 
                            !fiche.includes(item) ? [...fiche, item] : fiche)
        setZone1((zone1) => zone1.filter((current) => current.id !== item.id))
        setZone2((zone2) => zone2.filter((current) => current.id !== item.id))
    }

   
    const { DO_IT, IN_PROGRESS, AWAITING_REVIEW, DONE } = COLUMN_NAMES;

    useEffect(() => {
        // get the week number
        const date = new Date();
        const week = getWeekNumber(date);
        console.log(week)
        setWeek(week)
        
    }, [week])

    return (
        <Page title="Planning Zones" className="flex flex-col bg-blueGray-100 h-screen">
            <PageHeader title="Planning Zones"/>
            <div style={{"marginTop":"-8rem"}}>        
                <div className=" h-full h-min-330px mb-8 shadow-lg rounded-lg" style={{"marginLeft":"3rem", "marginRight":"3rem","backgroundColor":"white", "padding": "10px",}} >
                    
                    <div style={ContainerStyle}>
                        <Zone style={ZonePlannifierStyle}  title={"Fiche à plannifier"} onDrop={(item) => ajout_fiche_a_plannifier(item)}>
                            {fiche.map(pet => <Droppable draggable item={pet} type="fiche" />)}
                        </Zone>
                    
                        <div style={DropZoneStyle}>
                            <div style={SelectWek}>
                                <p>Semaine :</p>
                                <Select
                                    options={options}
                                    defaultValue={{ label: week, value: week }}
                                    
                                />
                            </div>
                            <div style={ZoneContainer}>
                                <Zone style={ZoneStyle} title={"Zone 1"} onDrop={(item) => ajout_fiche_zone1(item)}>
                                    {zone1.map(pet => <Droppable draggable item={pet} type="fiche" />)}
                                </Zone>
                                <Zone style={ZoneStyle} title={"Zone 2"} onDrop={(item) => ajout_fiche_zone2(item)}>
                                    {zone2.map(pet => <Droppable draggable item={pet} type="fiche" />)}
                                </Zone>
                                <Zone style={ZoneStyle} title={"Zone 3"} onDrop={(item) => ajout_fiche_zone2(item)}>
                                    {zone2.map(pet => <Droppable draggable item={pet} type="fiche" />)}
                                </Zone>
                            </div>
                            
                        </div>
                    </div>
                </div>
            </div>
            
        </Page>
          
            
    );

}

const ContainerStyle = {
    
    "display": "flex", 
    width: "100%",
    "justifyContent": "space-around",
    "minHeight": "60vh",
    gap: "10px",
}
const DropZoneStyle = {
    "display": "flex",
    "flexDirection": "column",
    "width": "100%",
}
const ZoneContainer = {
    display: 'flex',
    flexDirection: 'row',
    gap: 0,
    width: "100%",
    height: "100%",
    borderRadius: "15px"
}
const ZoneStyle = {
    flexDirection: "column",
    alignItems: "flex-start",
    padding: "0px",
    gap: "10px",
    width: "100%",
    height: "100%",
    border: "1px dashed #000000"
    
}

const ZonePlannifierStyle = {
    flexDirection: "column",
    alignItems: "flex-start",
    padding: "0px",
    gap: "10px",
    width: "100%",
    width: "30%",
    border: "1px dashed #000000"
}

const SelectWek = {
    "display": "flex",
    "flexDirection": "row",
    "gap": "10px",
    "alignItems": "center",
    "marginBottom": "10px"
}
