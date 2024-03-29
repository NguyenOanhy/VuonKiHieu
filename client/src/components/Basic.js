import React, { useEffect, useState } from 'react';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../firebase';
import { useNavigate, useParams } from 'react-router-dom';
const Basic =(isLoggedIn) =>{
    const navigate = useNavigate();
    const {topic} = useParams();
    const [basics, setBasics] = useState([])

    useEffect(() => {
        getBasics()
    }, [topic])

    function getBasics() {
        const basicRef = collection(db, 'Basic')
        getDocs(basicRef)
        .then(Response => {
            const basics = Response.docs.map(doc => ({
            data: doc.data(),
            id: doc.id,
            }))
            setBasics(basics) 
        })
        .catch(error => console.log(error.message))
    }

    const handleItemClick = async (basic) => {
        try {
            (isLoggedIn ? navigate(`private/topic/basic/${basic.id}`)
            : navigate(`/topic/basic/${basic.id}`));
        
        } catch (error) {
        console.error('Lỗi khi lấy URL hình ảnh:', error);
        }
    };
    return (
        <div className="p-6 grid grid-cols-4 gap-6 md:gap-4">
            {basics.map(basic => (
                <div 
                key={basic.id} 
                className="outline outline-2 p-4 rounded-lg cursor-pointer transition-transform hover:scale-105 m-6" 
                onClick={() => handleItemClick(basic)} 
                >
                <div className="flex h-56 " 
                style = {{ 
                    backgroundImage: `url(${basic.data.imageUrl})`, 
                    backgroundSize: 'cover', 
                    backgroundPosition: 'center', 
                    backgroundRepeat: 'no-repeat', 
                    }}
                ></div>
                <div className="text-lg font-semibold mt-2 text-center">
                    {basic.data.name}
                </div>
                
                </div>
            ))}
        </div> 
    )
}

export default Basic;