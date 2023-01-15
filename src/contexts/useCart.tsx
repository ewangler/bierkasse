import useCartArticles from './useCartArticle';
import useCartTotal from './useCartTotal';

const useCart = () => {
  const {
    articles,
    addArticle,
    removeArticle,
    increaseArticleQuantity,
    decreaseArticleQuantity,
  } = useCartArticles();
  const { total, updateCartTotal } = useCartTotal();

  return {
    articles,
    addArticle,
    removeArticle,
    increaseArticleQuantity,
    decreaseArticleQuantity,
    total,
    updateCartTotal,
  };
};

export default useCart;