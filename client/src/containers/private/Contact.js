
import React, { useEffect, useState } from 'react';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../../firebase';
import icons from '../../utils/icons';

const Contact =() =>{
  const [Contacts, setContacts] = useState([])
  const {MdDriveFileRenameOutline, BiMap, CgMail} = icons

  useEffect(() => {
    getContacts()
  }, [])

  function getContacts() {
    const ContactRef = collection(db, 'Contact')
    getDocs(ContactRef)
      .then(Response => {
        const Contacts = Response.docs.map(doc => ({
          data: doc.data(),
          id: doc.id,
        }))
        setContacts(Contacts) 
      })
      .catch(error => console.log(error.message))
  }

  return (
    <div>
        <div className="px-20 flex flex-col gap-2 mt-20">
          {Contacts.map(Contact => (
            <div 
              key={Contact.id} 
              className="p-4 m-2 border-b-2" 
            >
              <div className="text-[18px] mt-2 flex items-center">
                <MdDriveFileRenameOutline className='mr-2'/> {Contact.data.name}
              </div>
              <div className="text-[16px] mt-2 flex items-center">
                <BiMap className='mr-2'/> {Contact.data.address}
              </div>
              <div className="text-[16px] mt-2 flex items-center">
                <CgMail className='mr-2'/> {Contact.data.gmail}
              </div>
              
            </div>
        ))}
    </div> 
    </div>
    
  
  )
}

export default Contact;