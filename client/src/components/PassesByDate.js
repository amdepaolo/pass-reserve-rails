import React from "react";

function PassesByDate({dateReservations, passes }){
    const resPassIdArr = dateReservations.map( reservation => reservation.museum_pass_id)
    const passStatusArray = passes.map( pass => {
        if(resPassIdArr.includes(pass.id)){
            return (<p>{pass.name}: RESERVED</p>)
        }else{return(<p>{pass.name}: AVAILABLE</p>)}
    })

    return(
        <div>
            <h3>Pass Status</h3>
            {passStatusArray}
        </div>
    )
}