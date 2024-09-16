import React from 'react';
import './MainContent.css'

const MainContent = ({ children }) => {
  return (
    <main className='main-content-container'>
      {children}
    </main>
  )
}

export default MainContent