import React, { useEffect, useState } from "react";

// components
import CardEditMainCategory from "components/Cards/CardEditMainCategory";
import { REQUEST_STATE } from "app-configs";
import { notification } from "antd";
import FullPageLoading from "components/Loading/FullPageLoading";
import { categoryService } from "data-services/category";

export default function EditMainCategory(props) {
    const mainCategoryId = props.match.params.id;
    const [mainCategory, setMainCategory] = useState({});
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        const getDetailMainCategory = async () => {
            const detailSubCategory = await categoryService.detailMainCategoryAsync(mainCategoryId);
            setMainCategory(detailSubCategory)
        }
        getDetailMainCategory();
    }, [])

    const submitEditMainCategory = async (values) => {
        setIsLoading(true);
        const response = await categoryService.updateMainCategory(mainCategoryId, values);
        if (response.state === REQUEST_STATE.SUCCESS) {
            notification['success']({
                message: 'Edit main category',
                description:
                    'Update main category successfully',
            });
        }

        if (response.state === REQUEST_STATE.ERROR) {
            notification['error']({
                message: 'Edit main category',
                description:
                    'An error occur when remove main category',
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
                        <h6 className="text-blueGray-700 text-xl font-bold">Edit category</h6>
                    </div>
                </div>
                {/* ff */}
                <CardEditMainCategory
                    detailMainCategory={mainCategory}
                    submitEditMainCategory={submitEditMainCategory}
                />
            </div>
        </>
    );
}
