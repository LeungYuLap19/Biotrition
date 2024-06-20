import React, { useEffect, useState, useRef } from 'react';
import { useParams } from 'react-router-dom';
import fetchProducts from './fetchProducts';
import ProductModal from './productModal';

import { Typography, Card, Flex } from 'antd';
const { Title, Text } = Typography;
const { Meta } = Card;

function BrandProducts() {
    const { brand } = useParams();
    const [products, setProducts] = useState([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedProduct, setSelectedProduct] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            const productList = await fetchProducts();
            setProducts(productList);
        };
        fetchData();
    }, []);

    const renderProducts = () => {
        return products
            .filter((product) => product.brand === brand)
            .map((product, index) => (
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

            ));
    };

    return (
        <>
            <Title level={2}>{brand}</Title>
            <Flex wrap="wrap" gap="large">
                {renderProducts()}
            </Flex>
            <ProductModal
                isModalOpen={isModalOpen}
                setIsModalOpen={setIsModalOpen}
                product={selectedProduct}
            />
        </>
    );
}

export default BrandProducts;