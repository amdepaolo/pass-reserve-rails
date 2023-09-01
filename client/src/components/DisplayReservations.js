import React  from "react";
import ReservationInfo from "./ReservationInfo";

function DisplayReservations({currentPass, onDelete, onEdit}){
    const reservations = currentPass.reservations;
    const reservationList = reservations.map(reservation =>{
        return (
            <ReservationInfo key={reservation.id} reservation={reservation} onDelete={onDelete} onEdit={onEdit}/>
        )
    })

    return(
        <div className="reservations">
            <h2>Reservations for {currentPass.name}:</h2>
            <p><b>Website:</b> {currentPass.website}</p>
            <p><b>Additional Info:</b> {currentPass.additional_info}</p>
            <table className="reservations">
                <thead>
                    <th>Patron Name</th>
                    <th>Email</th>
                    <th>Phone Number</th>
                    <th>Patron Card</th>
                    <th>Extra Notes</th>
                    <th>Check-out Date</th>
                    <th>Check-in Date</th>
                    <th>Cancel?</th>
                    <th>Edit?</th>
                </thead>
                <tbody>
                    {reservationList}
                </tbody>
            </table>
        </div>
    )
}

export default DisplayReservations