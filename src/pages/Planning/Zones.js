// React
import React, {useEffect, useState} from "react";
import { useNavigate } from 'react-router-dom';

// components
import Page from "../Page";
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';
import Zone from '../../components/Zones/Zone';
import Droppable from '../../components/DND/Droppable';
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

const Alert = React.forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation={60} ref={ref} variant="filled" {...props} />;
});

const {DO_IT} = COLUMN_NAMES;
const tasks = [
    {id: 1, name: 'Item 1', column: DO_IT},
    {id: 2, name: 'Item 2', column: DO_IT},
    {id: 3, name: 'Item 3', column: DO_IT},
    {id: 4, name: 'Item 4', column: DO_IT},
];


export default function PlanningZone() {

    const [zone1, setZone1] = useState([])
    const [zone2, setZone2] = useState([])
    const [fiche, setFiche] = useState(tasks)
    

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

    return (
        <Page title="Planning Zones" className="flex flex-col bg-blueGray-100 h-screen">
            <PageHeader title="Planning Zones"/>
          
            <div className="  h-full h-min-330px mb-8 shadow-lg rounded-lg" style={ContainerStyle}>
                <Zone style={ZoneStyle} title={"Fiche à plannifier"} onDrop={(item) => ajout_fiche_a_plannifier(item)}>
                    {fiche.map(pet => <Droppable draggable item={pet} type="fiche" />)}
                </Zone>
            
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
                    
                    {/* <div className='pets'>
                        {fiche.map(pet => <Droppable draggable item={pet} type="fiche" />)}
                    </div>
                    <Zone style={style} title="TEST" onDrop={(item) => ajout_fiche_zone1(item)}>
                        {zone1.map(pet => <Droppable draggable item={pet} type="fiche" />)}
                    </Zone>
                    <Zone style={style} title="TEST" onDrop={(item) => ajout_fiche_zone2(item)}>
                        {zone2.map(pet => <Droppable draggable item={pet} type="fiche" />)}
                    </Zone> */}
                    
                   
                
            </div>
            
        </Page>
          
            
    );

}

const ContainerStyle = {
    "margin": "3rem",
    "marginTop": "-8rem", 
    "backgroundColor":"white", 
    "display": "flex", 
    "padding": "10px",
    "justifyContent": "space-between",
}

const ZoneContainer = {
    display: 'flex',
    flexDirection: 'row',
    gap: 0,
    
    borderRadius: "15px"
}
const ZoneStyle = {
    flexDirection: "column",
    alignItems: "flex-start",
    padding: "0px",
    gap: "10px",
    minWidth: "335px",
    minHeight: "534px",
    border: "1px dashed #000000"

}