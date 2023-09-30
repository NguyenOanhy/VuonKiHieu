
import React, { useEffect, useState } from 'react';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../firebase';
import { useNavigate } from 'react-router-dom';
const Animal =() =>{
  const navigate = useNavigate();
  const [animals, setAnimals] = useState([])

  useEffect(() => {
    getAnimals()
  }, [])

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
     // Xử lý khi người dùng nhấp vào ô
      // const imageUrl = await getImageFromFirebase('images', '7.jpg');
      // console.log('URL của hình ảnh:', imageUrl);
      console.log(`Bạn đã nhấp vào mục: ${animal.data.name}`);
      // Thêm xử lý tùy ý tại đây
      navigate(`/topic/${animal.path}`);
      
    } catch (error) {
       console.error('Lỗi khi lấy URL hình ảnh:', error);
    }
  };
  return (
    <div className="p-10 grid grid-cols-2 gap-10 md:gap-6">
          {animals.map(animal => (
            <div 
              key={animal.id} 
              className="bg-neutral-100 outline outline-2 outline-gray-300 shadow-xl p-4 rounded-lg cursor-pointer transition-transform hover:scale-105 m-6" 
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
    // <div>
    //   <h4>ListAnimals</h4>
    //   <ul>
    //     {animals.map(animal => <li key={animal.id}>{animal.data.name}</li>)}
    //   </ul>
    // </div>
  )
}

export default Animal;