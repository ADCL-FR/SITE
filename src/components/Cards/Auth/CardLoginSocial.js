import React , {useState} from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
// components
import Button from "../../../components/Elements/Button.js";
import Input from "../../../components/Elements/Input.js";
import Checkbox from "../../../components/Elements/Checkbox.js";

// Context
import { useAuthContext } from '../../../auth/useAuthContext';

export default function CardLoginSocial({
  title, username, password,
  inputs,
  button,
  checkbox,
  forgotPassword,
  createAccount,
}) {
  const { login } = useAuthContext();
  const [passwordForm, setPassword] = useState("");
  const [usernameForm, setUsername] = useState("");

  async function handleSubmit(e) {
    e.preventDefault();
    await login(usernameForm, passwordForm)

        .catch((error) => {console.log(error)});
  }
  return (
    <>
      <div className="relative flex flex-col w-full mb-6 shadow-lg rounded-lg bg-white">
        <div className="flex-auto px-4 lg:px-10 py-10 pt-10">
          <div className="text-blueGray-500 text-center mb-3 font-bold">
            <h6>{title}</h6>
          </div>
          <form onSubmit={handleSubmit}>
            <div key={1} className="relative w-full">
              <label className="block uppercase text-blueGray-500 text-xs font-bold mb-2 ml-1">
                {username.label}
              </label>
              <Input {...username.input} onChange={(event) => setUsername(event.target.value)} />
            </div>
            <div className="relative w-full">
              <label className="block uppercase text-blueGray-500 text-xs font-bold mb-2 ml-1">
                {password.label}
              </label>
              <Input {...password.input} onChange={(event) => setPassword(event.target.value)} />
            </div>
           {/* {inputs.map((prop, key) => {
              return (
                <div key={key} className="relative w-full">
                  <label className="block uppercase text-blueGray-500 text-xs font-bold mb-2 ml-1">
                    {prop.label}
                  </label>
                  <Input {...prop.input} onChange={(event) => setPassword(event.target.value)} />
                </div>
              );
            })}*/}
            <div className="mt-2 inline-block">
              <Checkbox {...checkbox} />
            </div>

            <div className="text-center mt-5">
              <Button {...button} />
            </div>
          </form>
        </div>
      </div>
      {Object.keys(forgotPassword).length === 0 &&
      Object.keys(createAccount).length === 0 ? null : (
        <div className="flex flex-wrap mt-6 relative">
          <div className="w-1/2">

              <Link to={forgotPassword.href} className="text-blueGray-500 ml-2">
                <small>{forgotPassword.label}</small>
              </Link>

          </div>
          <div className="w-1/2 text-right">
            {createAccount && createAccount.to ? (
              <Link {...createAccount} className="text-blueGray-500 mr-2">
                <small>Create new account</small>
              </Link>
            ) : createAccount && createAccount.href ? (
              <a {...createAccount} className="text-blueGray-500 mr-2">
                <small>Create new account</small>
              </a>
            ) : null}
          </div>
        </div>
      )}
    </>
  );
}

CardLoginSocial.defaultProps = {
  inputs: [],
  button: {},
  username: {},
  password: {},
  forgotPassword: {},
  createAccount: {},
};

CardLoginSocial.propTypes = {
  title: PropTypes.string,
  subtitle: PropTypes.string,
  // NOTE: the "Forgot password?" text is allready set
  forgotPassword:  PropTypes.object,
  // NOTE: the "Create new account" text is allready set
  createAccount: PropTypes.object,
  // It is represetnted by the props you
  // can pass to our Button component element
  button: PropTypes.object,
  // It is represetnted by the props you
  // can pass to our Checkbox component element
  checkbox: PropTypes.object,
  inputs: PropTypes.arrayOf(
    PropTypes.shape({
      label: PropTypes.string,
      // It is represetnted by the props you
      // can pass to our Input component element
      // NOTE: if you wish to generate a textarea, you will need to pass
      // // // inside this object >> type: "textarea"
      // // // full example >> input: { type: "textarea" }
      input: PropTypes.object,
    })
  ),
};
