import React from 'react';
import { Typography, Carousel, Image } from 'antd';
import { useNavigate } from 'react-router-dom'

const { Title } = Typography;

function Home() {
  const navigation = useNavigate()

  const imageUrls = [
    '/images/home/myprotein.jpg',
    '/images/home/optimumNutrition.jpg',
    '/images/home/momentous.jpg',
    '/images/home/dymatize.jpg',
  ];

  return (
    <>
      <Title level={2}>Home</Title>
      <Carousel autoplay autoplaySpeed={4000}>
        {imageUrls.map((imageUrl, index) => (
            <Image
              src={imageUrl}
              alt={`Image ${index + 1}`}
              width = {"100%"}
              onClick={() => navigation('/products')}
            />

        ))}
      </Carousel>
    </>
  );
}


export default Home;
