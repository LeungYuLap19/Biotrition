import React, { useState } from 'react';
import { Layout, Space, Modal, Card, Flex, Button, InputNumber, Typography, ConfigProvider } from 'antd';
import { FacebookOutlined, InstagramOutlined, TwitterOutlined, YoutubeOutlined } from '@ant-design/icons';
import { Descriptions } from 'antd';
import aboutCss from './css/about.module.css';


function about() {
  const { Footer, Content } = Layout;
  const { Paragraph, Title, Text } = Typography;

  const items = [
    {
      key: '1',
      label: 'Location',
      children: "1/F, Tin Shing Factory Building, 38 Belcher's Street, Kennedy Town, Hong Kong",
    },
    {
      key: '2',
      label: 'Business Hours',
      children: '10:00 am to 5:00 pm',
    },
    {
      key: '3',
      label: 'Email',
      children: 'biotritionhk@gmail.com',
    },
    {
      key: '4',
      label: 'Phone no',
      children: '2888 7531',
    },

  ];

  return (
    
    <ConfigProvider
      theme={{
        components: {
          Typography: {
            fontSize: 18,
          },
        },
      }}>
      <div className={aboutCss.image} />
      <Flex justify='center' align='center'>
        <Space direction="vertical" size="large" style={{ width: '75%' }} >
        
          <Paragraph>
            <Title align="center" level={2}>About Us</Title>
            <Text strong>
              Biotrition, the leading protein product company in Hong Kong.
              Our mission is to promote health and sustainability by providing superior protein products that nourish and energize our customers.
              We are committed to sourcing the finest ingredients and employing eco-friendly practices to support a healthier planet.
              At Biotrition, we understand the importance of nutrition and the role it plays in achieving optimal health and fitness goals.
              We have developed a range of premium protein products to support your active lifestyle and help you reach your fitness aspirations.
            </Text>

          </Paragraph>
          <Flex justify='space-between' gap={100}>

            <div>
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d643.2807445216844!2d114.12940061850911!3d22.28272281512739!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3403ff9a91819167%3A0xbbc17147d13fb1ae!2z6KW_55Kw5Y2R6Lev5LmN6KGXMzjomZ_lpKnmiJDlt6Xmpa3lpKflu4g!5e0!3m2!1szh-TW!2shk!4v1695279507828!5m2!1szh-TW!2shk"
                width="450"
                height="450"
                style={{ border: 0 }}
                allowfullscreen=""
                loading="lazy"
                referrerpolicy="no-referrer-when-downgrade"
              />
            </div>

            <Flex vertical>
              <Descriptions size="small" title="Biotrition Ltd." layout="vertical" column={1} items={items} />
              <Title level={5}>Follow our social medias:</Title>
              <Flex gap={50} justify='flex-start'>
              <Button type="link" size="large" icon={<FacebookOutlined style={{ fontSize: '40px'}}/>} />
              <Button type="link" size="large" icon={<InstagramOutlined style={{ fontSize: '40px'}}/>} />
              <Button type="link" size="large" icon={<TwitterOutlined style={{ fontSize: '40px'}}/>} />
              <Button type="link" size="large" icon={<YoutubeOutlined style={{ fontSize: '40px'}}/>} />
              </Flex>
            </Flex>
          </Flex>

        </Space>
      </Flex>
    </ConfigProvider>
  )

}
export default about;