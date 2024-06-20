import React, { useState, useContext, useEffect } from 'react';
import { Layout, Radio, Modal, Card, Flex, Button, InputNumber, Typography } from 'antd';
import { PlusOutlined, MinusOutlined } from '@ant-design/icons';
import { CartContext } from './CartContext';

function ProductModal({ isModalOpen, setIsModalOpen, product }) {
    const [quantity, setQuantity] = useState(0);
    const [selectedAmount, setSelectedAmount] = useState(0);
    const { Footer, Content } = Layout;
    const { Title, Text } = Typography;
    const { cartItems, setCartItems } = useContext(CartContext);

    useEffect(() => {
        if (product) {
            const cartItem = cartItems.find(item => item.name === product.name);
            if (cartItem) {
                setQuantity(cartItem.quantity);
                setSelectedAmount(cartItem.selectedAmount);
            } else {
                setQuantity(0);
                setSelectedAmount(0);
            }
        }
    }, [cartItems, product]);

    useEffect(() => {
        const cartItemsFromStorage = JSON.parse(localStorage.getItem('cartItems'));
        if (cartItemsFromStorage) {
            setCartItems(cartItemsFromStorage);
        }
    }, [setCartItems]);

    useEffect(() => {
        localStorage.setItem('cartItems', JSON.stringify(cartItems));
    }, [cartItems]);

    const handleAmountSelect = (e) => {
        setSelectedAmount(e.target.value);
    };

    const imgStyle = {
        display: 'block',
        width: 450,
    };

    const contentStyle = {
        textAlign: 'left',
        backgroundColor: '#fff',
    };

    const footerStyle = {
        padding: '10px 10px',
        textAlign: 'right',
        backgroundColor: '#fff',
    };

    const onChange = (value) => {
        if (value >= 0 && value <= 99) {
            setQuantity(value);
        }
    };

    const addToCart = () => {
        if (product && quantity > 0) {
            const newCartItem = {
                brand: product.brand,
                name: product.name,
                prices: product.prices,
                amounts: product.amounts,
                features: product.features,
                shortDescription: product.shortDescription,
                price: product.prices[selectedAmount],
                amount: product.amounts[selectedAmount],
                imageURL: product.imageURL,
                selectedAmount: selectedAmount,
                quantity: quantity
            };

            const existingCartItemIndex = cartItems.findIndex(item => item.name === product.name);
            if (existingCartItemIndex !== -1) {
                const updatedCartItems = [...cartItems];
                updatedCartItems[existingCartItemIndex] = newCartItem;
                setCartItems(updatedCartItems);
            } else {
                setCartItems(prevCartItems => [...prevCartItems, newCartItem]);
            }
        } else if (product && quantity === 0) {
            const updatedCartItems = cartItems.filter(item => item.name !== product.name);
            setCartItems(updatedCartItems);
        }
        setIsModalOpen(false);
    };

    if (!product) {
        return null;
    }

    return (
        <Modal
            title={product.brand + " - " + product.name}
            open={isModalOpen}
            footer={[
                <Button type="primary" key="confirm" onClick={addToCart}>Confirm</Button>
            ]}
            onCancel={() => setIsModalOpen(false)}
            width={1000}
        >
            <Layout>
                <Content style={contentStyle}>
                    <Card style={{ width: 950 }} bodyStyle={{ padding: 0, overflow: 'hidden' }}>
                        <Flex gap={50}>
                            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                                <img
                                    alt={`${product.brand}-${product.name}`}
                                    src={product.imageURL}
                                    style={imgStyle}
                                />
                            </div>
                            <Layout>
                                <Content style={contentStyle}>
                                    <Title level={4}>Description</Title>
                                    <Text strong>{product.shortDescription}</Text>
                                    <Title level={4}>Key Features</Title>
                                    <ul>
                                        {product.features.map((feature, index) => (
                                            <li key={index}>
                                                <Text italic>{feature}</Text>
                                            </li>
                                        ))}
                                    </ul>

                                    <Title level={4}>Amount</Title>

                                    <Radio.Group onChange={handleAmountSelect} value={selectedAmount}>
                                        {product.amounts.map((amount, index) => (
                                            <Radio.Button key={index} value={index}>
                                                {amount}
                                            </Radio.Button>
                                        ))}
                                    </Radio.Group>
                                </Content>
                                <Footer style={footerStyle}>
                                    <Flex vertical justify='space-between' align='flex-end'>
                                        <Title></Title>
                                        <Flex>
                                            <Button type="secondary" icon={<MinusOutlined />} onClick={() => onChange(quantity - 1)}></Button>
                                            <InputNumber controls={false} min={0} max={99} value={quantity} onChange={onChange} style={{ width: 50 }} />
                                            <Button type="secondary" icon={<PlusOutlined />} onClick={() => onChange(quantity + 1)}></Button>                                       
                                        </Flex>
                                        <Title level={5} key="total">Total: HK${product.prices[selectedAmount] * quantity} </Title>
                                    </Flex>
                                </Footer>
                            </Layout>
                        </Flex>
                    </Card>
                </Content>
            </Layout>
        </Modal>
    );
}

export default ProductModal;