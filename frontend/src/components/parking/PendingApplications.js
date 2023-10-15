import React from 'react';
import axios from 'axios';
import Table from 'react-bootstrap/Table';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck, faX } from "@fortawesome/free-solid-svg-icons";

export default class PendingApplications extends React.Component {
  state = {
    applications: []
  }

  componentDidMount() {
    const token = localStorage.getItem('jwt_token');
    const headers = {
        'Authorization': `Bearer ${token}`
    };

    axios.get(`${process.env.REACT_APP_API_URL}/pending-permits/`, { headers: headers })
      .then(res => {
        const applications = res.data;
        this.setState({ applications });
      })
      .catch(error => {
        console.log(error);
      })
  }

  approveApplication = id => {
    const token = localStorage.getItem('jwt_token');
    const headers = {
        'Authorization': `Bearer ${token}`
    };

    axios.put(`${process.env.REACT_APP_API_URL}/approve/${id}`, {}, { headers: headers })
        .then((res) => {
          console.log(res.data);
          window.location.reload(false);
        });
  };

  rejectApplication = id => {
    const token = localStorage.getItem('jwt_token');
    const headers = {
        'Authorization': `Bearer ${token}`
    };

    axios.put(`${process.env.REACT_APP_API_URL}/reject/${id}`, {}, { headers: headers })
        .then((res) => {
          console.log(res.data);
          window.location.reload(false);
        });
  };

  render() {
    return (
      <>
        <h1 className='border-bottom pb-3 mb-5 w-50 text-center mx-auto'>
          Pending parking applications
        </h1>
        <div className="col col-lg-10 mx-auto">
          <Table striped bordered hover>
              <thead>
                  <tr>
                      <th>Id</th>
                      <th>Applicant</th>
                      <th>Permit Type</th>
                      <th>Vehicle Registration</th>
                      <th>Actions</th>
                  </tr>
              </thead>
              <tbody>
                  {this.state.applications.map((item) => (
                      <tr key={item.task_id}>
                          <td>{item.id}</td>
                          <td>{item.applicant_name}</td>
                          <td>{item.permit_type}</td>
                          <td>{item.vehicle_registration}</td>
                          <td>
                              <button title="Approve application" type="button" className="btn btn-success m-1" onClick={() => this.approveApplication(item.id)}><FontAwesomeIcon icon={faCheck} style={{ color: 'white' }} /></button>
                              <button title="Reject application" type="button" className="btn btn-danger m-1" onClick={() => this.rejectApplication(item.id)}><FontAwesomeIcon icon={faX} style={{ color: 'white' }} /></button>
                          </td>
                      </tr>
                  ))}
              </tbody>
          </Table>
        </div>
      </>
    );
  }
}
