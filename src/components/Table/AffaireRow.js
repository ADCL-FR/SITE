export default function AffaireRow({key, row}) {

    return (

        <tr key={key}>
            <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                {row.raison}
            </td>
            <td className="text-left">{row.client_detail?.raison ? row.client_detail.raison : '' }</td>
            <td>{row.montant}</td>
            <td>{row.charge_affaire_detail?.nom}</td>
            <td>{row.date_creation}</td>
            <td>{row.date_rendu}</td>
            <td>{row.statut_detail?.description}</td>


        </tr>


    );

}