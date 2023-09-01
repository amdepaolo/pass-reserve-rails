import React, {useState} from "react";

function CreatePassForm({onResponse}){
    const [passForm, setPassForm] = useState({name: '', website:'', additional_info: ''})

    function updatePassForm(key,value){
        const updatedForm = {...passForm, [key]:value};
        setPassForm(updatedForm);
    }

    function handleSubmit(e){
        e.preventDefault();
        fetch(`/museum_passes`, {
            method: 'POST',
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(passForm)
        })
        .then(r => r.json())
        .then(onResponse)
        .then(()=>setPassForm({name:'', website:'', additional_info:''}))     
    }
    
    return(
        <form className="panel">
            <h2>Add Pass</h2>
            <label>Museum or Facility Name:</label>
            <input 
                value={passForm.name}
                onChange={e=>updatePassForm('name', e.target.value)} 
                type='text'>
            </input><br/>
            <label>Website:</label>
            <input 
                value={passForm.website}
                onChange={e=>updatePassForm('website', e.target.value)} type='text'>
            </input>
            <label>Extra Information:</label>
            <textarea 
                onChange={e=>updatePassForm('additional_info', e.target.value)}
                value={passForm.additional_info}>

            </textarea>
            <input onClick={handleSubmit} type='submit'/>
        </form>
    )
}

export default CreatePassForm