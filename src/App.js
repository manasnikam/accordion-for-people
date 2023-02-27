import './App.css';
import React from 'react';

import DeleteDialog from './component/DeleteDialog';
import AccordianItem from './component/AccordionItem';

import { useAccordion } from './core/context/AccordionContext';

const App = () => {

  const { search, setSearch, getCelebrities } = useAccordion()

  return (
    <div>
      <div className='search'>
        <input placeholder='Search User' className='search-field' type='text' value={search} onChange={e => setSearch(e.target.value)} />
      </div>
      {getCelebrities.map(celeb => <AccordianItem key={celeb.id} celebrity={celeb}/>)}
      <DeleteDialog />
    </div>
  );
}

export default App;
