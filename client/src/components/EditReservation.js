import React,{useState} from "react";

function EditReservation({reservation, setEdit, cleanUpDate, onResponse}){
    const [editResObj, setEditResObj] = useState(reservation)

    function updateEditResObj(key, value){  
        const updatedEditRes = {...editResObj, [key]:value};
        setEditResObj(updatedEditRes)
        console.log(editResObj)
    }

    function saveEdit(){
        fetch(`/museum_passes/${reservation.museum_pass_id}/reservations/${reservation.id}`, {
            method: 'PATCH',
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(editResObj)
        })
        .then(r => r.json())
        .then(onResponse)
        .then(()=>setEdit(false))
    }

    return (
        <tr>
            <td><input type='text' value={editResObj.patron_name} onChange={e =>updateEditResObj('name', e.target.value)} /></td>
            <td><input type='text' value={editResObj.email} onChange={e =>updateEditResObj('email', e.target.value)}/></td>
            <td><input type='text' value={editResObj.phone} onChange={e =>updateEditResObj('phone', e.target.value)}/></td>
            <td><input type='text' value={editResObj.partron_card} onChange={e =>updateEditResObj('patron_card', e.target.value)}/></td>
            <td><input type='text' value={editResObj.extra_notes} onChange={e =>updateEditResObj('extra_notes', e.target.value)}/></td>
            <td><input type='date' value={cleanUpDate(editResObj.check_out)} onChange={e =>updateEditResObj('check_out', e.target.value)}/></td>
            <td><input type='date' value={cleanUpDate(editResObj.expected_check_in)} onChange={e =>updateEditResObj('expected_check_in', e.target.value)} /></td>
            <td><button onClick={()=>setEdit(false)}>Don't save edit?</button></td>
            <td><button onClick={saveEdit}>Save Edit?</button></td>
        </tr>
    )
}

export default EditReservation