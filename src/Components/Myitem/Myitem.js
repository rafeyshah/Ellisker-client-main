import React, { useEffect, useState } from 'react';
import { Table } from 'react-bootstrap';
import { useAuthState } from 'react-firebase-hooks/auth';
import auth from '../../firebase.init';

const Myitem = () => {
  const [item, setItem] = useState([]);
  const [user, loading, error] = useAuthState(auth);
  console.log(item)
  useEffect(() => {
    fetch(`https://ellskerwebsite.herokuapp.com/api/hangouts/myitem?uid=${user?.uid}`)
      .then((res) => res.json())
      .then((data) => setItem(data));
  }, [user]);
  return (
    <div>
   <Table striped bordered hover variant="dark">
  <thead>
    <tr>
      
      <th>Title</th>
      
      <th>Description</th>
      <th>Location</th>
      <th>Date </th>
    </tr>
  </thead>
  <tbody>
    {
      item?.data?.calender?.map((x)=>(
        <tr>
        <td>{x.title}</td>
        <td>{x.description}</td>
        <td>{x.location}</td>
        <td>{x.date}</td>
      </tr>

      ))
    }
   
  </tbody>
</Table>
    </div>
  );
};

export default Myitem;
