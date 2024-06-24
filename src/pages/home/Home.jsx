import React from 'react'
import UserData from '../../components/userData/UserData'
import UserCalculation from '../../components/userCalculations/UserCalculation'

const Home = () => {
   
  return (
    <div className='home-main'>
       <UserData/>
       <UserCalculation/>
    </div>
  )
}

export default Home
