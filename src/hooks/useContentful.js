import {useState, useEffect} from "react"
function useContentful(query) {
  let [data, setData] = useState(null)
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  async function fetchContentfulTest(query) {
    setLoading(true);
    try {


      const {VITE_REACT_APP_API_ENDPOINT, VITE_REACT_APP_SPACE_ID, VITE_REACT_APP_CDA_TOKEN} = import.meta.env;
      const url = VITE_REACT_APP_API_ENDPOINT.replace('<!--SPACE-->', VITE_REACT_APP_SPACE_ID).replace('<!--TOKEN-->', VITE_REACT_APP_CDA_TOKEN)

      const res = await fetch(url,{
        method: "POST",
        headers: {
          "Content-Type": 'application/json',
        },
        body: JSON.stringify({query})
      });
      if (!res.ok) throw new Error(res.statusText);
      const data = await res.json();
      setData(data);
      setLoading(false);
    } catch (error) {
      console.log(error);
      setError(error);
      setLoading(false);
    }
  }
  useEffect(() => {
    fetchContentfulTest(query)
  }, [query])

  return [error, loading, data];
}
export default useContentful