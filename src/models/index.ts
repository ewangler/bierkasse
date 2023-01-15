export type Purchase = {
  articles: Article[]
  total: number
  customer: any
  customerId: number | undefined
  discount: number | undefined
}

export type CartTotal = {
  totalPrice: number
  articleQuantity: number
}

export interface Article {
  properties: {
    title: string
    description: string
    price: number
  }
}

export interface CartArticle extends Article {
  quantity: number
}

export type ArticleGroup = {
  properties: {
    title: string
  }
  children: {
    article: number[]
  }
}

export type Member = {
  properties: {
    ID: string
    Vorname: string
    Name: string
    Bierkredit: string | undefined
    Strasse: string | undefined
    PLZ: string | undefined
    Ort: string | undefined
  }
  customerId: number
}