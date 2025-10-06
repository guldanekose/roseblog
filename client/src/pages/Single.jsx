import React from 'react'
import Edit from "../img/pen.png"
import Delete from "../img/bin.png"
import { Link, useLocation, useNavigate } from 'react-router-dom'
import Menu from '../components/Menu'
import { useState } from 'react'
import axios from 'axios'
import moment from 'moment'
import { useContext } from 'react'
import { AuthContext } from '../context/authContext'
import { useEffect } from 'react'


const Single = () => {

  const [post, setPost] = useState([])

  const location = useLocation()
  const navigate = useNavigate()
  const postId = location.pathname.split("/")[2]

  const { currentUser } = useContext(AuthContext)

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get(`/api/posts/${postId}`)
        setPost(res.data);

      } catch (err) {
        console.log(err);
      }
    }
    fetchData()
  }, [postId])

  const handleDelete = async () => {
    try {
      await axios.delete(`/api/posts/${postId}`)
      navigate("/")

    } catch (err) {
      console.log(err);
    }
  }
  const getText = (html) => {
    const doc = new DOMParser().parseFromString(html, "text/html")
    return doc.body.textContent
  }
  return (
    <div className='single'>
      <div className="content">
        <img src={`../upload/${post.img}`} alt="" />
        <div className="user">
          {post.userImg && <img src={post.userImg} alt="" />}
          <div className="info">
            <span>{post.username}</span>
            <span>posted {moment(post.date).fromNow()}</span>
          </div>
          {currentUser?.username === post?.username && <div className="edit">
            <Link to={`/write?edit=${post.id}`} state={post}>
              <img src={Edit} alt="" />
            </Link>
            <img onClick={handleDelete} src={Delete} alt="" />
          </div>}
        </div>
        <h1>{post.title}</h1>
        {getText(post.desc)}
      </div>
      <div className="menu">
        <Menu cat={post.cat} />
      </div>
    </div>
  )
}

export default Single