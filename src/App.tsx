import React from "react";
import { render } from "react-dom";
import StudentList from "./Components/Students";

import { ApolloProvider } from "@apollo/client";
import client from "./Config/gph_Config.js";

export default function App() {
  return (
    <ApolloProvider client={client}>
      <h2 style={{textAlign:"center"}}>My first Apollo app 🚀</h2>
      <StudentList />
    </ApolloProvider>
  );
}
