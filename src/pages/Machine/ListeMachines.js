import Page from "../Page";
import MachineTable from "../../components/Table/MachineTable";
import PageHeader from "../../components/Headers/PageHeader";

export default function ListeMachines () {
    
    
    return (
        <Page title={"Machines"} className="flex flex-col h-full bg-blueGray-100" >
            <PageHeader title="Machines" />
            <div className="md:px-10 mb-20" style={{ marginTop: "-8rem" }}>
                <MachineTable/>
            </div>
            
        </Page>
    );
}



