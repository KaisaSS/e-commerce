import React, { useState } from "react";
import { Link, withRouter } from "react-router-dom";
import AuthWrapper from "../AuthWrapper";
import Button from "../forms/Button";
import FormInput from "../forms/FormInput";
import { signInWithGoogle, auth } from "../../firebase/utils";
import "./styles.scss";

const SignIn = (props) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const resetForm = () => {
    setEmail("");
    setPassword("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await auth.signInWithEmailAndPassword(email, password);
      resetForm();
      props.history.push("/");
    } catch (err) {
      console.error(err);
    }
  };

  const configAuthWrapper = {
    headline: "Sign in",
  };

  return (
    <AuthWrapper {...configAuthWrapper}>
      <div className="formWrap">
        <form onSubmit={handleSubmit}>
          <FormInput
            type="email"
            name="email"
            value={email}
            placeholder="email"
            handleChange={(e) => setEmail(e.target.value)}
          />
          <FormInput
            type="password"
            name="password"
            value={password}
            placeholder="Password"
            handleChange={(e) => setPassword(e.target.value)}
          />
          <Button type="submit">Sign in</Button>
          <div className="socialSignin">
            <div>
              <Button onClick={signInWithGoogle}>Sign in with Google</Button>
            </div>
          </div>
          <div className="links">
            <Link to="/recover">Reset password</Link>
          </div>
        </form>
      </div>
    </AuthWrapper>
  );
};

export default withRouter(SignIn);
