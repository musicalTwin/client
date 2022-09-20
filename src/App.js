import React, { useEffect, useState } from "react";
import "./App.css";

function Home() {
  const [data, setData] = useState();

  useEffect(() => {
    fetch("/api/v1/users")
      .then((res) => res.json())
      .then((data) => setData(data));
  }, []);

  return (
    <div>
      {data ? (
        data.map((obj) => {
          return (
            <div key={obj.id}>
              <h1>Nome: {obj.username}</h1>
              <h1>Id: {obj.id}</h1>
              <h1>Sesso: {obj.gender.id}</h1>
            </div>
          );
        })
      ) : (
        <h1>Coglione</h1>
      )}
    </div>
  );
}

export default Home;
