import React, { useEffect, useState, useRef } from 'react';
import { useLocation, useNavigate } from 'react-router-dom'
import fetchProducts from './fetchProducts';
import ProductModal from './productModal';

// Swiper
import { Navigation } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/effect-fade';

import { Typography, Card, Button } from 'antd';
const { Paragraph, Title, Text } = Typography;
const { Meta } = Card;

function Products() {
  const navigation = useNavigate()
  const [products, setProducts] = useState([]);
  const swiperRefs = useRef([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      const productList = await fetchProducts();
      setProducts(productList);
    };
    fetchData();
  }, []);

  const renderSlides = () => {
    const brands = {};

    products.forEach((product) => {
      if (!brands[product.brand]) {
        brands[product.brand] = [];
      }
      brands[product.brand].push(product);
    });

    return Object.entries(brands).map(([brand, products], index) => (
      <div key={index}>
        <Title level={3}>{brand}</Title>
        <Button
          type="link"
          onClick={() => {
            navigation(`/products/${brand}`);
          }}
        >
          View All
        </Button>
      
        <Swiper
          navigation
          grabCursor
          modules={[Navigation]}
          slidesPerView={5}
          slidesPerGroup={5}
          onSwiper={(swiper) => {
            swiperRefs.current[index] = swiper;
          }}
        >
          {products.map((product, index) => (
            <SwiperSlide key={index}>
              <div
                style={{
                  display: 'flex',
                  justifyContent: 'center',
                  marginTop: '20px',
                  marginBottom: '20px',
                }}
              >
                <Card
                  hoverable
                  style={{
                    width: 250,
                  }}
                  cover={<img alt={`${product.brand}-${product.name}`} src={product.imageURL} />}
                  onClick={() => {
                    setSelectedProduct(product);
                    setIsModalOpen(true);
                  }}
                >
                  <Meta title={product.name} description={product.brand} />
                  <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
                    <Text>From ${product.price}</Text>
                  </div>
                </Card>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    ));
  };

  return (
    <div>
      <Title level={2}>Products</Title>
      {renderSlides()}
      <ProductModal
        isModalOpen={isModalOpen}
        setIsModalOpen={setIsModalOpen}
        product={selectedProduct}
      />
    </div>
  );
}

export default Products;