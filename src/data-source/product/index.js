import { GET, PUT, POST, DELETE } from "data-source/fetch.js";
import { REQUEST_STATE } from "app-configs/index.js";
// Data Flow: Step 1

export const apiListProduct = async (params) => {
    try {
        const response = await GET("/product/", params, { isFullPath: false });
        return {
            state: REQUEST_STATE.SUCCESS,
            data: response.data
        };

    } catch (error) {
        console.log("error", error);
        return {
            state: REQUEST_STATE.ERROR,
            data: []
        };
    }
};

//   PARAMS
//   {
//   "name": "string",
//   "description": "string",
//   "detail": "string",
//   "price": 0,
//   "discount": 0,
//   "list_product_images": [
//     "string"
//   ],
//   "category_id": 0
// }

export const apiCreateProduct = async (id, params) => {
    try {
        const response = await POST("/category/" + id, params);
        return {
            state: REQUEST_STATE.SUCCESS,
            data: response.data
        };

    } catch (error) {
        console.log("error", error);
        return {
            state: REQUEST_STATE.ERROR,
            data: []
        };
    }
};

export const apiListProductByCategoryId = async (id, params) => {
    try {
        const response = await GET("/product/get-by-category-id/" + id, params);
        return {
            state: REQUEST_STATE.SUCCESS,
            data: response.data
        };

    } catch (error) {
        console.log("error", error);
        return {
            state: REQUEST_STATE.ERROR,
            data: []
        };
    }
};

export const apiListProductByCategorySlug = async (slug, params) => {
    try {
        const response = await GET("/product/get-by-category-slug/" + slug, params);
        return {
            state: REQUEST_STATE.SUCCESS,
            data: response.data
        };

    } catch (error) {
        console.log("error", error);
        return {
            state: REQUEST_STATE.ERROR,
            data: []
        };
    }
};

export const apiDetailProductBySlug = async (slug, params) => {
    try {
        const response = await GET("/product/get-by-slug/" + slug, params);
        return {
            state: REQUEST_STATE.SUCCESS,
            data: response.data
        };

    } catch (error) {
        console.log("error", error);
        return {
            state: REQUEST_STATE.ERROR,
            data: []
        };
    }
};

export const apiDetailProductById = async (id, params) => {
    try {
        const response = await GET("/product/" + id, params);
        return {
            state: REQUEST_STATE.SUCCESS,
            data: response.data
        };

    } catch (error) {
        console.log("error", error);
        return {
            state: REQUEST_STATE.ERROR,
            data: []
        };
    }
};


export const apiUpdateProduct = async (id, params) => {
    try {
        const response = await PUT("/product/" + id, params);
        return {
            state: REQUEST_STATE.SUCCESS,
            data: response.data
        };

    } catch (error) {
        console.log("error", error);
        return {
            state: REQUEST_STATE.ERROR,
            data: []
        };
    }
};

export const apiDeleteProduct = async (id) => {
    try {
        const response = await DELETE("/product/" + id);
        return {
            state: REQUEST_STATE.SUCCESS,
            data: response.data
        };

    } catch (error) {
        console.log("error", error);
        return {
            state: REQUEST_STATE.ERROR,
            data: []
        };
    }
};

export const apiListHotProduct = async (params) => {
    try {
        const response = await GET("/hot-product/", params, { isFullPath: false });
        return {
            state: REQUEST_STATE.SUCCESS,
            data: response.data
        };

    } catch (error) {
        console.log("error", error);
        return {
            state: REQUEST_STATE.ERROR,
            data: []
        };
    }
};

export const apiSetHotProduct = async (id, params) => {
    try {
        const response = await GET("/hot-product/set/" + id, params, { isFullPath: false });
        return {
            state: REQUEST_STATE.SUCCESS,
            data: response.data
        };

    } catch (error) {
        console.log("error", error);
        return {
            state: REQUEST_STATE.ERROR,
            data: []
        };
    }
};

export const apiUnSetHotProduct = async (params) => {
    try {
        const response = await GET("/hot-product/unset/", params, { isFullPath: false });
        return {
            state: REQUEST_STATE.SUCCESS,
            data: response.data
        };

    } catch (error) {
        console.log("error", error);
        return {
            state: REQUEST_STATE.ERROR,
            data: []
        };
    }
};


