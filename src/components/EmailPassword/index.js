import React, { useState } from "react";
import { withRouter } from "react-router-dom";
import { auth } from "../../firebase/utils";
import AuthWrapper from "../AuthWrapper";
import Button from "../forms/Button";
import FormInput from "../forms/FormInput";
import "./styles.scss";

const EmailPassword = (props) => {
  const [email, setEmail] = useState("");
  const [errors, setErrors] = useState([]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const config = {
        url: "http://localhost:3000/login",
      };
      await auth
        .sendPasswordResetEmail(email, config)
        .then(() => {
          props.history.push("/login");
        })
        .catch(() => {
          const err = ["Invalid email"];
          setErrors(err);
        });
    } catch (err) {
      console.error(err);
    }
  };

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
      <form onSubmit={handleSubmit}>
        <FormInput
          type="email"
          name="email"
          value={email}
          placeholder="Email"
          handleChange={(e) => setEmail(e.target.value)}
        />
        <Button type="submit">Send password</Button>
      </form>
    </AuthWrapper>
  );
};

export default withRouter(EmailPassword);
