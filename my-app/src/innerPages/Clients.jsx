import React,{ useEffect, useState, useCallback } from 'react';
import ClientDetails from '../components/Clients/ClientDetails';
import ContactSection from '../components/Contact/ContactSection';
import BannerSection from '../components/Topbanner/BannerSection';
import PageLoader from '../components/Pageloader/PageLoader';
import Datafetching from '../pages/Datafetching';

const Clients = () => {

  const[isApiLoad, setIsApiLoad] = useState(true);
  const [clientsName, setClientsName] = useState([]);

  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    })
  }, []);
  
  return ( 
    
   <>
      <Datafetching API="https://backend.matratech.in/api/clients" 
        onChildData={useCallback((clientsLogo)=> {
        console.log(clientsLogo); 
        setClientsName(clientsLogo);
      },[])} />

      { isApiLoad && <PageLoader /> }
      <BannerSection title='clients' />
      <hr style={{color:'#333333'}}/>
      <section className='clents-wrap' style={{background: 'transparent'}}>
        <ClientDetails 
          startIndex={10} 
          endIndex={clientsName?.length}
          handleAPI={(apiRes)=> setIsApiLoad(apiRes)}
        />
      </section>
      <ContactSection />
   </>
  )
}

export default Clients;