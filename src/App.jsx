import React, { useState } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { Layout, theme, ConfigProvider } from 'antd';

import { CartContext } from './CartContext';

import ResponsiveMenu from './responsiveMenu'
import Home from './home'
import Cart from './cart'
import About from './about'
import Products from './products'
import BrandProducts from './BrandProducts'

const { Header, Content, Footer } = Layout;

function App() {

  const [cartItems, setCartItems] = useState([])

  const {
    token: { colorBgContainer },
  } = theme.useToken()

  return (
    <ConfigProvider
    theme={{
      token: {
        colorPrimary: "#1c8a97",
        colorInfo: "#1c8a97"
      },
    }}
  >
    
    <BrowserRouter>  
      <CartContext.Provider value={{cartItems, setCartItems}}>
      <Layout className="layout">
        <Header style={{display: 'flex', alignItems: 'center' }}>
          <ResponsiveMenu />
        </Header>
        <Content style={{ padding: '0 50px' }}>
          <div className="site-layout-content" style={{ background: colorBgContainer, padding: '0 50px' }}>
            <Routes>
              <Route path='/home' element={<Home />} />
              <Route path='/products' element={<Products />} />
              <Route path='/products/:brand' element={<BrandProducts/>}></Route>
              <Route path='/about' element={<About />} />
              <Route path='/cart' element={<Cart />} />
            </Routes>
          </div>
        </Content>
        <Footer style={{ textAlign: 'center' }}>Biotrition ©2023 Created by s215420 Wong Yiu Chung | s216745 Chun Man Fong | s216755 Leung Yu Lap | s225372 Cheung Chung Yin | s225380 Li Kam Ki</Footer>
      </Layout>
      </CartContext.Provider> 
    </BrowserRouter>
    </ConfigProvider>
  )
}

export default App
