import React, { Component } from 'react'
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import axios from 'axios'
import { getUser } from '../Utils';

export class ApplicationForm extends Component {
    constructor(props) {
      super(props)
    
      this.state = {
        stud_number: '',
        name: getUser().first_name + " " + getUser().last_name,
        program: '', 
        dob: '',
        email: getUser().sub,
        phone: '',
        campus: '',
        year: '',
        status: ''
      }
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

        axios.post(`${process.env.REACT_APP_ID_API_URL}/apply_student_card/`, this.state, { headers: headers })
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
        const {stud_number, name, program, dob, email, phone, campus, year} = this.state
        return (
            <div>
                <Form className="col col-lg-4 col-8  mx-auto" onSubmit={this.submitHandler}>
                    <Form.Group className="mb-3">
                        <Form.Control hidden type="text" name="name" placeholder='Enter name'required value={name} onChange={this.changeHandler} />
                    </Form.Group>

                    <Form.Group className="mb-3">
                        <Form.Label>Student Number</Form.Label>
                        <Form.Control type="number" name="stud_number" placeholder='Enter student number'required value={stud_number} onChange={this.changeHandler} />
                    </Form.Group>

                    <Form.Group className="mb-3">
                        <Form.Label>Program</Form.Label>
                        <Form.Control type="text" name="program" placeholder='Enter program'required value={program} onChange={this.changeHandler} />
                    </Form.Group>

                    <Form.Group className="mb-3">
                        <Form.Label>Date of Birth</Form.Label>
                        <Form.Control type="date" name="dob" placeholder='Enter date of birth'required value={dob} onChange={this.changeHandler} />
                    </Form.Group>

                    <Form.Group className="mb-3">
                        <Form.Control hidden type="text" name="email" placeholder='Enter email' required value={email} onChange={this.changeHandler} />
                    </Form.Group>

                    <Form.Group className="mb-3">
                        <Form.Label>Phone</Form.Label>
                        <Form.Control type="tel" name="phone" placeholder='Enter phone number'required value={phone} onChange={this.changeHandler} />
                    </Form.Group>

                    <Form.Group className="mb-3">
                        <Form.Label>Campus</Form.Label>
                        <Form.Control type="text" name="campus" placeholder='Enter campus name'required value={campus} onChange={this.changeHandler} />
                    </Form.Group>

                    <Form.Group className="mb-3">
                        <Form.Label>Year</Form.Label>
                        <Form.Control type="number" name="year" placeholder='Enter year'required value={year} onChange={this.changeHandler} />
                    </Form.Group>

                    <Button variant="primary" type="submit">
                        Submit Application
                    </Button>
                </Form>
            </div>
        )
  }
}