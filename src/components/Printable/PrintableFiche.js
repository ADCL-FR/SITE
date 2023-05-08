import {useEffect, useState, useRef, forwardRef} from "react";
import Barcode from 'react-barcode';

import API from "../../api/api";
import {useReactToPrint} from "react-to-print";


export const PrintableFiche = forwardRef(({ficheData}, ref) => {

    const [etapesSorted, setEtapesSorted] = useState([]);

    function sortEtapes(etapes) {
        if (etapes) {
            const sorted = etapes.sort((a, b) => {
                return a.num_etape - b.num_etape;
            });
            setEtapesSorted(sorted);
            console.log("sorted", sorted);
        }
    }

    useEffect(() => {
        if (ficheData?.etapes) {
            sortEtapes(ficheData.etapes);
        }
    }, [ficheData?.etapes]);
    return (
        <div ref={ref} className="w-full text-center p-4">
            <style type="text/css" media="print">{"\
                 @page {\ size: landscape;\ }\
        "}</style>

                <div style={{border: "3px solid black"}} id="header" className="flex flex-row justify-between rounded mb-8">

                    <div style={{borderRight: "3px solid black"}} className=" w-5/12 flex flex-col whitespace-nowrap p-4 justify-center items-center" >
                        <h1 className="text-2xl font-bold">SGM</h1>
                        <h3 className="text-xl font-bold">Affaire: {ficheData.num_affaire}</h3>
                    </div>
                    <div style={{borderRight: "3px solid black"}} className="flex w-full justify-center p-4 items-center">
                        <h3 className="text-xl font-bold">Fiche : {ficheData.titre}</h3>
                    </div>
                    <div className="flex p-4 justify-center content-center w-5/12 max-w-3/12">
                        <Barcode value={`AF${ficheData.num_affaire}`} height={30} displayValue={true}  />
                    </div>
                </div>

            <table className="table-auto border rounded w-full">
                <thead className="rounded">
                <tr className="rounded">
                    <th className="border-2 rounded border-black px-4 py-2">N°Étape</th>
                    <th className="border-2 border-black px-4 py-2">Plan</th>
                    <th className="border-2 border-black px-4 py-2">Rep</th>
                    <th className="border-2 border-black px-4 py-2">Machine</th>
                    <th className="border-2 border-black px-4 py-2">Déscription</th>
                    <th className="border-2 border-black px-4 py-2">Quantité</th>
                    <th className="border-2 border-black px-4 py-2">Temps</th>
                </tr>
                </thead>
                <tbody >
                {
                    etapesSorted.map((etape, index) => (
                        <tr key={etape.id} className="mb-8">
                            <td className="border-2 border-github-active px-4 py-2">{etape.num_etape}</td>
                            <td className="border border-github-regular px-4 py-2">{etape.plan}</td>
                            <td className="border border-github-regular px-4 py-2">{etape.rep}</td>
                            <td className="border border-github-regular px-4 py-2">{etape.machine.nom_machine}</td>
                            <td className="border border-github-regular px-4 py-2">{etape.description}</td>
                            <td className="border border-github-regular px-4 py-2">{etape.quantite}</td>
                            <td className="border border-github-regular px-4 py-2">{etape.temps}</td>
{/*
                            <td className="border border-github-regular px-4 py-2"><Barcode value={`AF${ficheData.num_affaire}`} height={20} displayValue={false}  /></td>
*/}
                        </tr>
                    ))
                }
                </tbody>
            </table>
            <div className="fixed bottom-0 left-0 right-0 text-center p-4 text-sm bg-white">
                <p>Imprimé le: {new Date().toLocaleDateString()}</p>
            </div>
        </div>
    )
});

