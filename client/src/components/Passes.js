import React from "react";

function Passes({passes, onPassClick}){
    const listOfPasses = passes.map(pass => {
        return(
            <tr key={pass.id}>
                <td>{pass.name}</td>
                <td>{pass.website}</td>
                <td><button  onClick={() => onPassClick(pass.id)}>Select</button></td>
            </tr>
        )
    })

    return(
        <div className="panel">
            <h2>Museum Passses:</h2>
            <table>
                <thead>
                    <th>Facility Name</th>
                    <th>Facility Website</th>
                    <th> </th>
                </thead>
                <tbody>
                    {listOfPasses}    
                </tbody>
            </table>
        </div>
        
    )
}

export default Passes