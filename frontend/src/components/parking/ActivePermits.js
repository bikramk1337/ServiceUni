import React from 'react';
import axios from 'axios';
import Table from 'react-bootstrap/Table';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faX } from "@fortawesome/free-solid-svg-icons";

export default class ActivePermits extends React.Component {
  state = {
    applications: []
  }

  async componentDidMount() {
    const token = localStorage.getItem('jwt_token');
    const headers = {
        'Authorization': `Bearer ${token}`
    };
  
    try {
      const { data: applications } = await axios.get(`${process.env.REACT_APP_API_URL}/active-permits/`, { headers });
      for (let app of applications) {
        const { data: user } = await axios.get(`${process.env.REACT_APP_AUTH_API_URL}/api/v1/users/${app.user_id}`, { headers });
        app.user = user;
      }
      this.setState({ applications });
    } catch (error) {
      console.log(error);
    }
  }
  
  revokePermit = id => {
    const token = localStorage.getItem('jwt_token');
    const headers = {
        'Authorization': `Bearer ${token}`
    };

    axios.put(`${process.env.REACT_APP_API_URL}/revoke/${id}`, {}, { headers: headers })
        .then((res) => {
          console.log(res.data);
          window.location.reload(false);
        })
        .catch(error => {
          console.log(error);
          // Consider handling 401 or 403 errors here to redirect or show a message
        });
  };

  render() {
    return (
      <div className='content'>
        <h1 className='border-bottom pb-3 mb-5 w-50 text-center mx-auto'>
          Active parking permits
        </h1>
        <div className="col col-lg-10 mx-auto">
          <Table striped bordered hover>
            <thead>
              <tr>
                  <th>Id</th>
                  <th>User ID</th>
                  <th>User Name</th>
                  <th>User Email</th>
                  <th>Permit Type</th>
                  <th>Vehicle Registration</th>
                  <th>Expiry Date</th>
                  <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {this.state.applications.map((item) => (
                <tr key={item.id}>
                  <td>{item.id}</td>
                  <td>{item.user_id}</td>
                  <td>{item.user ? `${item.user.first_name} ${item.user.last_name}` : 'Loading...'}</td>
                  <td>{item.user ? item.user.email : 'Loading...'}</td>
                  <td>{item.permit_type}</td>
                  <td>{item.vehicle_registration}</td>
                  <td>{item.expiry_date}</td>
                  <td>
                      <button title="Revoke permit" type="button" className="btn btn-danger m-1" onClick={() => this.revokePermit(item.id)}>
                        <FontAwesomeIcon icon={faX} style={{ color: 'white' }} />
                      </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </div>
      </div>
    );
  }
  
}
