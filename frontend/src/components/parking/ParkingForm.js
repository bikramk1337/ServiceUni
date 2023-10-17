import React, { Component } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import axios from "axios";
import { getUser, getUserDetails } from "../Utils";

export class ParkingForm extends Component {
  constructor(props) {
    super(props);
    const userDetails = getUserDetails();

    this.state = {
      user_id: getUser().id,
      first_name: userDetails.firstName,
      last_name: userDetails.lastName,
      email: userDetails.email,
      vehicle_registration: "",
      expiry_date: "0001-01-01",
      is_active: false,
      permit_type: "",
      permitTypes: [],
    };
  }

  componentDidMount() {
    axios
      .get(`${process.env.REACT_APP_API_URL}/permit-types/`)
      .then((response) => {
        let permitdata = response.data;
        this.setState({ permitTypes: permitdata });
      })
      .catch((error) => {
        console.log(error);
      });
  }

  changeHandler = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  };

  submitHandler = (e) => {
    e.preventDefault();
    console.log(this.state);

    const token = localStorage.getItem("jwt_token");
    const headers = {
      Authorization: `Bearer ${token}`,
    };

    axios
      .post(`${process.env.REACT_APP_API_URL}/permits/`, this.state, {
        headers: headers,
      })
      .then((response) => {
        console.log(response);
        window.location.href = "/thanks";
      })
      .catch((error) => {
        console.log(error);
        window.location.href = "/error";
      });
  };

  render() {
    const { user_id, vehicle_registration, permit_type, first_name, last_name, email } = this.state;
    const full_name = `${first_name} ${last_name}`;

    return (
      <div>
        <Form
          className="col col-lg-4 col-8 mx-auto"
          onSubmit={this.submitHandler}
        >
          <Form.Group className="mb-3">
            <Form.Label className="text-left">Name</Form.Label>
            <Form.Control
              readOnly
              type="text"
              value={full_name}
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label className="text-left">Email</Form.Label>
            <Form.Control
              readOnly
              type="email"
              value={email}
            />
          </Form.Group>

          {/* Hidden user ID input */}
          <Form.Group className="mb-3">
            <Form.Control
              hidden
              type="number"
              name="user_id"
              required
              value={user_id}
              onChange={this.changeHandler}
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label className="text-left">Permit Type</Form.Label>
            <Form.Control
              as="select"
              name="permit_type"
              required
              value={permit_type}
              onChange={this.changeHandler}
            >
              <option value="">Please select permit type</option>
              {this.state.permitTypes.map((permitType) => (
                <option key={permitType.id} value={permitType.id}>
                  {permitType.type_name}
                </option>
              ))}
            </Form.Control>
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label className="text-left">Vehicle Registration</Form.Label>
            <Form.Control
              name="vehicle_registration"
              placeholder="Enter vehicle registration"
              required
              value={vehicle_registration}
              onChange={this.changeHandler}
            />
          </Form.Group>

          <Button variant="primary" type="submit">
            Submit Application
          </Button>
        </Form>
      </div>
    );
  }
}

export default ParkingForm;
