import { useState, useEffect } from "react";
import API from "../../api/api";
const useMachine = () => {
  const [machines, setMachines] = useState({});
  const [machine, setMachine] = useState({})
  const [formOptions, setFormOptions] = useState([]);
  const [loading, setLoading] = useState(false);

  function loadMachines() {
    return API.machine.get_machines().then((response) => {
      setMachines(response.results);
      setLoading(false);
      // append options for form
      let options = [];
      response.results.map((machine) => {
        options.push({ value: machine.id, label: machine.nom_machine });
      });
      setFormOptions(options);
      return response.results;
    });
  }

  function get_machine (machineId) {
    API.machine.get_machine(machineId).then((response) => {
      setMachine(response);
    })
  }

  function create_machine ({nom_machine, description="", fonctionnelle=true}) {
    return API.machine.create_machine({nom_machine, description, fonctionnelle})
  }

  function update_machine (machineId, data) {
    return API.machine.update_machine(machineId, data)
  }

    function delete_machine(machineID) {
        API.machine.delete_machine([machineID]).then((response) => {
            return response;
        }).catch((e) => {
            throw e;
        })
    }

  function delete_machines(machineIds = []){
    API.machine.delete_machine(machineIds).then((response) => {
      return response;
    }).catch((e) => {
      throw e;
    })
  }
  // async useEffect
  useEffect(() => {
    loadMachines();
  }, []);

  return {
    machines,
    loadMachines,
    machine,
    get_machine,
    create_machine,
    update_machine,
    delete_machine,
    delete_machines,
    formOptions,
    loading,
  };
};

export default useMachine;
