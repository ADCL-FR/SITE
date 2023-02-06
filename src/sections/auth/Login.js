//
import CardLoginSocial from "../../components/Cards/Auth/CardLoginSocial.js";
import { loginForm } from "../../constants/auth/auth.js";
import React from "react";

// ----------------------------------------------------------------------

export default function Login({ children, image }) {
  return (
    <>
      <main>
        <section className="relative w-full h-full py-40 min-h-screen  justify-center content-center">
          <div
            className="absolute top-0 w-full h-full bg-no-repeat bg-blueGray-900 bg-full justify-center content-center"
            style={{
              backgroundImage: "url(" + image + ")",
            }}
          ></div>
          <div className="flex mx-auto px-4 w-full h-full justify-center content-center -align-center">
            {children ? (
              children
            ) : (
              <div className="w-1/2">
                <CardLoginSocial {...loginForm} />
              </div>
            )}
          </div>
        </section>
      </main>
    </>
  );
}
