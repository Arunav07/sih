import Head from 'next/head';
import { useEffect } from 'react';
import { useState } from 'react';
import { Layout as DashboardLayout } from 'src/layouts/dashboard/layout';

const Page = () => {
  var api_key = 'e7108a54f1074c53b95285e985d6a325';
  const [coordinates, setCoordinates] = useState({ latitude: 0, longitude: 0 });
  const [address, setAddress] = useState('');
  useEffect(() => {
    if (window.navigator.geolocation) {
      // Geolocation available
      window.navigator.geolocation.getCurrentPosition(function(position) {
        console.log(position.coords.latitude, position.coords.longitude);
        setCoordinates({ latitude: position.coords.latitude, longitude: position.coords.longitude });
      });
    }
  }, []);

  useEffect(() => {
    const url = `https://geocode.maps.co/reverse?lat=${coordinates.latitude}&lon=${coordinates.longitude}`;
    var query = coordinates.latitude + ',' + coordinates.longitude;
    var api_url = 'https://api.opencagedata.com/geocode/v1/json'

  var request_url = api_url
    + '?'
    + 'key=' + api_key
    + '&q=' + encodeURIComponent(query)
    + '&pretty=1'
    + '&no_annotations=1';
    var request = new XMLHttpRequest();
    fetch(request_url).then(response => response.json()).then(data => {console.log(data); setAddress(data.results[0].formatted)});
 
    console.log(address);
  }, [coordinates, api_key, address]);

  return (
    <>
      Find A Lawyer
    </>
  )
}

Page.getLayout = (page) => (
    <DashboardLayout>
      {page}
    </DashboardLayout>
  );
  
  export default Page;