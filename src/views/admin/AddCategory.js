import React, { useState } from "react";
// components
import { categoryService } from "data-services/category";
import CardAddSubCategory from "components/Cards/CardAddSubCategory";
import CardAddMainCategory from "components/Cards/CardAddMainCategory";
import { REQUEST_STATE } from "app-configs";
import { notification } from "antd";
import FullPageLoading from "components/Loading/FullPageLoading";

export default function AddCategory(props) {
    const [isLoading, setIsLoading] = useState(false);

    const addMainCategory = async (values) => {
        setIsLoading(true);
        const response = await categoryService.createMainCategory(values);
        if (response.state === REQUEST_STATE.SUCCESS) {
            notification['success']({
                message: 'Add main category',
                description:
                    'Add main category successfully',
            });
        }

        if (response.state === REQUEST_STATE.ERROR) {
            notification['error']({
                message: 'Add main category',
                description:
                    'An error occur when add main category',
            });
        }
        setIsLoading(false);
    }

    const addSubCategory = async (values) => {
        setIsLoading(true);
        const response = await categoryService.createSubCategory(values);
        if (response.state === REQUEST_STATE.SUCCESS) {
            notification['success']({
                message: 'Add sub category',
                description:
                    'Update sub category successfully',
            });
        }

        if (response.state === REQUEST_STATE.ERROR) {
            notification['error']({
                message: 'Add sub category',
                description:
                    'Please select main category',
            });
        }
        setIsLoading(false);
    }

    return (
        <>
            {isLoading && <FullPageLoading />}
            <div className="relative flex flex-col min-w-0 break-words w-full mb-6 bg-white">
                <div className="rounded-t bg-white mb-0 px-6 py-6">
                    <div className="text-center flex justify-between">
                        <h6 className="text-blueGray-700 text-xl font-bold">Add category</h6>
                    </div>
                </div>
                {/* ff */}
                <div className="mb-6">
                    <CardAddMainCategory addMainCategory={addMainCategory} />
                </div>
                <CardAddSubCategory addSubCategory={addSubCategory} />
            </div>
        </>
    );
}
