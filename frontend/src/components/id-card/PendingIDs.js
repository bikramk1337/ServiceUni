import React from 'react';
import axios from 'axios';
import Table from 'react-bootstrap/Table';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck, faX } from "@fortawesome/free-solid-svg-icons";
import { idCardApi } from '../AxiosUtils';


export default class PendingIDs extends React.Component {
  state = {
    requests: []
  }

  componentDidMount() {
    const token = localStorage.getItem('jwt_token');
    const headers = {
        'Authorization': `Bearer ${token}`
    };

    idCardApi.get(`/pending_requests/`, { headers: headers })
      .then(res => {
        const requests = res.data;
        this.setState({ requests });
      })
      .catch(error => {
        console.log(error);
      })
  }

  sendCard = (cardnumber) => {
    const token = localStorage.getItem("jwt_token");
    const headers = {
      Authorization: `Bearer ${token}`,
    };

    idCardApi
      .put(`/send/${cardnumber}`, {}, { headers: headers })
      .then((res) => {
        console.log(res.data);
        window.location.reload(false);
      });
  };

  rejectRequest = (cardnumber) => {
    const token = localStorage.getItem("jwt_token");
    const headers = {
      Authorization: `Bearer ${token}`,
    };

    idCardApi
      .put(`/reject/${cardnumber}`, {}, { headers: headers })
      .then((res) => {
        console.log(res.data);
        window.location.reload(false);
      });
  };

  render() {
    return (
      <div className='content'>
        <h1 className='border-bottom pb-3 mb-5 w-50 text-center mx-auto'>
          Pending ID Applications
        </h1>
        <div className="col col-lg-10 mx-auto">
          <Table striped bordered hover>
              <thead>
                  <tr>
                    <th>Student Number</th>
                    <th>Name</th>
                    <th>Program</th>
                    <th>Card Number</th>                      
                    <th>Status</th>
                    <th>Actions</th>
                  </tr>
              </thead>
              <tbody>
                  {this.state.requests.map((item) => (
                      <tr key={item.card_number}>
                          <td>{item.stud_number}</td>
                          <td>{item.name}</td>
                          <td>{item.program}</td>
                          <td>{item.card_number}</td>
                          <td>{item.status}</td>
                          <td>
                              <button title="Approve application" type="button" className="btn btn-success m-1" onClick={() => this.sendCard(item.card_number)}><FontAwesomeIcon icon={faCheck} style={{ color: 'white' }} /></button>
                              <button title="Reject application" type="button" className="btn btn-danger m-1" onClick={() => this.rejectRequest(item.card_number)}><FontAwesomeIcon icon={faX} style={{ color: 'white' }} /></button>
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
