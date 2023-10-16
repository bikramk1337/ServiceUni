import React, { Component } from 'react'
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import axios from 'axios'
import { getUser } from '../Utils';

export class ParkingForm extends Component {
    constructor(props) {
      super(props)
    
      this.state = {
        applicant_name: getUser().id,
        vehicle_registration: '',
        expiry_date: '0001-01-01',
        is_active: false,
        permit_type: '',
        permitTypes: []
      }
    }

    componentDidMount() {
        axios
            .get(`${process.env.REACT_APP_API_URL}/permit-types/`)
            .then((response) => {
                let permitdata = response.data;
                this.setState({permitTypes:permitdata });
            })
            .catch((error) => {
                console.log(error);
            });
    }
    
    changeHandler = (e) => {
        this.setState({[e.target.name]: e.target.value})
    }

    submitHandler = (e) => {
        e.preventDefault()
        console.log(this.state)

        const token = localStorage.getItem('jwt_token');
        const headers = {
            'Authorization': `Bearer ${token}`
        };

        axios.post(`${process.env.REACT_APP_API_URL}/permits/`, this.state, { headers: headers })
            .then(response => {
                console.log(response)
                window.location.href = "/thanks"
            })
            .catch(error => {
                console.log(error)
                window.location.href ="/error"
            })
    }
    
    render() {
        const {applicant_name, vehicle_registration, permit_type} = this.state
        return (
            <div>
                <Form className="col col-lg-4 col-8  mx-auto" onSubmit={this.submitHandler}>
                    <Form.Group className="mb-3">
                        <Form.Control hidden type="number" name="applicant_name" placeholder='Enter name'required value={applicant_name} onChange={this.changeHandler} />
                    </Form.Group>

                    <Form.Group className='mb-3'>
                        <Form.Label>Permit Type</Form.Label>
                        <Form.Control
                        as="select"
                        name="permit_type" 
                        required
                        value={permit_type}
                        onChange={this.changeHandler}>
                            <option value="">Please select permit type</option>
                            {this.state.permitTypes.map((permitType) => (
                                <option key={permitType.id}value={permitType.id}>{permitType.type_name}</option>
                            ))}
                        </Form.Control>
                    </Form.Group>

                    <Form.Group className="mb-3">
                        <Form.Label>Vehicle Registration</Form.Label>
                        <Form.Control name="vehicle_registration" 
                                      placeholder='Enter vehicle registration' 
                                      required
                                      value={vehicle_registration} 
                                      onChange={this.changeHandler}/>
                    </Form.Group>

                    <Button variant="primary" type="submit">
                        Submit Application
                    </Button>
                </Form>
            </div>
        )
  }
}