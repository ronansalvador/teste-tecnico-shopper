interface IUpdateProduct {
  code?: number | string;
  name?: string;
  current_price?: number;
  new_price?: number
  status?: string;
}

export default IUpdateProduct