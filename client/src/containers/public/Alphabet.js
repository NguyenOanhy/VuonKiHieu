
import React, { useEffect, useState } from 'react';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../../firebase';
const Alphabet =() =>{
  const [Alphabets, setAlphabets] = useState([])

  useEffect(() => {
    getAlphabets()
  }, [])

  function getAlphabets() {
    const AlphabetRef = collection(db, 'Alphabet')
    getDocs(AlphabetRef)
      .then(Response => {
        const Alphabets = Response.docs.map(doc => ({
          data: doc.data(),
          id: doc.id,
        }))
        setAlphabets(Alphabets) 
      })
      .catch(error => console.log(error.message))
  }

  return (
    <div>
        <div className='flex pt-20 pb-10 text-[24px] items-center justify-center font-semibold'>Bảng chữ cái ngôn ngữ ký hiệu Việt Nam</div>
        <div className="px-10 grid grid-cols-2 gap-10 md:gap-6">
          {Alphabets.map(Alphabet => (
            <div 
              key={Alphabet.id} 
              className="bg-neutral-100 outline outline-2 outline-gray-300 shadow-xl p-4 rounded-lg cursor-pointer transition-transform hover:scale-105 m-6" 
            >
              <div className="flex h-80 bg-contain" 
              style = {{ 
                backgroundImage: `url(${Alphabet.data.imageUrl})`, 
                backgroundSize: 'cover', 
                backgroundPosition: 'center', 
                backgroundRepeat: 'no-repeat', 
                }}
              ></div>
              <div className="text-lg font-semibold mt-2 text-center">
                {Alphabet.data.name}
              </div>
              
            </div>
        ))}
    </div> 
    </div>
    
  
  )
}

export default Alphabet;