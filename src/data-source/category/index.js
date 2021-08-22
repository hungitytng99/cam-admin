import { GET, PUT, POST, DELETE } from "data-source/fetch.js";
import { REQUEST_STATE } from "app-configs/index.js";
// Data Flow: Step 1

export const apiListCategory = async (params) => {
    try {
        const response = await GET("/category/", params, { isFullPath: false });
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

export const apiDetailCategoryById = async (categoryId) => {
    try {
        const response = await GET("/category/" + categoryId);
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

export const apiDetailCategoryBySlug = async (slug) => {
    try {
        const response = await GET("/category/get-by-slug/" + slug);
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
//     "name": "string",
//     "main_category_id": 0
//   }

export const apiCreateCategory = async (categoryId, params) => {
    try {
        const response = await POST("/category/" + categoryId, params);
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
//     "name": "string",
//     "main_category_id": 0
//   }

export const apiUpdateCategory = async (categoryId , params) => {
    try {
        const response = await PUT("/category/" + categoryId, params);
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

export const apiDeleteCategory = async (categoryId) => {
    try {
        const response = await DELETE("/category/" + categoryId);
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

