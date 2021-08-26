import React from "react";
// components
import {
    EditTwoTone,
    DeleteTwoTone
} from '@ant-design/icons';
import { Popconfirm } from 'antd';

export default function CardListCategory(props) {
    const { category, handleDeleteCategory, handleSubCategory } = props;

    function confirm() {
        handleDeleteCategory(category.id)
    }
    return (
        <>
            <div
                className="w-full lg:w-6/12 mb-6 px-4 "
            >
                <div className="shadow-lg rounded bg-white">
                    <div className="rounded-t mb-0 px-4 py-3 border-0">
                        <div className="flex flex-wrap justify-between items-center">
                            <div className="relative px-4 max-w-full flex-grow flex-1">
                                <h3
                                    className="font-semibold text-lg text-blueGray-700 mb-0"
                                >
                                    {category.name}
                                </h3>
                            </div>
                            <div className="mb-2 flex text-lg">
                                <a href={`/admin/edit-main-category/${category.id}`} className="block mr-2 hover:cursor-pointer">
                                    <EditTwoTone />
                                </a>
                                <Popconfirm
                                    title="Điều này sẽ xóa toàn bộ sản phẩm thuộc danh mục này. Bạn chắc chứ?"
                                    onConfirm={confirm}
                                    okText="Đồng ý"
                                    cancelText="Không"
                                >
                                    <div
                                        className="mr-2 hover:cursor-pointer"
                                        // onClick={() => handleDeleteCategory(category.id)}
                                    >
                                        <DeleteTwoTone />
                                    </div>
                                </Popconfirm>,

                            </div>
                        </div>
                    </div>
                </div>

            </div>
        </>
    );
}
