import { CartArticle } from '../models';
import { useCartContext } from './CartContextProvider';
import useCartTotal from './useCartTotal';

const useCartArticles = () => {
  const { articles, setArticles } = useCartContext();
  const { updateCartTotal } = useCartTotal();

  const updateQuantitySafely = (
    currentArticle: CartArticle,
    targetArticle: CartArticle,
    quantity: number
  ): CartArticle => {
    if (currentArticle.properties.description === targetArticle.properties.description) {
      return Object.assign({
        ...currentArticle,
        quantity: currentArticle.quantity + quantity,
      });
    } else {
      return currentArticle;
    }
  };

  const addArticle = (newArticle: CartArticle) => {
    let updatedArticles;
    const isArticleAlreadyInCart = articles.some(
      (article: CartArticle) => newArticle.properties.description === article.properties.description
    );

    if (isArticleAlreadyInCart) {
      updatedArticles = articles.map((article: CartArticle) => {
        return updateQuantitySafely(article, newArticle, newArticle.quantity);
      });
    } else {
      updatedArticles = [...articles, newArticle];
    }

    setArticles(updatedArticles);
    updateCartTotal(updatedArticles);
  };

  const removeArticle = (articleToRemove: CartArticle) => {
    const updatedArticles = articles.filter(
      (article: CartArticle) => article.properties.description !== articleToRemove.properties.description
    );

    setArticles(updatedArticles);
    updateCartTotal(updatedArticles);
  };

  const increaseArticleQuantity = (articleToIncrease: CartArticle) => {
    const updatedArticles = articles.map((article: CartArticle) => {
      return updateQuantitySafely(article, articleToIncrease, +1);
    });

    setArticles(updatedArticles);
    updateCartTotal(updatedArticles);
  };

  const decreaseArticleQuantity = (articleToDecrease: CartArticle) => {
    const updatedArticles = articles.map((article: CartArticle) => {
      return updateQuantitySafely(article, articleToDecrease, -1);
    });

    setArticles(updatedArticles);
    updateCartTotal(updatedArticles);
  };

  return {
    articles,
    addArticle,
    removeArticle,
    increaseArticleQuantity,
    decreaseArticleQuantity,
  };
};

export default useCartArticles;