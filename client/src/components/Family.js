import React, { useEffect, useState } from 'react';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../firebase';
import { useNavigate, useParams } from 'react-router-dom';
const Family =() =>{
    const navigate = useNavigate();
    const {topic} = useParams();
    const [familys, setFamilys] = useState([])

    useEffect(() => {
        getFamilys()
    }, [topic])

    function getFamilys() {
        const familyRef = collection(db, 'Family')
        getDocs(familyRef)
        .then(Response => {
            const familys = Response.docs.map(doc => ({
            data: doc.data(),
            id: doc.id,
            }))
            setFamilys(familys) 
        })
        .catch(error => console.log(error.message))
    }

    const handleItemClick = async (family) => {
        try {
        // Xử lý khi người dùng nhấp vào ô
        // const imageUrl = await getImageFromFirebase('images', '7.jpg');
        // console.log('URL của hình ảnh:', imageUrl);
        console.log(`Bạn đã nhấp vào mục: ${family.data.name}`);
        // Thêm xử lý tùy ý tại đây
        navigate(`/topic/family/${family.id}`);
        
        } catch (error) {
        console.error('Lỗi khi lấy URL hình ảnh:', error);
        }
    };
    return (
        <div className="p-6 grid grid-cols-4 gap-6 md:gap-4">
            {familys.map(family => (
                <div 
                key={family.id} 
                className="outline outline-2 p-4 rounded-lg cursor-pointer transition-transform hover:scale-105 m-6" 
                onClick={() => handleItemClick(family)} 
                >
                <div className="flex h-56 " 
                style = {{ 
                    backgroundImage: `url(${family.data.imageUrl})`, 
                    backgroundSize: 'cover', 
                    backgroundPosition: 'center', 
                    backgroundRepeat: 'no-repeat', 
                    }}
                ></div>
                <div className="text-lg font-semibold mt-2 text-center">
                    {family.data.name}
                </div>
                
                </div>
            ))}
        </div> 
    )
}

export default Family;