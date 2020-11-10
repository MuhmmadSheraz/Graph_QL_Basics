import React, { useState } from "react";
import { useQuery, gql, useMutation } from "@apollo/client";
import { StudentType } from "./Types/Types";

const allStudents = gql`
  query {
    studentsData {
      name
      id
      email
      age
    }
  }
`;
const ADD_STUDENT = gql`
  mutation AddStudent($id: Int!, $email: String!, $age: Int!, $name: String!) {
    addStudent(input: { id: $id, name: $name, email: $email, age: $age }) {
      name
      id
      email
      age
    }
  }
`;
const StudentsList = () => {
  const [name, setName] = useState<String>("");
  const [age, setAge] = useState<number>(0);
  const [email, setEmail] = useState<String>("");
  const { loading, error, data } = useQuery(allStudents);
  const [addStudentNow] = useMutation(ADD_STUDENT);
  if (loading) return <h1>Loading ....</h1>;
  if (error) return <h1>Error!!!</h1>;
  const { studentsData } = data;
  return (
    <div>
      <h1 style={{ textAlign: "center" }}>Students List ***</h1>
      <input
        placeholder="Insert User Name"
        onChange={(e) => setName(e.target.value)}
      />
      <input
        placeholder="Insert Age "
        onChange={(e: React.FormEvent<HTMLInputElement>) =>
          setAge(parseFloat(e.currentTarget.value))
        }
      />
      <input
        placeholder="Insert Email"
        onChange={(e) => setEmail(e.target.value)}
      />
      <hr />
      {studentsData &&
        studentsData.map((item: StudentType) => {
          return (
            <div key={item.id} style={{ marginLeft: "10px" }}>
              <h1>{item.name}</h1>
              <h1>{item.email}</h1>
              <h1>{item.age}</h1>
              <hr />
            </div>
          );
        })}
      <button
        onClick={
          () => 
          addStudentNow({
            variables: {
              id: Math.floor(Math.random() * 1000),
              email,
              name,
              age,
            },
            refetchQueries: [{ query: allStudents }]

          })
        }
      >
        Add More Student
      </button>
    </div>
  );
};
export default StudentsList;
