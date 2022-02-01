import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import { auth } from "../../firebase/utils";
import AuthWrapper from "../AuthWrapper";
import Button from "../forms/Button";
import FormInput from "../forms/FormInput";
import "./styles.scss";

const initialState = {
  email: "",
  errors: [],
};

export class EmailPassword extends Component {
  constructor(props) {
    super(props);
    this.state = {
      ...initialState,
    };

    this.handleChange = this.handleChange.bind(this);
  }

  handleChange = (e) => {
    const { name, value } = e.target;
    this.setState({
      [name]: value,
    });
  };

  handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const { email } = this.state;
      const config = {
        url: "http://localhost:3000/login",
      };
      await auth
        .sendPasswordResetEmail(email, config)
        .then(() => {
          this.props.history.push("/login");
        })
        .catch(() => {
          const err = ["Invalid email"];
          this.setState({
            errors: err,
          });
        });
    } catch (err) {
      console.error(err);
    }
  };

  render() {
    const { email, errors } = this.state;
    const configAuthWrapper = {
      headline: "Email new password",
    };

    return (
      <AuthWrapper {...configAuthWrapper}>
        {errors.length > 0 && (
          <ul>
            {errors.map((err, i) => {
              return <li key={i}>{err}</li>;
            })}
          </ul>
        )}
        <form onSubmit={this.handleSubmit}>
          <FormInput type="email" name="email" value={email} placeholder="Email" onChange={this.handleChange} />
          <Button type="submit">Send password</Button>
        </form>
      </AuthWrapper>
    );
  }
}

export default withRouter(EmailPassword);
