import './App.css'
import ClientTable from './components/ClientTable'
import clientsData from "./assets/data.json";
import type { Client } from './utils/types';

function App() {
   
  const clients = clientsData as Client[];
  return (
    <>
       <ClientTable clients={clients}/>
    </>
  )
}

export default App
