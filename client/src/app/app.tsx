import { useEffect, useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import { Ticket, User } from '@acme/shared-models';

import styles from './app.module.css';
import Tickets from './tickets/tickets';
import { addTicket, fetchTickets, fetchUsers } from './shared/services';
import TicketDetails from './ticket-details/ticket-details';

const App = () => {
  const [tickets, setTickets] = useState([] as Ticket[]);
  const [loadingTickets, setLoadingTickets] = useState(true);
  const [users, setUsers] = useState([] as User[]);
  const [loadingUsers, setLoadingUsers] = useState(true);

  // Very basic way to synchronize state with server.
  // Feel free to use any state/fetch library you want (e.g. react-query, xstate, redux, etc.).


  useEffect(() => {
    fetchTickets().then(res=>{
      setTickets(res);
      setLoadingTickets(false);
    });

    fetchUsers().then(res=>{
      setUsers(res);
      setLoadingUsers(false);
    });
  }, []);

  const handleNewTicket= async (ticketDesciption: string) => {
    setLoadingTickets(true);
    try{
      await addTicket({description: ticketDesciption});
      const data = await fetchTickets();
      setTickets(data);
    } catch(err) {
      console.log(err);
    }
    setLoadingTickets(false);
  }

  const fetchaAfterChange = async ()=> {
    setLoadingTickets(true);
    try{
      const data = await fetchTickets();
      setTickets(data);
    } catch(err) {
      console.log(err);
    }
    setLoadingTickets(false);
  }

  return (
    <div className={styles['app']}>
      <h1 className={styles['title']}>Ticketing App</h1>
      <Routes>
        <Route 
          path="/" 
          element={<Tickets
            loading={loadingTickets || loadingUsers? true : false} 
            tickets={tickets} 
            users={users}
            handleNewTicket={handleNewTicket}
          />}
        />
        {/* Hint: Try `npx nx g component TicketDetails --project=client --no-export` to generate this component  */}
        <Route path="/:id" element={<TicketDetails loading={loadingTickets || loadingUsers? true : false}  users={users} tickets={tickets} handleChange={fetchaAfterChange} />} />
      </Routes>
    </div>
  );
};


export default App;
