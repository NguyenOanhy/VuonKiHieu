import React, { useEffect, useState } from 'react';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../firebase';
import { useNavigate, useParams } from 'react-router-dom';
const Nature =() =>{
    const navigate = useNavigate();
    const {topic} = useParams();
    const [natures, setNatures] = useState([])

    useEffect(() => {
        getNatures()
    }, [topic])

    function getNatures() {
        const natureRef = collection(db, 'Nature')
        getDocs(natureRef)
        .then(Response => {
            const natures = Response.docs.map(doc => ({
            data: doc.data(),
            id: doc.id,
            }))
            setNatures(natures) 
        })
        .catch(error => console.log(error.message))
    }

    const handleItemClick = async (nature) => {
        try {
        // Xử lý khi người dùng nhấp vào ô
        // const imageUrl = await getImageFromFirebase('images', '7.jpg');
        console.log(`Bạn đã nhấp vào mục: ${nature.data.name}`);
        // Thêm xử lý tùy ý tại đây
        navigate(`/topic/nature/${nature.id}`);
        
        } catch (error) {
        console.error('Lỗi khi lấy URL hình ảnh:', error);
        }
    };
    return (
        <div className="p-6 grid grid-cols-4 gap-6 md:gap-4">
            {natures.map(nature => (
                <div 
                key={nature.id} 
                className="outline outline-2 p-4 rounded-lg cursor-pointer transition-transform hover:scale-105 m-6" 
                onClick={() => handleItemClick(nature)} 
                >
                <div className="flex h-56 " 
                style = {{ 
                    backgroundImage: `url(${nature.data.imageUrl})`, 
                    backgroundSize: 'cover', 
                    backgroundPosition: 'center', 
                    backgroundRepeat: 'no-repeat', 
                    }}
                ></div>
                <div className="text-lg font-semibold mt-2 text-center">
                    {nature.data.name}
                </div>
                
                </div>
            ))}
        </div> 
    )
}

export default Nature;