import React, { useEffect, useState } from 'react';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../firebase';
import { useNavigate, useParams } from 'react-router-dom';
const Animal = (isLoggedIn) =>{

    const navigate = useNavigate();
    const {topic} = useParams();
  const [animals, setAnimals] = useState([])

  useEffect(() => {
    getAnimals()
  }, [topic])

  function getAnimals() {
    const animalRef = collection(db, 'Animal')
    getDocs(animalRef)
      .then(Response => {
        const animals = Response.docs.map(doc => ({
          data: doc.data(),
          id: doc.id,
        }))
        setAnimals(animals) 
      })
      .catch(error => console.log(error.message))
  }

  const handleItemClick = async (animal) => {
    try {
      (isLoggedIn ? navigate(`/private/topic/animal/${animal.id}`)
      : navigate(`topic/animal/${animal.id}`)
      );
      
    } catch (error) {
       console.error('Lỗi khi lấy URL hình ảnh:', error);
    }
  };
  return (
    <div className="p-6 grid grid-cols-4 gap-6 md:gap-4">
          {animals.map(animal => (
            <div 
              key={animal.id} 
              className="outline outline-2 p-4 rounded-lg cursor-pointer transition-transform hover:scale-105 m-6" 
              onClick={() => handleItemClick(animal)} 
            >
              <div className="flex h-56 " 
              style = {{ 
                backgroundImage: `url(${animal.data.imageUrl})`, 
                backgroundSize: 'cover', 
                backgroundPosition: 'center', 
                backgroundRepeat: 'no-repeat', 
                }}
              ></div>
              <div className="text-lg font-semibold mt-2 text-center">
                {animal.data.name}
              </div>
              
            </div>
        ))}
    </div> 
  )
}

export default Animal;