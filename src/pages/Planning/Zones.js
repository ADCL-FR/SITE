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
import {getWeeksInYear, getYearsRange, getDateFromWeek, getWeekNumber} from "../../utils/dates";

export default function PlanningZone() {
  const [affaires, setAffaires] = useState([]);
  const [zones, setZones] = useState([]);

  const [year, setYear] = useState(new Date().getFullYear());
  const [week, setWeek] = useState(getWeekNumber(new Date(), year));



  const get_planning_zone = () => {
    API.planning_zone(year, week).then((response) => {
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
        semaine_affectation: getDateFromWeek(year, week),
        etape: etapeId,
        zone: zoneId,
      };
      API.create_affectation(newAffectation).then((response) => {
        get_planning_zone();
      });
    } else {
      let affectation = {
        semaine_affectation: getDateFromWeek(year, week),
        etape: etapeId,
        zone: zoneId,
      };
      API.update_affectation(affectationId, affectation).then((response) => {
        get_planning_zone();
      });
    }
    API.fiches_ajustage_a_planifier().then((response) => {
      setAffaires(response.results);
    });
  };

  useEffect(() => {
    API.planning_zone(year, week).then((response) => {
      setZones(response.results);
    });

    API.fiches_ajustage_a_planifier().then((response) => {
      setAffaires(response.results);
    });
  }, [year, week]);

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
                      week={getDateFromWeek(year, week)}
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
  overflow: "auto",
};
const ZoneStyle = {
  flexDirection: "column",
  alignItems: "flex-start",
  padding: "0px",
  gap: "10px",
  width: "100%",
  height: "100%",
  overflow: "auto",
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
  overflow: "auto",
};

const SelectWeek = {
  display: "flex",
  flexDirection: "row",
  gap: "10px",
  alignItems: "center",
  marginBottom: "10px",
  marginLeft: "10px",
};
