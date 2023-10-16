import React, { useState, useEffect } from 'react';

 const UserDisplay = () => {
   const [users, setUsers] = useState([]);
   const [loading, setLoading] = useState(true);

   useEffect(() => {
     // Fetch user data from the JSONPlaceholder API
     fetch('https://jsonplaceholder.typicode.com/users/1/')
       .then((response) => response.json())
       .then((data) => {
         setUsers(data);
         setLoading(false);
       });
   }, []);
/*
           {users.map((user) => (
             <li key={user.id}>
               <h2>{user.name}</h2>
               <p>Email: {user.email}</p>
               <p>Phone: {user.phone}</p>
               <p>Website: {user.website}</p>
             </li>
           ))}
           */
   return (
     <div className="user-display">
       <h1>User Information</h1>
       {loading ? (
         <p>Loading...</p>
       ) : (
         <ul>
<li key={users.id}>
               <h2>{users.name}</h2>
               <p>Email: {users.email}</p>
               <p>Phone: {users.phone}</p>
               <p>Website: {users.website}</p>
             </li>
         </ul>
       )}
     </div>
   );
 };

 export default UserDisplay;
