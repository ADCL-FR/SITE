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
import { COLUMN_NAMES } from "../../constants/dragAndDrop/coloumns";

// ----------------------------------------------------------------------
//user
import PageHeader from "../../components/Headers/PageHeader";

import API from "../../api/api";

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
const fichess = [
    {
      "id": 1,
      "affectation_zone": {
        "id": 1,
        "semaine_affectation": "2023-01-30",
        "fiche": 1,
        "zone": 1
      },
      "description": "reparer machin",
      "observation": null,
      "ref_doc": null,
      "terminee": false,
      "fourniture": false,
      "date_creation": "2023-01-25",
      "date_modification": "2023-01-30T14:58:57.546097+01:00",
      "date_cloture": null,
      "affaire": 1
    },
    {
      "id": 2,
      "affectation_zone": {
        "id": 2,
        "semaine_affectation": "2023-01-30",
        "fiche": 2,
        "zone": 1
      },
      "description": "remplacer TEST",
      "observation": null,
      "ref_doc": null,
      "terminee": false,
      "fourniture": false,
      "date_creation": "2023-01-30",
      "date_modification": "2023-01-30T14:59:37.737346+01:00",
      "date_cloture": null,
      "affaire": 1
    }
  ]
const zoness = [
    {
      "id": 1,
      "fiches": [
        {
          "id": 1,
          "affectation_zone": {
            "id": 1,
            "semaine_affectation": "2023-01-30",
            "fiche": 1,
            "zone": 1
          },
          "description": "reparer machin",
          "observation": null,
          "ref_doc": null,
          "terminee": false,
          "fourniture": false,
          "date_creation": "2023-01-25",
          "date_modification": "2023-01-30T14:58:57.546097+01:00",
          "date_cloture": null,
          "affaire": 1
        },
        {
          "id": 2,
          "affectation_zone": {
            "id": 2,
            "semaine_affectation": "2023-01-30",
            "fiche": 2,
            "zone": 1
          },
          "description": "remplacer TEST",
          "observation": null,
          "ref_doc": null,
          "terminee": false,
          "fourniture": false,
          "date_creation": "2023-01-30",
          "date_modification": "2023-01-30T14:59:37.737346+01:00",
          "date_cloture": null,
          "affaire": 1
        }
      ],
      "nom": "Zone 1",
      "description": "ceci est la zone 1"
    },
    {
      "id": 2,
      "fiches": [],
      "nom": "Zone 2",
      "description": "ceci est la zone 2"
    },
    {
      "id": 4,
      "fiches": [],
      "nom": "Zone 3",
      "description": "description"
    }
  ]

export default function PlanningZone() {

   
    const [fiches, setFiches] = useState([])
    const [zones, setZones] = useState([])
    const [week, setWeek] = useState(getWeekNumber(new Date()))


    function getZones(){
        API.planning_zone(week).then((response) => {
            setZones(response.results)
        })
    }

    function get_fiches_a_planifier(){
        API.fiches_a_planifier().then((response) => {
            setFiches(response.results)
        })
    }

    // change state of zones (add or remove fiche)
    function change_fiche_from_zoneA_to_zoneB(fiche, zoneAId, zoneBId){
        let newZones = zones.map((zone) => {
            // remove fiche from zoneA
            if (zone.id === zoneAId){
                zone.fiches = zone.fiches.filter((f) => f.id !== fiche.id)
            }
            // add fiche to zoneB
            if (zone.id ===  zoneBId){
                zone.fiches.push(fiche)
            }
            return zone
        })
        setZones(newZones)
    }

    // calculate the week number
    function getWeekNumber(d) {
        d = new Date(Date.UTC(d.getFullYear(), d.getMonth(), d.getDate()));
        d.setUTCDate(d.getUTCDate() + 4 - (d.getUTCDay()||7));
        var yearStart = new Date(Date.UTC(d.getUTCFullYear(),0,1));
        var weekNo = Math.ceil(( ( (d - yearStart) / 86400000) + 1)/7);
        return weekNo;
    }

    // week number to date in format YYYY-MM-DD
    function getWeekDate(weekNumber){
        let d = new Date();
        let numDays = (weekNumber - getWeekNumber(d)) * 7;
        d.setDate(d.getDate() + numDays);
        return d.toISOString().split('T')[0];
    }
    

   
    // chaange zone fiches list given an fiche entry and remove it from other zones
    // TODO : check if the fiche was dropped from list zone
    function changeZoneFichesAndUpdateAffectation(fiche, zoneId){
        // check if the fiche is already in the zone
        if (fiche.affectation_zone?.zone == zoneId){
            return
        }
        // check if the fiche comes from list zone
        if (fiche.affectation_zone == null){
            
            let newAffectation = {
                "semaine_affectation": getWeekDate(week),
                "fiche": fiche.id,
                "zone": zoneId
            }
            API.create_affectation(newAffectation).then((response) => {
                let newZones = zones.map((z) => {
                    fiche.affectation_zone = response
                    if (z.id == zoneId){
                        z.fiches.push(fiche)
                        console.log(z)
                    }
                    return z
                })
                setZones(newZones)
            })
        
            // filter out fiche from fiches list
            setFiches(fiches.filter((f) => f.id != fiche.id))
            return
        }

        // check if the fiche comes from another zone
        if (fiche.affectation_zone.zone != zoneId){
            let affectation = fiche.affectation_zone
            let oldZoneId = affectation.zone
            affectation.zone = zoneId
            
            API.update_affectation(affectation).then((response) => {
                fiche.affectation_zone = response
                console.log("affectation updated : ", response)
                change_fiche_from_zoneA_to_zoneB(fiche, oldZoneId, zoneId)
            })
            
            return
        }
        
        
    }

    // delete affectation when delete button is clicked
    function deleteAffectation(fiche){
        let affectationId = fiche.affectation_zone.id
        
        API.delete_affectation(affectationId).then((response) => {
            console.log(response)
        })

        // remove the fiche from the zones state
        let newZones = zones.map((z) => {
            z.fiches = z.fiches.filter((f) => f.affectation_zone.id != affectationId)
            return z
        }
        )
        setZones(newZones)
        // add the fiche to the fiches list
        fiche.affectation_zone = null
        setFiches([...fiches, fiche])
    }

    useEffect(() => {
        getZones()
        get_fiches_a_planifier()
    }, [week])

    return (
        <Page title="Planning Zones" className="flex flex-col bg-blueGray-100 h-screen">
            <PageHeader title="Planning Zones"/>
            <div style={{"marginTop":"-8rem"}}>        
                <div className=" h-full h-min-330px mb-8 shadow-lg rounded-lg" style={{"marginLeft":"3rem", "marginRight":"3rem","backgroundColor":"white", "padding": "10px",}} >
                    
                    <div style={ContainerStyle}>
                        <Zone style={ZonePlannifierStyle}  title={"Fiche à plannifier"} onDrop={() => {}} accept={[]}>
                            {fiches.map(fiche => <Droppable draggable item={fiche} type="fiche" />)}
                        </Zone>
                    
                        <div style={DropZoneStyle}>
                            <div style={SelectWek}>
                                <p>Semaine :</p>
                                <Select
                                    options={options}
                                    defaultValue={{ label: week, value: week }}
                                    onChange={(e) => setWeek(e.value)}
                                    
                                />
                            </div>
                            <div style={ZoneContainer}>
                                {zones.map((zone) => {
                                    return <Zone key={zone.id} 
                                                fiches={zone.fiches} 
                                                accept={["any", "fiche"]} 
                                                style={ZoneStyle} 
                                                title={zone.nom} 
                                                onDrop={(fiche) => changeZoneFichesAndUpdateAffectation(fiche, zone.id)} 
                                                onDeleteFiche={(fiche) => deleteAffectation(fiche)}/>
                                })}
                                
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
