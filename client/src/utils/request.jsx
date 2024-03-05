import { GRAPHQL_SERVER } from "./constants";
export const graphQLRequest = async (payload, options = {}, method = 'POST') => {
  if (localStorage.getItem("accessToken")) {
    const res = await fetch(`${GRAPHQL_SERVER}/graphql`, {
      method,
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        ...options,
      },
      body: JSON.stringify(payload),
    });
    //handle when forbidden
    if(!res.ok) {
        if(res.status === 403) {
          return null
        }
    }
  
    const { data } = await res.json();

    return data;
  }
  
  return null;
};
