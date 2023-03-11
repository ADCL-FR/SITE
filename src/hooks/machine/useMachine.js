import { useState, useEffect } from "react";
import API from "../../api/api";
const useMachine = () => {
  const [machines, setMachines] = useState({});
  const [formOptions, setFormOptions] = useState([]);
  const [loading, setLoading] = useState(false);

  function loadGroupes() {
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
  // async useEffect
  useEffect(() => {
    loadGroupes();
  }, []);

  return {
    groupes,
    formOptions,
    loading,
  };
};

export default useMachine;
