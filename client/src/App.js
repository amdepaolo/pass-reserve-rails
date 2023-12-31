// import './App.css';
import { useEffect, useState } from 'react'; 
import ReservationForm from './components/ReservationForm';
import Passes from './components/Passes';
import DisplayReservations from './components/DisplayReservations';
import CreatePassForm from './components/CreatePassForm';
import Grid from '@mui/material/Unstable_Grid2';

function App() {
  const [passes, setPasses] = useState([]);
  const [currentPass, setCurrentPass] = useState({reservations:[]});

  useEffect(()=>{
    fetch('/museum_passes')
    .then(r => r.json())
    .then(setPasses)
  },[])

  function handlePassClick(id){
    fetch(`/museum_passes/${id}`)
    .then(r => r.json())
    .then(setCurrentPass)
  }

  function updatePasses(response){
    const updatedPasses = [...passes, response];
    setPasses(updatedPasses);
  };

  function updateReservations(response){
    if (!response.error){
      const updatedPass = {...currentPass, reservations: response};
      console.log(updatedPass);
      setCurrentPass(updatedPass)
    } else {window.alert(response.error)}
  };

  function updateResWithEdit(response){
    if (!response.error){
      const updatedResArr = currentPass.reservations.map(reservation =>{
        if (reservation.id === response.id){
          return response
        }
        else return reservation
      });
      const updatedPass = {...currentPass, reservations: updatedResArr};
      setCurrentPass(updatedPass)
    } else {window.alert(response.error)}
  };

  function updateResWithDelete(deletedId){
    const updatedResArr = currentPass.reservations.filter(reservation => reservation.id !== deletedId);
    const updatedPass = {...currentPass, reservations: updatedResArr};
    setCurrentPass(updatedPass)
  }
  
  return (
    <div className="App">
      <h1>Library Museum Pass Reservations</h1>
      <Grid container>
        <Grid xs={10} md={4}>
          <Passes passes={passes} onPassClick={handlePassClick}/>
        </Grid>
        <Grid xs={10} md={8}>
          <CreatePassForm onResponse={updatePasses}/>
        </Grid>
        <Grid xs={10} md={4}>
          <ReservationForm passId={currentPass.id} passName={currentPass.name} onResponse={updateReservations}/>
        </Grid>
        <Grid xs={10} md={8}>
          <DisplayReservations currentPass={currentPass} onEdit={updateResWithEdit} onDelete={updateResWithDelete}/>
        </Grid>
      </Grid>
    </div>
  );
}

export default App;
