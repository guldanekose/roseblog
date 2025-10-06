import React from 'react'
import { useEffect } from 'react';
import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import axios from 'axios';

const Home = () => {

  const [posts, setPosts] = useState([])

  const cat = useLocation().search

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get(`/api/posts${cat}`)
        setPosts(res.data);
      } catch (err) {
        console.log(err);
      }
    }
    fetchData()
  }, [cat])
  // const posts = [
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

  const getText = (html) => {
    const doc = new DOMParser().parseFromString(html, "text/html")
    return doc.body.textContent
  }
  return (
    <div className='home'>
      <div className='posts'>
        {posts.map(post => (
          <div className='post' key={post.id}>
            <div className="img">
              <img src={`../upload/${post.img}`} alt="" />
            </div>
            <div className="content">
              <Link className="link" to={`/post/${post.id}`}>
                <h1>{post.title}</h1>
              </Link>
              <p>{getText(post.desc)}</p>
              <Link className="link" to={`/post/${post.id}`}>
                <button>Read More</button>
              </Link>
              <div className="desc"></div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default Home