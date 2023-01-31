import { User } from "@acme/shared-models";

export const getUsernameById = (id: number | null, users: User[]) => {
    if(id === null) return null;
    const user = users.find(user=> user.id === id);
    return user?.name;
} 


export const fetchTickets = async()=> {
    const data = await fetch('/api/tickets');
    return await data.json();
}

export const fetchUsers = async()=> {
    const data = await fetch('/api/users');
    return await data.json();
}

export const addTicket = async(body: any)=> {
    const data = await fetch('/api/tickets', {
        method: 'POST',
        body: JSON.stringify(body),
    });
    return await data.json();
}

export const assignTicket = async(ticketId: number, userId: number)=> {
    const data = await fetch('/api/tickets/' + ticketId + '/assign/'+ userId, {
        method: 'PUT'
    });
    return data;
}
export const unassignTicket = async(ticketId: number)=> {
    const data = await fetch('/api/tickets/' + ticketId + '/unassign', {
        method: 'PUT'
    });
    return data;
}

export const markAsCompleted = async(ticketId: number)=> {
    const data = await fetch('/api/tickets/' + ticketId + '/complete', {
        method: 'PUT'
    });
    return data;
}

export const markAsIncomplete = async(ticketId: number)=> {
    const data = await fetch('/api/tickets/' + ticketId + '/complete', {
        method: 'DELETE'
    });
    return data;
}