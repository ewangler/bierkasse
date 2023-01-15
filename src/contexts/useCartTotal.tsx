import { CartArticle } from '../models';
import { useCartContext } from './CartContextProvider';

const useCartTotal = () => {
  const { total, setTotal } = useCartContext();

  const updateCartTotal = (articles: CartArticle[]) => {
    const articleQuantity = articles.reduce(
      (sum: number, article: CartArticle) => {
        sum += article.quantity;
        return sum;
      },
      0
    );

    const totalPrice = articles.reduce((sum: number, article: CartArticle) => {
      sum += article.properties.price * article.quantity;
      return sum;
    }, 0);

    const total = {
      articleQuantity,
      totalPrice,
    };

    setTotal(total);
  };

  return {
    total,
    updateCartTotal,
  };
};

export default useCartTotal;