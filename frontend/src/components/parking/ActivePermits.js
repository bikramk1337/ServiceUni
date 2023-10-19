import React from 'react';
import Table from 'react-bootstrap/Table';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faX } from "@fortawesome/free-solid-svg-icons";
import { parkingApi, authApi } from '../AxiosUtils'; 

export default class ActivePermits extends React.Component {
  state = {
    applications: []
  }

  componentDidMount() {
    const token = localStorage.getItem("jwt_token");
    const headers = {
      Authorization: `Bearer ${token}`,
    };

    parkingApi
      .get(`/active-permits/`, { headers: headers })
      .then((res) => {
        const applications = res.data;

        // Fetching user details for each application
        const fetchUsersPromises = applications.map((app) => {
          return authApi.get(`/api/v1/users/${app.user_id}`, { headers: headers });
        });

        return Promise.all(fetchUsersPromises).then((userResponses) => {
          userResponses.forEach((userRes, index) => {
            applications[index].user = userRes.data;
          });

          return applications;
        });
      })
      .then((appsWithUsers) => {
        this.setState({ applications: appsWithUsers });
      })
      .catch((error) => {
        console.log("Error:", error);
      });
  }
  
  revokePermit = (id) => {
    const token = localStorage.getItem("jwt_token");
    const headers = {
      Authorization: `Bearer ${token}`,
    };
    
    parkingApi.put(`/revoke/${id}`, {}, { headers: headers })
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
