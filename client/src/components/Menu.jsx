import React from 'react'

const Menu = () => {
     const posts = [
    {
      id: 1,
      title: "test",
      desc: "testtt",
      img: "https://images.pexels.com/photos/1103970/pexels-photo-1103970.jpeg?auto=compress&cs=tinysrgb&w=800"
    },
    {
      id: 2,
      title: "test2",
      desc: "testtt",
      img: "https://images.pexels.com/photos/1103970/pexels-photo-1103970.jpeg?auto=compress&cs=tinysrgb&w=800"
    },
    {
      id: 3,
      title: "test3",
      desc: "testtt",
      img: "https://images.pexels.com/photos/1103970/pexels-photo-1103970.jpeg?auto=compress&cs=tinysrgb&w=800"
    },
  ];
  return (
    <div className='menu'>
        <h1>Other posts you may like</h1>
        {posts.map((post) => (
            <div className='post' key={post.id}>
                <img src={post.img} alt="" />
                <h2>{post.title}</h2>
                <button>Read More</button>
            </div>
        ))}
    </div>
  )
}

export default Menu