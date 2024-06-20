import React, { useContext, useState } from 'react';
import { CartContext } from './CartContext';
import { Typography, Flex, Button, Avatar, List, InputNumber, Col, Row, Card, Modal, Result } from 'antd';
import { PlusOutlined, MinusOutlined } from '@ant-design/icons';
import { PayPalScriptProvider, PayPalButtons } from '@paypal/react-paypal-js';

const { Title, Text } = Typography;

function Cart() {
  const { cartItems, setCartItems } = useContext(CartContext);

  const onChange = (index, value) => {
    if (value > 0 && value <= 99) {
      const updatedCartItems = [...cartItems];
      updatedCartItems[index].quantity = value;
      setCartItems(updatedCartItems);
    } else if (value === 0) {
      removeFromCart(index);
    }
  };

  const removeFromCart = (index) => {
    const updatedCartItems = [...cartItems];
    updatedCartItems.splice(index, 1);
    setCartItems(updatedCartItems);
  };

  const clearCart = () => {
    setCartItems([]);
  };

  const calculateGrandTotal = (items) => {
    return items.reduce((total, item) => total + item.price * item.quantity, 0);
  };

 // const grandTotal = calculateGrandTotal(cartItems);

  const cartItemCount = cartItems.length;

  const [isModalOpen, setIsModalOpen] = useState(false);

  const showModal = () => {
    setIsModalOpen(true);
  };

  return (
    <>
      <Title level={2}>Shopping Cart</Title>
      <Row justify="center" align="top">
        <Col span={14}>
        <Button danger onClick={() => clearCart()}>Clear All</Button>
          <List
            itemLayout="horizontal"
            dataSource={cartItems}
            renderItem={(product, index) => (
              <List.Item key={index}>
                <List.Item.Meta
                  avatar={<Avatar shape="square" size={100} src={product.imageURL} />}
                  title={product.brand + " - " + product.name}
                  description={<span>Amount: {product.amount}<br />Quantity: {product.quantity}<br />Total: ${product.price * product.quantity}</span>}
                />
                <Flex vertical>
                  <Flex>
                    <Button type="secondary" icon={<MinusOutlined />} onClick={() => onChange(index, product.quantity - 1)}></Button>
                    <InputNumber controls={false} min={0} max={99} value={product.quantity} onChange={(value) => onChange(index, value)} style={{ width: 50 }} />
                    <Button type="secondary" icon={<PlusOutlined />} onClick={() => onChange(index, product.quantity + 1)}></Button>
                  </Flex>
                  <Title level={4}></Title>
                  <Button danger onClick={() => removeFromCart(index)}>Remove</Button>
                </Flex>
              </List.Item>
            )}
          />
        </Col>
        <Col span={6} offset={4}>
          <Card
            title={<Title level={3}>Order Summary</Title>}
          >
            <Title type="success" level={4}>Items: {cartItemCount} </Title>
            <Title type="success" level={4}>Total: HK${calculateGrandTotal(cartItems)}</Title>
            <Title level={3} />
            <PayPalScriptProvider options={{ 'client-id': 'AR4kxEbVIQ1gyccDIOEpbS2ezfty34Y6tPbOSNUw32XxwmZTnMCjUGNo98E7-Hk6ismDbYXrAzGvfSNA', 'currency': "HKD" }}>
              <PayPalButtons
                style={{ layout: 'horizontal', color: "silver" }}
                createOrder={(data, actions) => {
                  // Define the order creation logic here
                  return actions.order.create({
                    purchase_units: [
                      {
                        amount: {
                          value: (calculateGrandTotal(cartItems)).toFixed(2),
                        },
                      },
                    ],
                  });
                }}
                onApprove={(data, actions) => {
                  // Define the logic to be executed when the payment is approved
                  return actions.order.capture().then(function (details) {
                    showModal();
                  });
                }}
              />
            </PayPalScriptProvider>
            <Modal
              open={isModalOpen}
              footer={[
                <Button type="primary" key="confirm" onClick={() => setIsModalOpen(false)}>Confirm</Button>
              ]}>
              <Result
                status="success"
                title="Successfully Purchased"
              />
            </Modal>
          </Card>
        </Col>
      </Row>
    </>
  );
}

export default Cart;