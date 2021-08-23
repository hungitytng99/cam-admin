// Data Flow: Step 2

import { productService } from "data-services/product";
import { apiDeleteCategory } from "data-source/category";
import { apiCreateCategory } from "data-source/category";
import { apiDetailCategoryBySlug } from "data-source/category";
import { apiListCategory } from "data-source/category";
import { apiDetailCategoryById } from "data-source/category";

// transform data to fit with UI;
export const categoryService = {
    listCategory: function (params) {
        return apiListCategory(params).then(response => {
            response.data = response.data.map(category => {
                return filterFieldCategory(category);
            })
            return response;
        });
    },

    detailCategoryById: function (id) {
        return apiDetailCategoryById(id).then(response => {
            response.data = filterFieldCategory(response.data);
            return response;
        });
    },

    detailCategoryBySlug: function (slug) {
        return apiDetailCategoryBySlug(slug).then(response => {
            response.data = filterFieldCategory(response.data);
            return response;
        });
    },

    listCategoryWithProduct: async function (paramsCategory, paramsProduct) {
        let listCategoryWithProduct = await this.listCategory(paramsCategory);
        let count = 0;
        for (let i = 0; i < listCategoryWithProduct.data.length; i++) {
            if (count == 4) break; // limit 4 category at home page
            const listProduct = await productService.listProductByCategoryId(listCategoryWithProduct.data[i].id, paramsProduct);
            if (listProduct.data.length > 0) {
                count++;
                listCategoryWithProduct.data[i] = { ...listCategoryWithProduct.data[i], listProduct: listProduct.data };
            }
        }
        return listCategoryWithProduct;
    },

    deleteCategory:  function (id) {
        return apiDeleteCategory(id).then(response => {
            return response;
        });
    },

    createCategory:  function (params) {
        return apiCreateCategory(params).then(response => {
            return response;
        });
    },

}

export const filterFieldCategory = (category) => {
    return {
        id: category.id,
        name: category.name,
        description: category.description,
        slug: "/danh-muc/" + category.slug
    }
}
