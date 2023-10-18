import React from 'react';
import Table from 'react-bootstrap/Table';
import { idCardApi } from '../AxiosUtils';


export default class ProcessedRequests extends React.Component {
  state = {
    requests: []
  }

  componentDidMount() {
    const token = localStorage.getItem('jwt_token');
    const headers = {
        'Authorization': `Bearer ${token}`
    };

    idCardApi.get(`/processed_requests/`, { headers: headers })
      .then(res => {
        const requests = res.data;
        this.setState({ requests });
      })
      .catch(error => {
        console.log(error);
      })
  }

  render() {
    return (
      <div className='content'>
        <h1 className='border-bottom pb-3 mb-5 w-50 text-center mx-auto'>
          Processed ID Applications
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
                      </tr>
                  ))}
              </tbody>
          </Table>
        </div>
      </div>
    );
  }
}
