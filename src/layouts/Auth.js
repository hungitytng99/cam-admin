import React from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import Login from "views/auth/Login.js";

export default function Auth() {
  return (
    <>
      <main>
        <section className="relative w-full h-full flex items-center py-40 min-h-screen">
          <div
            className="absolute top-0 w-full h-full bg-blueGray-800 bg-no-repeat bg-full"
            style={{
              backgroundImage:
                "url(" + require("assets/img/register_bg_2.png").default + ")",
            }}
          ></div>
          <Switch>
            <Route path="/auth/login" exact component={Login} />
            <Redirect from="/auth" to="/auth/login" />
          </Switch>
        </section>
      </main>
    </>
  );
}
