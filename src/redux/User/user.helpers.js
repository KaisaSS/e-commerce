import { auth } from "../../firebase/utils";

export const handleResetPasswordAPI = (email) => {
  const config = {
    url: "http://localhost:3000/login",
  };

  return new Promise((res, rej) => {
    auth
      .sendPasswordResetEmail(email, config)
      .then(() => {
        res();
      })
      .catch(() => {
        const err = ["Email not found, please try again"];
        rej(err);
      });
  });
};
