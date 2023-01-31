import { Ticket, User } from '@acme/shared-models';
import { FormEvent, useState } from 'react';
import { Link } from 'react-router-dom';
import { getUsernameById } from '../shared/services';
import styles from './tickets.module.css';

export interface TicketsProps {
  tickets: Ticket[];
  users: User[];
  loading: boolean;
  handleNewTicket: Function;
}

export function Tickets({tickets, users, loading, handleNewTicket}: TicketsProps) {

  const [inputValue, setInputValue] = useState("");

  const handleFormSubmit = (e: FormEvent)=> {
    e.preventDefault();
    console.log(inputValue)
    handleNewTicket(inputValue);
    setInputValue("");
  }



  const renderList = () =>{
    return tickets.map((t) => (
      <li className={`${styles['item']} ${t.completed && styles['itemCompleted']}`} key={t.id}>
        <Link to={`${t.id}`} className={styles['link']}>
          <div>
            Ticket: {t.id} 
          </div>
          <div>
            {t.description}
          </div>
          <div>
            assigned to: {getUsernameById(t.assigneeId, users)}
          </div>
        </Link>
      </li>
    ));
  }

  const renderForm = ()=>{
    return (
      <form onSubmit={handleFormSubmit}>
        <label>
          New ticket:
          <input className={styles['inputAdd']} type="text" value={inputValue} onChange={(e)=>setInputValue(e.target.value)} />
        </label>
        <input type="submit" value="Submit" />
      </form>
    );
  }

  return (
    <div className={styles['tickets']}>
      <h2>Tickets</h2>
      {renderForm()}
      {loading && <span>...Loading</span>}
      {!loading}
      {!loading && tickets.length ?
        (
          <ul className={styles['listWrapper']}>
            {renderList()}
          </ul>
        ):
        (  
          <span>No tickets</span>
        )
      }
    </div>
  );
}

export default Tickets;
