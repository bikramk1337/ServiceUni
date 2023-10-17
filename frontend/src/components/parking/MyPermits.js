import React from 'react';
import axios from 'axios';
import Table from 'react-bootstrap/Table';
import { getUser } from '../Utils';

export default class MyPermits extends React.Component {
  state = {
    applications: [],
    error: null
  }

  componentDidMount() {
    const user = getUser();
    if (!user) {
      this.setState({ error: "User not found." });
      return;
    }

    const token = localStorage.getItem('jwt_token');
    const headers = {
        'Authorization': `Bearer ${token}`
    };

    axios.get(`${process.env.REACT_APP_API_URL}/permits/${user.id}`, { headers: headers })
      .then(res => {
        this.setState({ applications: res.data });
      })
      .catch(error => {
        console.log(error);
        if (error.response && error.response.status === 404) {
          this.setState({ error: "No active permits found." });
        } else if (error.response && (error.response.status === 401 || error.response.status === 403)) {
          this.setState({ error: "Unauthorized. Please log in." });
        } else {
          this.setState({ error: "An error occurred. Please try again later." });
        }
      })
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
    const { applications, error } = this.state;
    return (
      <div className='content'>
        <h1 className='border-bottom pb-3 mb-5 w-50 text-center mx-auto'>
          Your active parking permits
        </h1>

        {error && <div className="alert alert-danger">{error}</div>}

        {!error && applications.length === 0 && (
          <div className="alert alert-info">No permits to display.</div>
        )}

        {applications.length > 0 && (
          <div className="col col-lg-10 mx-auto">
            <Table striped bordered hover>
                <thead>
                    <tr>
                        <th>Permit Number</th>
                        <th>Permit Type</th>
                        <th>Vehicle Registration</th>
                        <th>Expiry Date</th>
                    </tr>
                </thead>
                <tbody>
                    {applications.map((item) => (
                        <tr key={item.id}>
                            <td>{item.id}</td>
                            <td>{item.permit_type}</td>
                            <td>{item.vehicle_registration}</td>
                            <td>{item.expiry_date}</td>
                        </tr>
                    ))}
                </tbody>
            </Table>
          </div>
        )}
      </div>
    );
  }
}
