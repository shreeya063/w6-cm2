import { useState, useEffect } from "react";

export const useFetch = (url, options) => {
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect (()=> {
    const fetchData= async() => {
        setLoading(true);
        setError(null);

        try{
            const res = await fetch(url, options)
            const json = await res.json();
            if (!res.ok) {
                throw new Error(json.message || "Error fetching data")
            }
            setData(json);
        }catch(error){
            setError(error.message);
        }finally{
            setLoading(false);
        }
        };
        fetchData();
    }, [url, options]);
    return{data, loading, error}
};