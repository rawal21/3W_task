import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Container, Table, Button } from 'react-bootstrap';
import { FaSearch } from 'react-icons/fa'; 

const AdminDashboard = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const { data } = await axios.get('https://3-w-task.vercel.app/api/users'); 
        setUsers(data);
      } catch (err) {
        console.error(err);
      }
    };

    fetchUsers();
  }, []);

  return (
    <Container className="mt-5">
      <h2>Admin Dashboard</h2>
      <Table striped bordered hover responsive>
        <thead>
          <tr>
            <th>Name</th>
            <th>Social Media Handle</th>
            <th>Images</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user._id}>
              <td>{user.name}</td>
              <td>{user.socialHandle}</td>
              <td>
                {user.images.map((img, index) => (
                  <Button
                    key={index}
                    variant="link"
                    href={img} // Full image link
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-0 text-decoration-none me-2"
                  > 
                    <FaSearch size={20} title="View Full Image" />
                     image
                  </Button>
                ))}
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </Container>
  );
};

export default AdminDashboard;
