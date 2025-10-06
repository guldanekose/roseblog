import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'

const Menu = ({ cat }) => {

  const [posts, setPosts] = useState([])

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get(`/api/posts/?cat=${cat}`)
        setPosts(res.data);
      } catch (err) {
        console.log(err);
      }
    }
    fetchData()
  }, [cat])
  //    const posts = [
  //   {
  //     id: 1,
  //     title: "test",
  //     desc: "testtt",
  //     img: "https://images.pexels.com/photos/1103970/pexels-photo-1103970.jpeg?auto=compress&cs=tinysrgb&w=800"
  //   },
  //   {
  //     id: 2,
  //     title: "test2",
  //     desc: "testtt",
  //     img: "https://images.pexels.com/photos/1103970/pexels-photo-1103970.jpeg?auto=compress&cs=tinysrgb&w=800"
  //   },
  //   {
  //     id: 3,
  //     title: "test3",
  //     desc: "testtt",
  //     img: "https://images.pexels.com/photos/1103970/pexels-photo-1103970.jpeg?auto=compress&cs=tinysrgb&w=800"
  //   },
  // ];
  return (
    <div className='menu'>
      <h1>Other posts you may like</h1>
      {posts.map((post) => (
        <div className='post' key={post.id}>
          <img src={`../upload/${post.img}`} alt="" />
          <h2>{post.title}</h2>
          <Link className="link" to={`/post/${post.id}`}>
            <button>Read More</button></Link>
        </div>
      ))}
    </div>
  )
}

export default Menu