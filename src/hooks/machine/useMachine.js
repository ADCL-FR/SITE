import { useState, useEffect } from "react";
import API from "../../api/api";
const useMachine = () => {
  const [machines, setMachines] = useState({});
  const [formOptions, setFormOptions] = useState([]);
  const [loading, setLoading] = useState(false);

  function loadMachines() {
    API.machine.get_machines().then((response) => {
      setMachines(response.results);
      setLoading(false);
      // append options for form
      let options = [];
      response.results.map((machine) => {
        options.push({ value: machine.id, label: machine.nom_machine });
      });
      setFormOptions(options);
    });
  }

  function create_machine () {
    // create machine
  }

  function delete_machine() {
    // delete machine
  }
  // async useEffect
  useEffect(() => {
    loadMachines();
  }, []);

  return {
    machines,
    loadMachines,
    create_machine,
    delete_machine,
    formOptions,
    loading,
  };
};

export default useMachine;
