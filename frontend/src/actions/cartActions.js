import { addCartItemRequest, addCartItemSuccess } from "../slices/cartSlice";
import axios from "axios";

export const addCartItem = (id, quantity, selSize) => async (dispatch) => {
  try {
    dispatch(addCartItemRequest());
    const { data } = await axios.get(`/api/v1/product/${id}`);
    dispatch(
      addCartItemSuccess({
        product: data.product._id,
        productUId: data.product.productUId,
        name: data.product.name,
        price: data.product.price,
        actualPrice: data.product.strategicPrice,
        baseSellerPrice: data.product.basePrice,
        image: data.product.images[0].image,
        stock: data.product.stock,
        quantity,
        selSizes: selSize,
        sellerId: data.product.user || "",
      })
    );
  } catch (error) {}
};
