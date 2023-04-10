// React
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
// drap and drop

// ----------------------------------------------------------------------
//user

import useMachine from "../../hooks/machine/useMachine.js";
import DataTable from "react-data-table-component";
import { PATH_DASHBOARD } from "../../routes/paths";
import Button from "../../components/Elements/Button";
import MachineForm from "../Form/machines/MachineForm";
import Dialog from "@mui/material/Dialog";

const conditionalRowStyles = [
  {
    when: (row) => !row.fonctionnelle,
    style: {
      backgroundColor: "rgba(253,196,196,0.4)",
      color: "black",
    },
  },
];

export default function MachineTable() {
  const navigate = useNavigate();

  const { machines, loadMachines, delete_machines } = useMachine();
  const [loading, setLoading] = useState(false);
  const [selectedRows, setSelectedRows] = React.useState([]);
  const [toggleCleared, setToggleCleared] = React.useState(false);
  const [openDialog, setOpenDialog] = useState(false);
  const [openDialogUpdate, setOpenDialogUpdate] = useState({
    show: false,
    machineId: "",
  });

  const handleRowSelected = React.useCallback((state) => {
    const ids = state.selectedRows.map((machine) => machine.id);
    setSelectedRows(ids);
  }, []);

  const contextActions = React.useMemo(() => {
    const handleDelete = () => {
      if (window.confirm(`Etes vous sur de vouloir supprimer ces machines?`)) {
        setToggleCleared(!toggleCleared);
        delete_machines(selectedRows);
      }
    };

    return (
      <Button
        key="delete"
        onClick={handleDelete}
        style={{ backgroundColor: "red" }}
        icon
      >
        Supprimer
      </Button>
    );
  }, [selectedRows, toggleCleared]);

  const columns = [
    {
      name: "Machine",
      selector: (row) => row.nom_machine,
      sortable: true,
    },
    {
      name: "Description",
      selector: (row) => row.description,
      grow: 2,
      hide: "md",
      //right: true
    },
    {
      name: "Fonctionnelle",
      selector: (row) => row.fonctionnelle,
      center: true,
      sortable: false,
      format: (row) => (row.fonctionnelle ? "Oui" : "Non"),
    },

    {
      name: "Editer",
      center: true,
      cell: (row) => (
        <div>
          <button
            onClick={() =>
              setOpenDialogUpdate({ show: true, machineId: row.id })
            }
            style={{ all: "unset" }}
          >
            <i className="fas fa-edit" style={{ color: "orange" }}></i>
          </button>
        </div>
      ),
    },
  ];

  function actions() {
    return (
      <div>
        <Button onClick={() => setOpenDialog(true)}>Ajouter une Machine</Button>
      </div>
    );
  }

  useEffect(() => {
    loadMachines();
  }, [openDialog, openDialogUpdate.show, toggleCleared]);
  // change state of zones, move fiches from one zone to another with affaire infos

  return (
    <>
      <DataTable
        style={{ marginLeft: "15px" }}
        title={"Gestion des machines"}
        columns={columns}
        data={machines}
        progressPending={loading}
        selectableRows={true}
        conditionalRowStyles={conditionalRowStyles}
        dense
        highlightOnHover
        pointerOnHover
        onRowDoubleClicked={(row) => {}}
        actions={actions()}
        contextActions={contextActions}
        onSelectedRowsChange={handleRowSelected}
        clearSelectedRows={toggleCleared}
      />
      <Dialog
        open={openDialog}
        onClose={() => {
          setOpenDialog(false);
        }}
      >
        <MachineForm update={false} />
      </Dialog>

      <Dialog
        open={openDialogUpdate?.show}
        onClose={() => {
          setOpenDialogUpdate(false);
        }}
      >
        <MachineForm update={true} machineId={openDialogUpdate.machineId} />
      </Dialog>
    </>
  );
}
