import React from 'react'
import Edit from "../img/pen.png"
import Delete from "../img/bin.png"
import { Link } from 'react-router-dom'
import Menu from '../components/Menu'


const Single = () => {
  return (
    <div className='single'>
      <div className="content">
        <img src="https://images.pexels.com/photos/1103970/pexels-photo-1103970.jpeg?auto=compress&cs=tinysrgb&w=800" alt="" />
        <div className="user">
          <img src="https://images.pexels.com/photos/1103970/pexels-photo-1103970.jpeg?auto=compress&cs=tinysrgb&w=800" alt="" />
          <div className="info">
            <span>Gül</span>
            <span>posted 2 days ago</span>
          </div>
          <div className="edit">
            <Link to="/write?edit=2">
              <img src={Edit} alt="" />
            </Link>
            <img src={Delete} alt="" />
          </div>
        </div>
        <h1>Title</h1>
        <p>Yapılacak çalışma hakkında, belirlenen bir zaman diliminde nasıl bir sonuç, hangi seviyede başarıya ulaşmak istediğimiz belirlenir. Hedefimiz gerçekçi ve çalışma sonucunda ortaya çıkacak raporla örtüşecek şekilde olmalıdır.</p>
      </div>
      <div className="menu">
        <Menu/>
      </div>
    </div>
  )
}

export default Single