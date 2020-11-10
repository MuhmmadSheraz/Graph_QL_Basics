import React from "react";
import { useQuery, gql } from "@apollo/client";
import { StudentType } from "./Types/Types";

const alStudents = gql`
  query {
    studentsData {
      name
      id
      email
      age
    }
  }
`;
const StudentsList = () => {
  const { loading, error, data } = useQuery(alStudents);
  if (loading) return <h1>Loading ....</h1>;
  if (error) return <h1>Error!!!</h1>;
  const { studentsData } = data;
  return (
    <div>
      <h1 style={{textAlign:"center"}}>Students List ***</h1>
      <hr/>
      {studentsData &&
        studentsData.map((item: StudentType) => {
          return (
            <div key={item.id} style={{marginLeft:"10px"}}>
              <h1>{item.name}</h1>
              <h1>{item.email}</h1>
              <h1>{item.age}</h1>
              <hr/>
            </div>
          );
        })}
    </div>
  );
};
export default StudentsList;
