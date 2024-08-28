import ProductItem from './ProductItem';
import classes from './Products.module.css';

const DUMMY_PRODUCTS = [
  { id: 'p1', price: 6, title: "My First Book", description: 'This is a first product - amazing!' },
  { id: 'p2', price: 5, title: "My Second Book", description: 'This is a Second product - amazing!'}
]
const Products = (props) => {
  return (
    <section className={classes.products}>
      <h2>Buy your favorite products</h2>
      <ul>
        {DUMMY_PRODUCTS.map((product) => 
          <ProductItem
          title={product.title}
          price={product.price}
          key={product.id}
          id={product.id}
          description={product.description}
          />
        )}
      </ul>
    </section>
  );
};

export default Products;
