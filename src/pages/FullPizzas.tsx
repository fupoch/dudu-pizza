import axios from 'axios'
import React, { useEffect } from 'react'
import { useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'

const FullPizzas: React.FC = () => {
  const [pizza, setPizza] = useState<{
    imageUrl: string,
    title: string,
    price: number
  }>()
  const { id } = useParams()
  const navigate = useNavigate()
  useEffect(() => {
    async function fetchPizzas() {
      try {
        const { data } = await axios.get(`https://628944e910e93797c1642ad9.mockapi.io/items/${id}`)
        setPizza(data)
      } catch (error) {
        alert(error)
        navigate('/')
      }
    }
    fetchPizzas()
  }, [])
  if (!pizza) {
    return <>'Загрузка...'</>
  }
  return (
    <div className='container'>
      <img src={pizza.imageUrl}></img>
      <h2>{pizza.title}</h2>
      <h4>{pizza.price} ₽</h4>
    </div>
  )
}

export default FullPizzas