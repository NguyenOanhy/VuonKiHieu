import { Fragment , useState, useEffect} from 'react';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../../firebase';
import { format } from 'date-fns';
import PostCard from '../../components/PostComponent/PostCard';
import ShowCard from '../../components/PostComponent/ShowCard';

const Library = () => {
  const [posts, setPosts] = useState([])
  const [postList   , setPostList] = useState([ ]); 
  const addPostHandler = ( enteredContent, enteredTitle, enteredImage, enteredCategory) => { 
    console.log(enteredImage,"image");
      setPostList((prevUsersList) => {
        return [...prevUsersList, {
            content: enteredContent,
            title: enteredTitle,
            image: enteredImage,
            category: enteredCategory,
            id: Math.random().toString()}];
      });
  };

  function getDate(timestamp) {
    var date = new Date(timestamp * 1000)
    var year = date.getFullYear().toString();
    var month = (date.getMonth() + 101).toString().substring(1);
    var day = (date.getDate() + 100).toString().substring(1);
    return day + '/' + month + '/' + year;
}

  useEffect(() => {
    getPosts()
  },)

  function getPosts() {
    const postRef = collection(db, 'Post')
    getDocs(postRef)
      .then(Response => {
        const posts = Response.docs.map(doc => ({
          data: doc.data(),
          id: doc.id,
        }))
        console.log()
        setPosts(posts) 
      })
      .catch(error => console.log(error.message))
  }

  return (
    <Fragment>
       
        <PostCard addPost={addPostHandler} />
        
        {/* <ShowCard newpost={postList} /> */}
        <div className="m-10 mx-auto">
          <ul>
            {posts.map((post) => (
            
              <li key={post.id} className="border border-gray-300  mb-10 text-white my-10 mx-20 rounded-lg px-7 py-7 bg-[#E9C3BB] flex">
                <video id="videoPlayer" width="320" height="240" controls className='border border-2px'>
                    <source src={post.data.image} type="video/mp4" />
                  </video>
                <div className="flex justify-between mt-2 ml-4 px-5">
                  <div className="text-black">
                    <p className="text-xl font-bold capitalize">Tên tác giả: {post.data.name}</p>
                    {/* <p className="text-sm font-light text-gray-500">{getDate(post.data.timestamp).year}-{getDate(post.data.timestamp).month < 10 ? `0${getDate(post.data.timestamp).month}` : `${getDate(post.data.timestamp).month}`}-{getDate(post.data.timestamp).date}</p> */}
                    <p className="text-sm font-light text-gray-500">Thời gian đăng: {getDate(post.data.timestamp)}</p>
                    <p className="text-black mt-2">{post.data.data}</p>
                  </div>
                </div>
                
              </li>
            
          ))}
          </ul>
        </div>
    </Fragment>
  );
}
// }
export default Library;
