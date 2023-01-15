import { createContext, useContext, FC, useState } from 'react';
import { CartArticle, CartTotal, Member } from '../models';

export interface ICartContext {
  articles: CartArticle[];
  setArticles(articles: CartArticle[]): void;
  total: CartTotal;
  setTotal(total: CartTotal): void;
  customer: Member | undefined;
  setCustomer(customer: Member | undefined): void;
  discount: number;
  setDiscount(discount: number): void;
}

const CartContext = createContext<ICartContext | undefined>(undefined);
const useCartContext = (): ICartContext => {
  const context = useContext(CartContext);

  if (!context) {
    throw new Error('useCartContext must be used within a CartProvider');
  }

  return context;
};

const totalInitialValues = {
  articleQuantity: 0,
  totalPrice: 0,
};

const CartProvider: FC = (props: any) => {
  const [articles, setArticles] = useState<CartArticle[]>([]);
  const [discount, setDiscount] = useState<number>(0);
  const [customer, setCustomer] = useState<Member>();
  const [total, setTotal] = useState<CartTotal>(totalInitialValues);

  const CartContextValue: ICartContext = {
    articles,
    setArticles,
    total,
    setTotal,
    customer,
    setCustomer,
    discount,
    setDiscount,
  };

  return <CartContext.Provider value={CartContextValue}>
    {props.children}
    </CartContext.Provider>
};

export { CartProvider, useCartContext };