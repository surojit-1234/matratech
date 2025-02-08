import React, { useEffect, useState, memo} from 'react';
import axios from 'axios';
import '../App.css';
const DataFetching = ({ API, onChildData }) => {
  const [fetchedData, setFetchedData] = useState(null);
  console.log("DataFetching")
  useEffect(() => {
    // Fetch data from the API
    const fetchData = async () => {
      try {
        const response = await axios.get(API);
        // console.log(response.data); 
        setFetchedData(response.data); 
      } catch (err) {
        console.log('Error fetching data:', err.message);
      }
    }

    fetchData();
  }, [API]);

 
  useEffect(() => {
    // Only call the parent callback once when fetchedData is not empty
    if (fetchedData && Object.keys(fetchedData).length > 0) {
       onChildData(fetchedData);
    }
  }, [fetchedData, onChildData])


  return <>
    {/* Optionally render the fetched data for debugging */}
  </>;
}

export default memo(DataFetching);
