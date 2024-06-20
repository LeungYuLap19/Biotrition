import React, { useEffect, useContext } from 'react';
import { Menu, Badge} from 'antd'
import { HomeOutlined, AppstoreOutlined, TeamOutlined, ShoppingCartOutlined } from '@ant-design/icons'
import { useLocation, useNavigate } from 'react-router-dom'
import responsiveMenuCss from './css/ResponsiveMenu.module.css';
import { CartContext } from './CartContext';

function responsiveMenu() {
    const navigation = useNavigate()
    const location = useLocation()
    const { cartItems } = useContext(CartContext);

    useEffect(() => {
        if (location.pathname === '/') {
            navigation('/home');
        }
    }, []);

    const items = [
        {
            label: 'Home',
            key: '/home',
            icon: <HomeOutlined />,
            onClick: () => {
                navigation('/home')
            }
        },
        {
            label: 'Products',
            key: '/products',
            icon: <AppstoreOutlined />,
            onClick: () => {
                navigation('/products')
            }
        },
        {
            label: 'About',
            key: '/about',
            icon: <TeamOutlined />,
            onClick: () => {
                navigation('/about')
            }
        },
        {
            label: 'Cart',
            key: '/cart',
            icon: <Badge size="small" count={cartItems.length}><ShoppingCartOutlined /></Badge>,
            onClick: () => {
                navigation('/cart')
            }
        },
    ]

    return (
        <>
            <div className={responsiveMenuCss.logo} />
            <Menu style={{ display: 'flex' }} disabledOverflow="true" theme="dark" mode="horizontal" selectedKeys={[location.pathname]} items={items} />
        </>
    )
}
export default responsiveMenu