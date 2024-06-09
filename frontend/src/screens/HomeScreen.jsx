import { Row, Col } from 'react-bootstrap';
import { useParams } from 'react-router-dom';
import { useGetProductsQuery } from '../slices/productsApiSlice';
import { Link } from 'react-router-dom';
import Loader from '../components/Loader';
import Message from '../components/Message';
import Paginate from '../components/Paginate';
import ProductCarousel from '../components/ProductCarousel';
import Meta from '../components/Meta';
import Product from '../components/Product';
import SubCategory from '../components/SubCategory';

const HomeScreen = () => {
  const { pageNumber, keyword } = useParams();

  const { data, isLoading, error } = useGetProductsQuery({
    keyword,
    pageNumber,
  });


  // {
  //   name: 'Airpods Wireless Bluetooth Headphones',
  //   image: '/images/airpods.jpg',
  //   description:
  //     'Bluetooth technology lets you connect it with compatible devices wirelessly High-quality AAC audio offers immersive listening experience Built-in microphone allows you to take calls while working',
  //   brand: 'Apple',
  //   category: 'Cloth',
  //   subCategory: 'kid-cloths',
  //   price: 89.99,
  //   countInStock: 10,
  //   rating: 4.5,
  //   numReviews: 12,
  // },

  const subCategory = [
    {
      _id: 'men-cloth',
      name: 'men-clothing',
      image: '/images/airpods.jpg',
      // image: '/images/mens-cloth.jpg'
    },
    {
      _id: 'kid-cloth',
      name: 'kid-clothing',
      image: '/images/airpods.jpg',
      // image: '/images/mens-cloth.jpg'
    },
    {
      _id: 'women-cloth',
      name: 'women-clothing',
      image: '/images/airpods.jpg',
      // image: '/images/mens-cloth.jpg'
    },
  ]

  return (
    <>
      
      {isLoading ? (
        <Loader />
      ) : error ? (
        <Message variant='danger'>
          {error?.data?.message || error.error}
        </Message>
      ) : (
        <>
          <Meta />
          <h1>Shop By Sub-Categories</h1>
          <Row>
            {subCategory.map((product) => (
              <Col key={product._id} sm={12} md={6} lg={4} xl={3}>
                <SubCategory product={product} />
              </Col>
            ))}
          </Row>
          
          <h1>Latest Products</h1>
          <Row>
            {data.products.map((product) => (
              <Col key={product._id} sm={12} md={6} lg={4} xl={3}>
                <Product product={product} />
              </Col>
            ))}
          </Row>
          <Paginate
            pages={data.pages}
            page={data.page}
            keyword={keyword ? keyword : ''}
          />
          
          
        </>
      )}
    </>
  );
};

export default HomeScreen;
