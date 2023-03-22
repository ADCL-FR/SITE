// React
import React, { useEffect, useState } from "react";

// components
import Page from "../Page";
import ZoneDropAffaires from "../../components/Zones/ZoneDropFiches";
import Select from "react-select";

import { useEtape } from "../../hooks/etape/useEtape";
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
  const { create_affectation_zone_etape, update_affectation_zone_etape } =
    useEtape();

  // change state of zones, move fiches from one zone to another with affaire infos
  function change_fiche_from_zoneA_to_zoneB(fiche, zoneAId, zoneBId) {
    // remove fiche from zone A
    let newZones = zones.map((zone) => {
      if (zone.id === zoneAId) {
        zone.affaires = zone.affaires.map((affaire) => {
          affaire.fiches = affaire.fiches.filter(
            (ficheInZone) => ficheInZone.id !== fiche.id
          );
          return affaire;
        });
      }
      return zone;
    });
    // add fiche to zone B and create affaire if not exist
    newZones = newZones.map((zone) => {
      if (zone.id === zoneBId) {
        zone.affaires = zone.affaires.map((affaire) => {
          if (affaire.id === fiche.affaire) {
            affaire.fiches.push(fiche);
          }
          return affaire;
        });
        // if affaire is not in zone B
        if (!zone.affaires.some((affaire) => affaire.id === fiche.affaire)) {
          let newAffaire = {
            id: fiche.affaire,
            raison: fiche.affaire_raison,
            fiches: [fiche],
            charge_affaire: fiche.charge_affaire,
          };
          zone.affaires.push(newAffaire);
        }
      }
      return zone;
    });
    setZones(newZones);
  }

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

  // chaange zone fiches list given an fiche entry and remove it from other zones
  // TODO : check if the fiche was dropped from list zone
  function changeZoneFichesAndUpdateAffectation(fiche, zoneId) {
    // check if the fiche is already in the zone
    if (fiche.affectation_zone?.zone === zoneId) {
      return;
    }
    // check if the fiche comes from list zone
    if (fiche.affectation_zone === null) {
      let newAffectation = {
        semaine_affectation: getWeekDate(week),
        fiche: fiche.id,
        zone: zoneId,
      };
      API.create_affectation(newAffectation).then((response) => {
        let newZones = zones.map((z) => {
          fiche.affectation_zone = response;
          if (z.id === zoneId) {
            z.affaires = z.affaires.map((a) => {
              if (a.id === fiche.affaire) {
                a.fiches.push(fiche);
              }
              return a;
            });
            // if affaire is not in zone B
            if (!z.affaires.some((affaire) => affaire.id === fiche.affaire)) {
              let newAffaire = {
                id: fiche.affaire,
                raison: fiche.affaire_raison,
                fiches: [fiche],
                charge_affaire: fiche.charge_affaire,
              };
              z.affaires.push(newAffaire);
            }
          }
          return z;
        });
        setZones(newZones);
        // filter out fiche from fiches/affaires list
      });

      // filter out fiche from affaires list
      let newAffaires = affaires.map((a) => {
        a.fiches = a.fiches.filter((f) => f.id !== fiche.id);
        return a;
      });
      setAffaires(newAffaires);
      return;
    }

    // check if the fiche comes from another zone
    if (fiche.affectation_zone.zone !== zoneId) {
      let affectation = fiche.affectation_zone;
      let oldZoneId = affectation.zone;
      affectation.zone = zoneId;

      API.update_affectation(affectation).then((response) => {
        fiche.affectation_zone = response;
        change_fiche_from_zoneA_to_zoneB(fiche, oldZoneId, zoneId);
      });

      return;
    }
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
