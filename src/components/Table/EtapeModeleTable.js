import { useEffect, useState } from "react";
import { useFicheModele } from "../../hooks/modeles/useFicheModele";
import DataTable from "react-data-table-component";
export default function EtapeModeleTable({ ficheId }) {
  const columns_etapes = [
    {
      name: "Numéro",
      selector: (row) => row.num_etape,
      sortable: true,
    },
    {
      name: "Machine",
      selector: (row) => row.machine?.nom_machine || null,
      center: true,
    },
    {
      name: "REP",
      selector: (row) => row.rep,
      center: true,
    },
    {
      name: "Plan",
      selector: (row) => row.plan,
      center: true,
    },
    {
      name: "Quantité",
      selector: (row) => row.quantite,
      center: true,
    },
    {
      name: "Temps",
      selector: (row) => row.temps,
      center: true,
    },
    {
      name: "Terminée",
      selector: (row) => (row.terminee ? "Oui" : "Non"),
      center: true,
    },
    // edit button
    {
      name: "Editer",
      center: true,
      cell: (row) => (
        <div>
          <button
            onClick={() => console.log({ show: true, data: row })}
            style={{ all: "unset" }}
          >
            <i className="fas fa-edit" style={{ color: "orange" }}></i>
          </button>
        </div>
      ),
    },
  ];

  const [etapes, setEtapes] = useState([]);
  const { fiche, loadFicheModele } = useFicheModele();

  useEffect(() => {
    loadFicheModele(ficheId).then((res) => {
      console.log("res:", res);
      setEtapes(res.etapes_modele);
    });
  }, [ficheId]);

  return (
    <DataTable
      title="Etapes"
      columns={columns_etapes}
      data={etapes}
      dense
      customStyles={customStyles}
    />
  );
}

const customStyles = {
  header: {
    style: {
      // ligt grey but visible
      //borderTop: "2px solid #e0e0e0",
      borderLeft: "2px solid #e0e0e0",
      borderRight: "2px solid #e0e0e0",
    },
  },
  tableWrapper: {
    style: {
      // ligt grey but visible
      borderBottom: "2px solid #e0e0e0",
      borderLeft: "2px solid #e0e0e0",
      borderRight: "2px solid #e0e0e0",
    },
  },
  rows: {
    style: {
      paddingLeft: "8px", // override the cell padding for data cells
    },
  },
  headRow: {
    style: {
      paddingLeft: "8px", // override the cell padding for head cells
    },
  },
};
