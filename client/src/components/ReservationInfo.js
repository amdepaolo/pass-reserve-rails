import React, {useState} from "react";
import EditReservation from "./EditReservation";

function ReservationInfo({reservation, onEdit, onDelete}){
    const [edit, setEdit] = useState(false);

    function cleanUpDate(dateString){
        if (dateString === null) {return 'Error! No specified date!'}
        else return dateString.split('T')[0]
    }

    function cancelClick(passId, id){
        if(window.confirm("Cancel Reservation?")){
            fetch(`museum_passes/${passId}/reservations/${id}`, {
                method: 'DELETE',
                headers: { "Content-Type": "application/json" }
            }).then(r => {if (r.ok){onDelete(id)}else{window.alert("error")}})
        }
    }

    if (edit) {
        return(
            <EditReservation reservation={reservation} setEdit={setEdit} cleanUpDate={cleanUpDate} onResponse={onEdit} />
        )
    }

    else return(
        <tr>
            <td>{reservation.patron_name}</td>
            <td>{reservation.email}</td>
            <td>{reservation.phone}</td>
            <td>{reservation.patron_card}</td>
            <td>{reservation.extra_notes}</td>
            <td>{cleanUpDate(reservation.check_out)}</td>
            <td>{cleanUpDate(reservation.expected_check_in)}</td>
            <td><button onClick={()=>cancelClick(reservation.museum_pass_id,reservation.id)}>Cancel Reservation?</button></td>
            <td><button onClick={()=>setEdit(true)}>Edit Reservation?</button></td>
        </tr>
    )
}

export default ReservationInfo