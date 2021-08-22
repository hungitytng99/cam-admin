import React from "react";
// components
import ProductDropdown from "components/Dropdowns/ProductDropdown";

export default function CardListProducts(props) {
  const { listProducts = [], handleDeleteProduct, handleSetHotProduct } = props;
  return (
    <>
      <div
        className="relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded bg-white"
      >
        <div className="block w-full overflow-x-auto">
          {/* Projects table */}
          <table className="items-center w-full bg-transparent border-collapse">
            <thead>
              <tr>
                <th
                  className="px-3 align-middle border border-solid py-3 text-sm uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left bg-blueGray-50 text-blueGray-500 border-blueGray-100"
                >
                  ID
                </th>

                <th
                  className="px-3 align-middle border border-solid py-3 text-sm uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left bg-blueGray-50 text-blueGray-500 border-blueGray-100"
                >
                  Tên
                </th>
                <th
                  className="px-3 align-middle border border-solid py-3 text-sm uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left bg-blueGray-50 text-blueGray-500 border-blueGray-100"

                >
                  Giá (VND)
                </th>
                <th
                  className={
                    "px-3 align-middle border border-solid py-3 text-sm uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left bg-blueGray-50 text-blueGray-500 border-blueGray-100"
                  }
                >
                  Giảm giá (%)
                </th>
                <th
                  className={
                    "px-3 align-middle border border-solid py-3 text-sm uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left bg-blueGray-50 text-blueGray-500 border-blueGray-100"
                  }
                >
                  Giá mới
                </th>
                <th
                  className="px-3 align-middle border border-solid py-3 text-sm uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left bg-blueGray-50 text-blueGray-500 border-blueGray-100"
                >
                  Ảnh
                </th>
               
                <th
                  className="px-3 align-middle border border-solid py-3 text-sm uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left bg-blueGray-50 text-blueGray-500 border-blueGray-100"
                >
                  Danh mục
                </th>
                <th
                  className="px-3 align-middle border border-solid py-3 text-sm uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left bg-blueGray-50 text-blueGray-500 border-blueGray-100"
                >
                </th>
              </tr>
            </thead>
            <tbody>
              {
                listProducts.length === 0 && <tr>
                  <td colSpan="9" className="text-center py-4">
                    Không tìm thấy sản phẩm nào
                  </td>
                </tr>
              }

              {
                listProducts.map((product) => {
                  return (
                    <tr key={product.id}>
                      <td className="border-t-0 px-3 py-3 align-middle border-l-0 border-r-0 text-sm">
                        {product.id}
                      </td>
                      <td className="border-t-0 px-3 py-3 align-middle border-l-0 border-r-0 text-sm">
                        {product.name}
                      </td>
                      <td className="border-t-0 px-3 py-3 align-middle border-l-0 border-r-0 text-sm">
                        {product.price}
                      </td>
                      <td className="border-t-0 px-3 py-3 align-middle border-l-0 border-r-0 text-sm">
                        {product.discount}
                      </td>
                      <td className="border-t-0 px-3 py-3 align-middle border-l-0 border-r-0 text-sm">
                        {product.new_price}
                      </td>
                      <td className="border-t-0 px-3 py-3 align-middle border-l-0 border-r-0 text-sm">
                        <div className="flex flex-wrap">
                          {
                            product.image.map((img) => {
                              return (
                                <img key={img.id}
                                  src={img.src}
                                  alt={img.alt}
                                  className="w-10 h-10 rounded-full border-2 border-blueGray-50 shadow"
                                ></img>
                              )
                            })
                          }
                        </div>
                      </td>
                      <td className="border-t-0 px-3 py-3 align-middle border-l-0 border-r-0 text-sm whitespace-nowrap p-4">
                        {product.category_name}
                      </td>
                      <td className="border-t-0 px-3 py-3 align-middle border-l-0 border-r-0 text-sm whitespace-nowrap p-4 text-right">
                        <ProductDropdown
                          productId={product.id}
                          handleDeleteProduct={handleDeleteProduct}
                          handleSetHotProduct={handleSetHotProduct}
                        />
                      </td>
                    </tr>
                  )
                })
              }
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}