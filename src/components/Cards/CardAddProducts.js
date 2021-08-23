import React, { useEffect, useState } from "react";
import Select from 'react-select';
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';
import FullPageLoading from "components/Loading/FullPageLoading";
import { categoryService } from "data-services/category";
import { EditorState, convertToRaw } from 'draft-js';
import { Editor } from "react-draft-wysiwyg";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import { EDITOR_OPTION } from "app-configs";
import draftToHtml from 'draftjs-to-html';
import { productService } from "data-services/product";
import { REQUEST_STATE } from "app-configs";
import { notification } from "antd";


// components

export default function CardAddProducts() {
    const [categoryOption, setCategoryOption] = useState({ label: '', value: '' });
    const [categorySelected, setCategorySelected] = useState({ label: '', value: '' });
    const [isLoading, setIsLoading] = useState(false);

    const [shortDesc, setShortDesc] = useState(EditorState.createEmpty());
    const [longDesc, setLongDesc] = useState(EditorState.createEmpty());
    const onShortDescChange = (shortDesc) => {
        setShortDesc(shortDesc);
    }
    const onLongDescChange = (shortDesc) => {
        setLongDesc(shortDesc);
    }

    const handleSubChange = categoryOption => {
        setCategorySelected(categoryOption);
    };

    const productSchema = Yup.object().shape({
        name: Yup.string()
            .required('Trường này không được để trống'),
        price: Yup.string()
            .required('Trường này không được để trống'),
        discount: Yup.string()
            .required('Trường này không được để trống'),
        main_image_url: Yup.string()
            .required('Trường này không được để trống')
            .url('Trường này phải là một URL'),
        url_image1: Yup.string()
            .url('Trường này phải là một URL'),
        url_image2: Yup.string()
            .url('Trường này phải là một URL'),
        url_image3: Yup.string()
            .url('Trường này phải là một URL'),
        url_image4: Yup.string()
            .url('Trường này phải là một URL'),

    });

    useEffect(() => {
        const listCategory = async () => {
            let listCategory = await categoryService.listCategory();
            listCategory.data = listCategory.data.map((category) => {
                return {
                    label: category.name,
                    value: category.id,
                }
            });
            setCategoryOption(listCategory.data);
        }
        listCategory();
    }, [])

    return (
        <>
            {isLoading && <FullPageLoading />}
            <div className="relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded-lg bg-blueGray-100 border-0">
                <div className="rounded-t bg-white mb-0 px-6 py-6">
                    <div className="text-center flex justify-between">
                        <h6 className="mb-0 text-blueGray-700 text-xl font-bold">Thêm sản phẩm</h6>
                        <a
                            href='/admin/list-products'
                            className="flex items-center bg-gray-500 text-white active:bg-lightBlue-600 font-bold uppercase text-xs px-4 py-2 rounded shadow hover:shadow-md outline-none focus:outline-none mr-1 ease-linear transition-all duration-150 hover:text-white"
                        >
                            Trở về
                        </a>
                    </div>
                </div>
                <div className="flex-auto px-4 lg:px-10 py-10 pt-0">
                    <Formik
                        initialValues={{
                            name: '', price: '', discount: '', main_image_url: '',
                            url_image1: '', url_image2: '', url_image3: '', url_image4: '',
                        }}
                        validationSchema={productSchema}
                        onSubmit={async (values) => {
                            // same shape as initial values
                            let listImage = [values.main_image_url, values.url_image1, values.url_image2, values.url_image3, values.url_image4];
                            listImage = listImage.filter(image => {
                                if (image !== "") {
                                    return image;
                                }
                            })
                            const params = {
                                category_id: categorySelected.value,
                                name: values.name,
                                description: draftToHtml(convertToRaw(shortDesc.getCurrentContent())),
                                detail: draftToHtml(convertToRaw(longDesc.getCurrentContent())),
                                price: values.price,
                                discount: values.discount,
                                list_product_images: listImage
                            };
                            setIsLoading(true);
                            const response = await productService.createProduct(params);
                            if (response.state === REQUEST_STATE.SUCCESS) {
                                notification['success']({
                                    message: 'Add product',
                                    description:
                                        'Add product successfully',
                                });
                            }

                            if (response.state === REQUEST_STATE.ERROR) {
                                notification['error']({
                                    message: 'Add product',
                                    description:
                                        categorySelected.value ? response.data.message : 'You must select category',
                                });
                            }
                            setIsLoading(false);
                        }}
                    >
                        {({ errors, touched }) => (
                            <Form>
                                <h6 className="text-blueGray-400 text-sm mt-3 mb-6 font-bold uppercase">
                                    Thông tin về sản phẩm
                                </h6>
                                <div className="flex flex-wrap">
                                    <div className="w-full lg:w-6/12 px-4">
                                        <div className="relative w-full mb-3">
                                            <label
                                                className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                                            >
                                                Tên <span className="text-rose-600">*</span>
                                            </label>
                                            <Field
                                                autoComplete="off"
                                                name="name"
                                                className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                                                placeholder="Tên sản phẩm" />
                                            {errors.name && touched.name ? (
                                                <div className="text-rose-600">{errors.name}</div>
                                            ) : null}
                                        </div>
                                    </div>
                                    <div className="w-full lg:w-6/12 px-4">
                                        <div className="relative w-full mb-3">
                                            <label
                                                className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                                            >
                                                Giá <span className="text-rose-600">*</span>
                                            </label>
                                            <Field
                                                autoComplete="off"
                                                name="price"
                                                className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                                                placeholder="Giá (VND)" />
                                            {errors.price && touched.price ? (
                                                <div className="text-rose-600">{errors.price}</div>
                                            ) : null}
                                        </div>
                                    </div>
                                    <div className="w-full lg:w-6/12 px-4">
                                        <div className="relative w-full mb-3">
                                            <label
                                                className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                                            >
                                                Giảm giá <span className="text-rose-600">*</span>
                                            </label>
                                            <Field
                                                autoComplete="off"
                                                name="discount"
                                                className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                                                placeholder="Giảm giá (%)" />
                                            {errors.discount && touched.discount ? (
                                                <div className="text-rose-600">{errors.discount}</div>
                                            ) : null}
                                        </div>
                                    </div>
                                    <div className="w-full lg:w-12/12 px-4">
                                        <div className="relative w-full mb-3">
                                            <label
                                                className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                                            >
                                                Mô tả ngắn gọn
                                            </label>
                                            <Editor
                                                editorState={shortDesc}
                                                toolbarClassName="toolbarClassName"
                                                wrapperClassName="bg-white border border-gray-300"
                                                editorClassName="px-4"
                                                onEditorStateChange={onShortDescChange}
                                                toolbar={EDITOR_OPTION}
                                            />
                                        </div>
                                    </div>
                                    <div className="w-full lg:w-12/12 px-4">
                                        <div className="relative w-full mb-3">
                                            <label
                                                className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                                            >
                                                Mô tả chi tiết
                                            </label>
                                            <Editor
                                                editorState={longDesc}
                                                toolbarClassName="toolbarClassName"
                                                wrapperClassName="bg-white border border-gray-300"
                                                editorClassName="px-4"
                                                onEditorStateChange={onLongDescChange}
                                                toolbar={EDITOR_OPTION}
                                            />
                                        </div>
                                    </div>
                                </div>
                                <hr className="mt-6 border-b-1 border-blueGray-300" />
                                <h6 className="text-blueGray-400 text-sm mt-3 mb-6 font-bold uppercase">
                                    Hình ảnh sản phẩm
                                </h6>
                                <div className="flex flex-wrap">
                                    <div className="w-full lg:w-12/12 px-4">
                                        <div className="relative w-full mb-3">
                                            <label
                                                className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                                            >
                                                Ảnh chính <span className="text-rose-600">*</span>
                                            </label>
                                            <Field
                                                autoComplete="off"
                                                name="main_image_url"
                                                className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                                                placeholder="Url ảnh chính" />
                                            {errors.main_image_url && touched.main_image_url ? (
                                                <div className="text-rose-600">{errors.main_image_url}</div>
                                            ) : null}
                                        </div>
                                    </div>
                                    <div className="w-full lg:w-6/12 px-4">
                                        <div className="relative w-full mb-3">
                                            <label
                                                className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                                            >
                                                Ảnh phụ 1
                                            </label>
                                            <Field
                                                autoComplete="off"
                                                name="url_image1"
                                                className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                                                placeholder="URL" />
                                        </div>
                                        {errors.url_image1 && touched.url_image1 ? (
                                            <div className="text-rose-600">{errors.url_image1}</div>
                                        ) : null}
                                    </div>
                                    <div className="w-full lg:w-6/12 px-4">
                                        <div className="relative w-full mb-3">
                                            <label
                                                className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                                            >
                                                Ảnh phụ 2
                                            </label>
                                            <Field
                                                autoComplete="off"
                                                name="url_image2"
                                                className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                                                placeholder="URL" />
                                        </div>
                                        {errors.url_image2 && touched.url_image2 ? (
                                            <div className="text-rose-600">{errors.url_image2}</div>
                                        ) : null}
                                    </div>
                                    <div className="w-full lg:w-6/12 px-4">
                                        <div className="relative w-full mb-3">
                                            <label
                                                className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                                            >
                                                Ảnh phụ 3
                                            </label>
                                            <Field
                                                autoComplete="off"
                                                name="url_image3"
                                                className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                                                placeholder="URL" />
                                        </div>
                                        {errors.url_image3 && touched.url_image3 ? (
                                            <div className="text-rose-600">{errors.url_image3}</div>
                                        ) : null}
                                    </div>
                                    <div className="w-full lg:w-6/12 px-4">
                                        <div className="relative w-full mb-3">
                                            <label
                                                className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                                            >
                                                Ảnh phụ 4
                                            </label>
                                            <Field
                                                autoComplete="off"
                                                name="url_image4"
                                                className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                                                placeholder="URL" />
                                        </div>
                                        {errors.url_image4 && touched.url_image4 ? (
                                            <div className="text-rose-600">{errors.url_image4}</div>
                                        ) : null}
                                    </div>
                                </div>
                                <hr className="mt-6 border-b-1 border-blueGray-300" />
                                <h6 className="text-blueGray-400 text-sm mt-3 mb-6 font-bold uppercase">
                                    Danh mục
                                </h6>
                                <div className="flex flex-wrap">
                                    <div className="w-full lg:w-6/12 px-4">
                                        <div className="relative w-full mb-3">
                                            <label
                                                className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                                            >
                                                Danh mục <span className="text-rose-600">*</span>
                                            </label>
                                            <Select
                                                className="w-64"
                                                placeholder="Chọn danh mục"
                                                onChange={handleSubChange}
                                                options={categoryOption}
                                            />
                                        </div>
                                    </div>
                                </div>
                                <div className="flex justify-end">
                                    <button
                                        className="bg-lightBlue-500 text-white active:bg-lightBlue-600 font-bold uppercase text-xs px-4 py-2 rounded shadow hover:shadow-md outline-none focus:outline-none mr-1 ease-linear transition-all duration-150"
                                        type="submit"
                                    >
                                        Add product
                                    </button>
                                </div>

                            </Form>
                        )}
                    </Formik>

                </div>
            </div>

        </>
    );
}
