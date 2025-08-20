import './App.css'

import ClientTable from './components/ClientTable'
import FilterData from './components/FilterData';

import clientsData from "./assets/data.json";
import type { Client } from './utils/types';
import { useState } from 'react';

function App() {
   
  const clients = clientsData as Client[];
  const [activeClientType, setActiveClientType] = useState<string>("All");

  return (
    <>
      <div className='px-8 py-4 border-b border-b-gray-300'>
        <h2 className='font-bold text-xl'>Clients</h2>
      </div>
      <div className='px-8 py-4'>
        <FilterData activeClientType={activeClientType} setActiveClientType={setActiveClientType}/>
        <ClientTable clients={clients} activeClientType={activeClientType} />
      </div>
    </>
  )
}

export default App
