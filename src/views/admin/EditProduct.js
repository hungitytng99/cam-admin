import React, { useEffect, useState } from "react";
import { notification } from 'antd';
import CardEditProduct from "components/Cards/CardEditProduct";
import { productService } from "data-services/product";
import { REQUEST_STATE } from "app-configs";

export default function EditProduct(props) {
  const productId = props.match.params.id;
  const [detailProductState, setDetailProductState] = useState({});

  useEffect(() => {
    const getDetailProduct = async () => {
      const detailProduct = await productService.detailProductByIdAsync(productId);
      setDetailProductState(detailProduct);
    }
    getDetailProduct();
  }, [])

  const submitEditMainCategory = async (params) => {
    const response = await productService.updateProduct(productId, params)
    if(response.state === REQUEST_STATE.SUCCESS) {
      notification['success']({
          message: 'Update product',
          description:
              response.data.message,
      });
  }

  if(response.state === REQUEST_STATE.ERROR) {
      notification['error']({
          message: 'Update product',
          description:
              'An error occur when update product',
      });
  }
  }

  return (
    <>
      <div className="flex flex-wrap">
        <div className="w-full lg:w-12/12 px-4">
          <CardEditProduct
            detailProduct={detailProductState}
            productId={productId} 
            submitEditMainCategory={submitEditMainCategory}
            />
        </div>
      </div>
    </>
  );
}