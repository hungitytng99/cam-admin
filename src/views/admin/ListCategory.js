import React, { useEffect, useState } from "react";

// components
import CardMainSubCategory from "components/Cards/CardMainSubCategory";
import { notification } from 'antd';
import { REQUEST_STATE } from "app-configs";
import FullPageLoading from "components/Loading/FullPageLoading";
import { categoryService } from "data-services/category";

export default function ListCategory() {
    const [mainSubCategory, setMainSubCategory] = useState([])
    const [isLoading, setIsLoading] = useState(false);
    useEffect(() => {
        const getMainSubCategory = async () => {
            const mainSubCategory = await categoryService.listCategoryWithSubCategory();
            setMainSubCategory(mainSubCategory.data);
        }
        getMainSubCategory();
    }, [])

    const handleDeleteMainCategory = async (id) => {
        setIsLoading(true);
        const response = await categoryService.deleteMainCategory(id);
        if (response.state === REQUEST_STATE.SUCCESS) {
            const mainSubCategoryTmp = mainSubCategory.filter((item) => {
                if (Number(item.id) !== Number(id)) {
                    return item;
                }
            })
            notification['success']({
                message: 'Remove main category',
                description:
                    "Remove main category successfully",
            });
            setMainSubCategory(mainSubCategoryTmp);
        }

        if (response.state === REQUEST_STATE.ERROR) {
            notification['error']({
                message: 'Remove main category',
                description:
                    'An error occur when remove main category',
            });
        }
        setIsLoading(false);

    }
    const handleDeleteSubCategory = async (mainId, subId) => {
        setIsLoading(true);
        const response = await categoryService.deleteSubCategory(subId);
        if (response.state === REQUEST_STATE.SUCCESS) {
            let subMainTemp = [...mainSubCategory];
            subMainTemp = subMainTemp.map((subMainItem) => {
                if (subMainItem.id === mainId) {
                    subMainItem.sub_category = subMainItem.sub_category.filter((sub) => {
                        if (sub.id !== subId) {
                            return sub;
                        }
                    })
                }
                return subMainItem;
            })
            notification['success']({
                message: 'Remove sub-category',
                description:
                    'Remove sub-category successfully',
            });

            setMainSubCategory(subMainTemp);
        }

        if (response.state === REQUEST_STATE.ERROR) {
            notification['error']({
                message: 'Remove sub-category',
                description:
                    'An error occur when remove sub category',
            });
        }

        setIsLoading(false);
    }

    return (
        <>
            {isLoading && <FullPageLoading />}
            <div className="flex flex-wrap">
                <div className="relative w-full rounded-t px-4 mb-2 border-0 ">
                    <div className="px-8 py-3 rounded-t flex flex-wrap justify-between items-center bg-white">
                        <div className="relative w-full max-w-full flex-grow flex-1">
                            <h3 className="mb-0 font-semibold text-lg text-blueGray-700">
                                List category
                            </h3>
                        </div>
                        <button
                            onClick={() => window.location.href = '/admin/add-category'}
                            className="bg-lightBlue-500 text-white active:bg-lightBlue-600 font-bold uppercase text-xs px-4 py-2 rounded shadow hover:shadow-md outline-none focus:outline-none mr-1 ease-linear transition-all duration-150"
                            type="button"
                        >
                            Add category
                        </button>
                    </div>
                </div>
                <div className="w-full lg:w-12/12">
                    <div
                        className="relative flex flex-wrap"
                    >
                        {mainSubCategory.map((subMain) => {
                            return (
                                <CardMainSubCategory
                                    handleDeleteMainCategory={handleDeleteMainCategory}
                                    handleDeleteSubCategory={handleDeleteSubCategory}
                                    key={subMain.id}
                                    subMain={subMain}
                                />
                            )
                        })}

                    </div>
                </div>
            </div>
        </>
    );
}