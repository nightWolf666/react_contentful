import React from "react";
import { useState, useEffect, useRef } from "react";
import useContentful from "../hooks/useContentful";

function Collection() {
  const [currentQuote, setCurrentQuote] = useState({});
  const query = `
  query {
    genericCtCollection {
        items{
          title
        }
        
    }
      genericCt(id:"1mZCWmAeYZaL27gg29Ni1d"){
        title
      }
    
    personCollection(where: {
      OR: [
        { name_contains: "Geor" },
        { name: "Geofbrg" }
      ],
      })  
    {items{name}} 
  }
  `
  const [error, loading, data] = useContentful(query);
  console.log(data&&data.data );
  if (error) {
    return <p>Something went wrong</p>;
  }

  if (loading) {
      return <p>Loading</p>;
  }

  return (
    <> ddd
    {data&&data.data.personCollection&&(data.data.personCollection.items.map((e,index)=> <p key={index}>{e.name}</p>))}
    </>
  );
}

export default Collection;

// https://apimeme.com/meme?meme=Ron-Swanson&top=&bottom=Bottom+textBottom+textBottom+textBottom+textBottom+textBottom+text
// https://ron-swanson-quotes.herokuapp.com/v2/quotes
 

  // useEffect(() => {
  //   fetchRonQuoteNow();
  // }, []);


 
  // const fetchRonQuoteNow = async () => {
  //   const response = await fetchContentfulTest();
  //   console.log("response", response.data);
  //   setCurrentQuote(response.data);
  // };
  // console.log("currentQuote", currentQuote);
