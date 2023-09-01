import React, {useState} from 'react'

function ReservationForm({passId, passName, onResponse}){
    const blankFormObj = {
        patron_name: '', 
        email: '', 
        check_out: '',
        patron_card: '',
        phone: '',
        extra_notes: ''
    }
    const [resFormObj, setResFormObj] = useState( blankFormObj)
    const disableButton = passId === undefined? true: false

    function updateResForm(key, value){
       const updatedResForm = {...resFormObj, [key]:value};
       setResFormObj(updatedResForm)
    }

    function handleSubmit(e){
        e.preventDefault();
        fetch(`/museum_passes/${passId}/reservations`, {
            method: 'POST',
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(resFormObj)
        })
        .then(r => r.json())
        .then(onResponse) 
        .then(()=>setResFormObj(blankFormObj))    
    }

    return(
        <form className='panel'>
            <h2>Create Reservation for {passName}</h2>
            <label>Name: </label>
            <input
                value={resFormObj.name} 
                onChange={e => updateResForm('patron_name', e.target.value)} 
                type='text' 
            /><br/>
            <label>Email: </label>
            <input 
                value={resFormObj.email}
                onChange={e => updateResForm('email', e.target.value)}
                type='text'
            /><br/>
            <label>Phone Number: </label>
            <input 
                value={resFormObj.phone}
                onChange={e => updateResForm('phone', e.target.value)}
                type='text'
            /><br/><label>Patron Card: </label>
            <input 
                value={resFormObj.patron_card}
                onChange={e => updateResForm('patron_card', e.target.value)}
                type='text'
            /><br/>
            <label>Extra Notes: </label>
            <input 
                value={resFormObj.extra_notes}
                onChange={e => updateResForm('extra_notes', e.target.value)}
                type='text'
            /><br/>
            <label>Choose Date: </label>
            <input 
                value={resFormObj.check_out}
                onChange={e => updateResForm('check_out', e.target.value)} 
                type='date' 
            />
            <button onClick={handleSubmit} disabled={disableButton}>Submit</button>
        </form>
    )
}

export default ReservationForm