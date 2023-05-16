interface IProduct {
    code: number | string;
    name?: string;
    cost_price?: number | undefined;
    sales_price: number
  }

  export default IProduct