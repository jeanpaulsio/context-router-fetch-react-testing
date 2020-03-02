import React, { useContext } from "react";
import { useAsync } from "react-async";
import axios from "axios";

async function fetchUser() {
  const { data } = await axios.get(
    "https://jsonplaceholder.typicode.com/users/1"
  );
  return data;
}

const NameContext = React.createContext();

export function NameProvider(props) {
  const { data = {}, isPending } = useAsync({
    promiseFn: fetchUser,
  });

  if (isPending) {
    return <h2>loading...</h2>;
  }

  return <NameContext.Provider value={{ name: "jp", user: data }} {...props} />;
}

export const useName = () => useContext(NameContext);
