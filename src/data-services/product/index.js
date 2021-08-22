
// Data Flow: Step 2

import { apiListProductByCategorySlug } from "data-source/product";
import { apiDetailProductBySlug } from "data-source/product";
import { apiListHotProduct } from "data-source/product";
import { apiDetailProductById } from "data-source/product";
import { apiListProductByCategoryId } from "data-source/product";
import { apiListProduct } from "data-source/product";

// transform data to fit with UI;
export const productService = {
    detailProductById: function (id, params) {
        return apiDetailProductById(id, params).then(response => {
            response.data = filterFieldProduct(response.data);
            return response;
        });
    },

    detailProductBySlug: function (slug, params) {
        return apiDetailProductBySlug(slug, params).then(response => {
            response.data = filterFieldProduct(response.data);
            return response;
        });
    },

    listProduct: function (params) {
        return apiListProduct(params).then(response => {
            response.data = response.data.map(product => {
                return filterFieldProduct(product);
            })
            return response;
        });
    },

    listProductByCategoryId: function (id, params) {
        return apiListProductByCategoryId(id, params).then(response => {
            response.data = response.data.map(product => {
                return filterFieldProduct(product);
            })
            return response;
        });
    },

    listProductByCategorySlug: function (slug, params) {
        return apiListProductByCategorySlug(slug, params).then(response => {
            response.data = response.data.map(product => {
                return filterFieldProduct(product);
            })
            return response;
        });
    },

    listHotProduct: function (params) {
        return apiListHotProduct(params).then(response => {
            response.data = response.data.map(product => {
                return filterFieldProduct(product);
            })
            return response;
        });
    },
}

export const filterFieldProduct = (product) => {
    return {
        id: product.id || 0,
        name: product.name || '',
        description: product.description || '',
        detail: '<p>Hey this editor rocks 😀</p>',
        price: numberWithCommas(product.price) || 0,
        discount: product.discount || 0,
        new_price: numberWithCommas(product.new_price) || 0,
        category_id: product.category_id || 0,
        slug: "/san-pham/" + product.slug || '',
        image: filterFieldImage(product.list_product_images, product.name) || '',
    }
}

export const filterFieldImage = (listImage, alt) => {
    // [ imgSrc1 , imgSrc2, ... ]
    // => 
    // [ { src: imgSrc1, alt: imgAlt1} , { src: imgSrc2, alt: imgAlt2}, ... ]
    return listImage.map((image, index) => {
        return {
            id: index,
            isSelected: index == 0,
            src: image,
            alt: alt + "_" + String(Math.floor(Math.random() * 1000)),
        }
    })
}

export function numberWithCommas(x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}
