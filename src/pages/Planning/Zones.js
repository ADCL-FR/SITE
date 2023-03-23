// React
import React, { useEffect, useState } from "react";

// components
import Page from "../Page";
import ZoneDropAffaires from "../../components/Zones/ZoneDropFiches";
import Select from "react-select";

// ----------------------------------------------------------------------
//user
import PageHeader from "../../components/Headers/PageHeader";

import API from "../../api/api";

let options = [];
for (let i = 1; i <= 52; i++) {
  options.push({ value: i, label: i });
}

export default function PlanningZone() {
  const [affaires, setAffaires] = useState([]);
  const [zones, setZones] = useState([]);
  const [week, setWeek] = useState(getWeekNumber(new Date()));

  // calculate the week number
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

  const get_planning_zone = () => {
    API.planning_zone(week).then((response) => {
      setZones(response.results);
    });
  };

  const handle_affectation_delete = (affectationId) => {
    API.delete_affectation(affectationId).then((response) => {
      get_planning_zone();
      API.fiches_ajustage_a_planifier().then((response) => {
        setAffaires(response.results);
      });
    });
  };

  const handle_etape_drop = (etapeId, zoneId, affectationId = null) => {
    if (affectationId === null) {
      let newAffectation = {
        semaine_affectation: getWeekDate(week),
        etape: etapeId,
        zone: zoneId,
      };
      API.create_affectation(newAffectation).then((response) => {
        get_planning_zone();
      });
    } else {
      let affectation = {
        semaine_affectation: getWeekDate(week),
        etape: etapeId,
        zone: zoneId,
      };
      API.update_affectation(affectationId, affectation).then((response) => {
        get_planning_zone();
      });
    }
    API.fiches_ajustage_a_planifier().then((response) => {
      setAffaires(response.results);
      // wait 200ms
    });
  };

  useEffect(() => {
    API.planning_zone(week).then((response) => {
      setZones(response.results);
    });

    API.fiches_ajustage_a_planifier().then((response) => {
      setAffaires(response.results);
    });
  }, [week]);

  return (
    <Page
      title="Planning Zones"
      className="flex flex-col bg-blueGray-100 h-screen"
    >
      <PageHeader title="Planning Zones" />
      <div style={{ marginTop: "-8rem" }}>
        <div
          className=" h-full h-min-330px mb-8 shadow-lg rounded-lg"
          style={{
            marginLeft: "3rem",
            marginRight: "3rem",
            backgroundColor: "white",
            padding: "10px",
          }}
        >
          <div style={ContainerStyle}>
            <ZoneDropAffaires
              style={ZonePlannifierStyle}
              title={"Fiche à plannifier"}
              onDrop={() => {}}
              accept={[]}
              affaires_data={affaires}
              isZone={false}
            />

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
                  return (
                    <ZoneDropAffaires
                      key={zone.id}
                      id={zone.id}
                      isZone={true}
                      affaires_data={zone.affaires}
                      accept={["any", "fiche", "etape"]}
                      style={ZoneStyle}
                      title={zone.nom}
                      onDrop={(etapeId, affectationId) =>
                        handle_etape_drop(etapeId, zone.id, affectationId)
                      }
                      onDeleteAffectation={(id) =>
                        handle_affectation_delete(id)
                      }
                      week={getWeekDate(week)}
                    />
                  );
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
  display: "flex",
  width: "100%",
  justifyContent: "space-around",
  height: "60vh",

  gap: "10px",
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
  height: "100%",
  borderRadius: "15px",
};
const ZoneStyle = {
  flexDirection: "column",
  alignItems: "flex-start",

  backgroundColor: "rgb(246, 248, 250)",
  gap: "10px",
  width: "100%",
  height: "100%",
  "border-radius": "6px",
  border: "1px solid rgb(216, 222, 228)",
};

const ZonePlannifierStyle = {
  flexDirection: "column",
  alignItems: "flex-start",
  padding: "0px",
  gap: "10px",
  width: "30%",
  "border-radius": "6px",
  border: "1px solid rgb(216, 222, 228)",
};

const SelectWek = {
  display: "flex",
  flexDirection: "row",
  gap: "10px",
  alignItems: "center",
  marginBottom: "10px",
};
