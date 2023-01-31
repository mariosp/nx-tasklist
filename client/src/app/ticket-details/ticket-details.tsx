import { Ticket, User } from '@acme/shared-models';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { assignTicket, getUsernameById, markAsCompleted, markAsIncomplete, unassignTicket } from '../shared/services';
import styles from './ticket-details.module.css';

/* eslint-disable-next-line */
export interface TicketDetailsProps {
  loading: boolean;
  users: User[];
  tickets: Ticket[];
  handleChange: Function;
}

export function TicketDetails({users, tickets, loading, handleChange}: TicketDetailsProps) {
  const { id } = useParams();

  const [ticket, setTicket] = useState<Ticket>();
  const [selectedUser, setSelectedUser] = useState<string>();


  useEffect(()=>{
    if(!loading) {
      const found = tickets.find(ticket=> ticket.id === Number(id));
      found && setTicket(found);
      console.log(found)
    }
  }, [tickets])



  const handleUserChange = () => {
    if(ticket && selectedUser) {
     assignTicket(ticket.id, Number(selectedUser)).then(res=> {
      handleChange();
     })
    }
  }

  const handleUserRemoval = () => {
    if(ticket) {
     unassignTicket(ticket.id).then(res=> {
      handleChange();
     })
    }
  }

  const handleCompletionChange = () => {
    if(ticket?.completed) {
     markAsIncomplete(ticket.id).then(res=> {
      handleChange();
     })
    } else if(ticket?.completed === false) {
      markAsCompleted(ticket.id).then(res=> {
        handleChange();
       })
    }
  }
  

  const renderTicketDetails = (t: Ticket) => {
    return (
      <div>
            <div>
              Ticket No: {t.id} 
            </div>
            <div>
              Description: {t.description}
            </div>
            <div>
              assigned user: {getUsernameById(t.assigneeId, users)}
              {t.assigneeId ?
                <button onClick={handleUserRemoval}> Unassing</button> :(
                <>
                <select name="user" id="user" onChange={(e)=> setSelectedUser(e.target.value)}>
                    {users.map(user=> <option value={user.id}>{user.name}</option>)}
                </select>
                <button onClick={handleUserChange}>save</button>
                </>
                )
              }
            </div>
            <div>
              completed: {t.completed ? "true" : "false"}
              <button onClick={handleCompletionChange}>{t.completed? "mark as incomplete" : " mark as completed"}</button>
            </div>
      </div>
    )
  }

  if(!loading && !ticket) {
    return <div>No ticket found</div>
  }

  return (
    <div className={styles['container']}>
       <h2>Ticket details</h2>
       {!!ticket && renderTicketDetails(ticket)}
    </div>
  );
}

export default TicketDetails;
