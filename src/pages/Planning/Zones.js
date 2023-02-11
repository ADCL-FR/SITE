// React
import React, { useEffect, useState } from "react";

// components
import Page from "../Page";
import ZoneDropAffaires from "../../components/Zones/ZoneDropFiches";
import Select from "react-select";

// drap and drop

// ----------------------------------------------------------------------
//user
import PageHeader from "../../components/Headers/PageHeader";

import API from "../../api/api";

let options = [];
for (let i = 1; i <= 52; i++) {
  options.push({ value: i, label: i });
}

const zoness = [
  {
    id: 1,
    nom: "Zone 1",
    description: "ceci est la zone 1",
    affaires: [
      {
        id: 1,
        raison: "Affaire 1",
        fiches: [
          {
            id: 8,
            affectation_zone: {
              id: 60,
              semaine_affectation: "2023-02-19",
              fiche: 8,
              zone: 1,
            },
            description: "fiche 2 pr affaire 1",
            observation: null,
            ref_doc: null,
            terminee: false,
            fourniture: false,
            date_creation: "2023-02-09",
            date_modification: "2023-02-09T10:19:39.444219+01:00",
            date_cloture: null,
            affaire: 1,
          },
        ],
        charge_affaire: "ezfzef",
      },
    ],
  },
  {
    id: 2,
    nom: "Zone 2",
    description: "ceci est la zone 2",
    affaires: [],
  },
  {
    id: 4,
    nom: "Zone 3",
    description: "description",
    affaires: [],
  },
];

export default function PlanningZone() {
  const [affaires, setAffaires] = useState([]);
  const [zones, setZones] = useState(zoness);
  const [week, setWeek] = useState(getWeekNumber(new Date()));

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
        console.log("affectation updated : ", response);
        change_fiche_from_zoneA_to_zoneB(fiche, oldZoneId, zoneId);
      });

      return;
    }
  }

  // delete affectation when delete button is clicked
  async function deleteAffectation(fiche) {
    let affectationId = fiche.affectation_zone.id;

    await API.delete_affectation(affectationId).then((response) => {
      console.log(response);
    });

    // remove the fiche from the zones -> affaires state
    let newZones = zones.map((zone) => {
      zone.affaires = zone.affaires.map((affaire) => {
        affaire.fiches = affaire.fiches.filter(
          (ficheInZone) => ficheInZone.id !== fiche.id
        );
        return affaire;
      });
      return zone;
    });
    setZones(newZones);

    // TODO: change state and do not call API again
    API.fiches_ajustage_a_planifier().then((response) => {
      setAffaires(response.results);
    });
  }

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
              affaires={affaires}
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
                      isZone={true}
                      affaires={zone.affaires}
                      accept={["any", "fiche"]}
                      style={ZoneStyle}
                      title={zone.nom}
                      onDrop={(fiche) =>
                        changeZoneFichesAndUpdateAffectation(fiche, zone.id)
                      }
                      onDeleteFiche={(fiche) => deleteAffectation(fiche)}
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
  gap: 0,
  width: "100%",
  height: "100%",
  borderRadius: "15px",
};
const ZoneStyle = {
  flexDirection: "column",
  alignItems: "flex-start",
  padding: "0px",
  gap: "10px",
  width: "100%",
  height: "100%",
  border: "1px dashed #000000",
};

const ZonePlannifierStyle = {
  flexDirection: "column",
  alignItems: "flex-start",
  padding: "0px",
  gap: "10px",
  width: "30%",
  border: "1px dashed #000000",
};

const SelectWek = {
  display: "flex",
  flexDirection: "row",
  gap: "10px",
  alignItems: "center",
  marginBottom: "10px",
};
