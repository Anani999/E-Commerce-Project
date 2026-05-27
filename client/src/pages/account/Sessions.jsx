import apiRequest from '../../utils/api.js'
import { useState, useEffect } from 'react'
import Button from '../../components/Button'
import Loading from '../../components/Loading'

function Sessions() {
 const [sessions, setSessions] = useState([]);
 const [loading, setLoading] = useState(false);
 const [message, setMessage] = useState('');

 useEffect(() => {
  fetchSessions();
 }, []);

 async function fetchSessions(){
  setLoading(true);
  const response = await apiRequest('GET', '/api/auth/account-sessions');
  if(response.success === true){ setSessions(response.data.sessions); };
  setMessage(response.message);
  setLoading(false);
 }

 async function handleSessionLogout(id) {
  const response = await apiRequest('PUT', '/api/auth/session-revoke?id='+id);
  setMessage(response.message);
 }
 
 if(loading) { return <Loading message='Fetching sessions' pop='true'/> }
 return(
  <div className='flex flex-col gap-2 m-2'>
  {sessions?.map((session) => (
   <div key={session._id} className='shadow p-2'>
    <p> <b>Device</b> : {session.user_agent} </p>
    <p> Status: {session.status} </p>
    <p> Created: {session.createdAt} </p>
    <Button text='Logout Session' function={() => handleSessionLogout(session._id)} />
   </div>
  ))}
  <p> {message} </p>
  </div>
 );

}
export default Sessions;
