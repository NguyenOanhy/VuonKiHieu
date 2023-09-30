import React, { useEffect, useState } from 'react';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../firebase';
import { useNavigate, useParams } from 'react-router-dom';
const Color =() =>{
    const navigate = useNavigate();
    const {topic} = useParams();
    const [colors, setColors] = useState([])

    useEffect(() => {
        getColors()
    }, [topic])

    function getColors() {
        const colorRef = collection(db, 'Color')
        getDocs(colorRef)
        .then(Response => {
            const colors = Response.docs.map(doc => ({
            data: doc.data(),
            id: doc.id,
            }))
            setColors(colors) 
        })
        .catch(error => console.log(error.message))
    }

    const handleItemClick = async (color) => {
        try {
        // Xử lý khi người dùng nhấp vào ô
        // const imageUrl = await getImageFromFirebase('images', '7.jpg');
        // console.log('URL của hình ảnh:', imageUrl);
        console.log(`Bạn đã nhấp vào mục: ${color.data.name}`);
        // Thêm xử lý tùy ý tại đây
        navigate(`/topic/color/${color.id}`);
        
        } catch (error) {
        console.error('Lỗi khi lấy URL hình ảnh:', error);
        }
    };
    return (
        <div className="p-6 grid grid-cols-4 gap-6 md:gap-4">
            {colors.map(color => (
                <div 
                key={color.id} 
                className="outline outline-2 p-4 rounded-lg cursor-pointer transition-transform hover:scale-105 m-6" 
                onClick={() => handleItemClick(color)} 
                >
                <div className="flex h-56 " 
                style = {{ 
                    backgroundImage: `url(${color.data.imageUrl})`, 
                    backgroundSize: 'cover', 
                    backgroundPosition: 'center', 
                    backgroundRepeat: 'no-repeat', 
                    }}
                ></div>
                <div className="text-lg font-semibold mt-2 text-center">
                    {color.data.name}
                </div>
                
                </div>
            ))}
        </div> 
    )
}

export default Color;