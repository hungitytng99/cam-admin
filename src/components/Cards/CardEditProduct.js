import React, { useEffect, useState } from "react";
import Select from 'react-select';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { categoryService } from "data-services/category";
import { ContentState, convertFromHTML, convertToRaw, EditorState } from "draft-js";
import { Editor } from "react-draft-wysiwyg";
import { EDITOR_OPTION } from "app-configs";
import draftjsToHtml from "draftjs-to-html";
import { numberWithCommas } from "data-services/product";
// components

export default function CardEditProduct(props) {
    const { submitEditCategory, detailProduct = { data: { description: '' } } } = props;
    const [categoryOption, setCategoryOption] = useState({ label: '', value: '' });
    const [categorySelected, setCategorySelected] = useState({ label: '', value: '' });
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
        price: Yup.number('Trường này phải là một số')
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

    const formik = useFormik({
        initialValues: {
            name: '', price: '', discount: '', main_image_url: '',
            url_image1: '', url_image2: '', url_image3: '', url_image4: '',
        },
        onSubmit: (values) => {
            let listImage = [
                values.main_image_url,
                values.url_image1,
                values.url_image2,
                values.url_image3,
                values.url_image4
            ];
            listImage = listImage.filter(item => item);
            let params = {
                name: values.name,
                description: draftjsToHtml(convertToRaw(shortDesc.getCurrentContent())),
                detail: draftjsToHtml(convertToRaw(longDesc.getCurrentContent())),
                price: values.price,
                discount: values.discount,
                category_id: categorySelected.value,
                list_product_images: listImage,
            }
            submitEditCategory(params);
        },
        validationSchema: productSchema,
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


        if (detailProduct?.state === "SUCCESS") {
            // handle convert initial short desc
            const blockShortHTML = convertFromHTML(detailProduct.data.description);
            let shortState = ContentState.createFromBlockArray(
                blockShortHTML.contentBlocks,
                blockShortHTML.entityMap
            );
            setShortDesc(EditorState.createWithContent(shortState));

            // handle convert initial long desc
            const blockLongHTML = convertFromHTML(detailProduct.data.detail);
            let longState = ContentState.createFromBlockArray(
                blockLongHTML.contentBlocks,
                blockLongHTML.entityMap
            );
            setLongDesc(EditorState.createWithContent(longState));
            // other field
            formik.values.name = detailProduct.data.name;
            formik.values.price = detailProduct.data.price;
            formik.values.discount = detailProduct.data.discount;
            formik.values.main_image_url = detailProduct.data?.image[0].src;
            formik.values.url_image1 = detailProduct.data?.image[1]?.src || '';
            formik.values.url_image2 = detailProduct.data?.image[2]?.src || '';
            formik.values.url_image3 = detailProduct.data?.image[3]?.src || '';
            formik.values.url_image4 = detailProduct.data?.image[4]?.src || '';

            // initial  category selected
            let categoryTmp = categoryOption.filter((item) => {
                if (item.value === detailProduct.data.category_id)
                    return item;
            })
            setCategorySelected(categoryTmp[0]);
        }
    }, [detailProduct])

    return (
        <>
            <div className="relative flex flex-col min-w-0 break-words w-full shadow-lg rounded-lg bg-blueGray-100 border-0">
                <div className="rounded-t mb-0 px-6 py-6">
                    <div className="text-center flex justify-between">
                        <h6 className="mb-0 text-blueGray-700 text-xl font-bold">Sửa sản phẩm</h6>
                        <a
                            href='/admin/list-products'
                            className="bg-gray-500 text-white active:bg-lightBlue-600 font-bold uppercase text-xs px-4 py-2 rounded shadow hover:shadow-md outline-none focus:outline-none mr-1 ease-linear transition-all duration-150"
                        >
                            Back
                        </a>
                    </div>
                </div>
                <div className="flex-auto px-4 lg:px-10 py-10 pt-0">
                    <form onSubmit={formik.handleSubmit}>
                        <div className="flex flex-wrap">
                            <div className="w-full lg:w-6/12 px-4">
                                <div className="relative w-full mb-3">

                                    <label
                                        className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                                    >
                                        Tên <span className="text-rose-600">*</span>
                                    </label>
                                    <input
                                        type="text"
                                        onChange={formik.handleChange}
                                        value={formik.values.name}
                                        autoComplete="off"
                                        name="name"
                                        className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                                        placeholder="Tên sản phẩm"
                                    />
                                    {formik.touched.name && formik.errors.name ? (
                                        <div className="text-rose-600">{formik.errors.name}</div>
                                    ) : null}
                                </div>
                            </div>
                            <div className="w-full lg:w-6/12 px-4">
                                <div className="relative w-full mb-3">

                                    <label
                                        className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                                    >
                                        Giá ($) <span className="text-rose-600">*</span>
                                    </label>
                                    <input
                                        type="number"
                                        onChange={formik.handleChange}
                                        value={formik.values.price}
                                        autoComplete="off"
                                        name="price"
                                        className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                                        placeholder="Giá"
                                    />
                                    {formik.touched.price && formik.errors.price ? (
                                        <div className="text-rose-600">{formik.errors.price}</div>
                                    ) : null}
                                </div>
                            </div>

                            <div className="w-full lg:w-6/12 px-4">
                                <div className="relative w-full mb-3">

                                    <label
                                        className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                                    >
                                        Giảm giá (%) <span className="text-rose-600">*</span>
                                    </label>
                                    <input
                                        type="text"
                                        onChange={formik.handleChange}
                                        value={formik.values.discount}
                                        autoComplete="off"
                                        name="discount"
                                        className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                                        placeholder="Giảm giá"
                                    />
                                    {formik.touched.discount && formik.errors.discount ? (
                                        <div className="text-rose-600">{formik.errors.discount}</div>
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
                                        // defaultEditorState={test}
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
                            Ảnh
                        </h6>
                        <div className="flex flex-wrap">
                            <div className="w-full lg:w-12/12 px-4">
                                <div className="relative w-full mb-3">
                                    <label
                                        className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                                    >
                                        Ảnh chính <span className="text-rose-600">*</span>
                                    </label>
                                    <input
                                        type="text"
                                        onChange={formik.handleChange}
                                        value={formik.values.main_image_url}
                                        autoComplete="off"
                                        name="main_image_url"
                                        className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                                        placeholder="Main image URL"
                                    />
                                    {formik.touched.main_image_url && formik.errors.main_image_url ? (
                                        <div className="text-rose-600">{formik.errors.main_image_url}</div>
                                    ) : null}
                                </div>
                            </div>
                            <div className="w-full lg:w-6/12 px-4">
                                <div className="relative w-full mb-3">
                                    <label
                                        className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                                    >
                                        Ảnh phụ 1 <span className="text-rose-600">*</span>
                                    </label>
                                    <input
                                        type="text"
                                        onChange={formik.handleChange}
                                        value={formik.values.url_image1}
                                        autoComplete="off"
                                        name="url_image1"
                                        className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                                        placeholder="Other image 1"
                                    />
                                    {formik.touched.url_image1 && formik.errors.url_image1 ? (
                                        <div className="text-rose-600">{formik.errors.url_image1}</div>
                                    ) : null}
                                </div>
                            </div>
                            <div className="w-full lg:w-6/12 px-4">
                                <div className="relative w-full mb-3">
                                    <label
                                        className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                                    >
                                        Ảnh phụ 2 <span className="text-rose-600">*</span>
                                    </label>
                                    <input
                                        type="text"
                                        onChange={formik.handleChange}
                                        value={formik.values.url_image2}
                                        autoComplete="off"
                                        name="url_image2"
                                        className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                                        placeholder="Other image 2"
                                    />
                                    {formik.touched.url_image2 && formik.errors.url_image2 ? (
                                        <div className="text-rose-600">{formik.errors.url_image2}</div>
                                    ) : null}
                                </div>
                            </div>
                            <div className="w-full lg:w-6/12 px-4">
                                <div className="relative w-full mb-3">
                                    <label
                                        className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                                    >
                                        Ảnh phụ 3 <span className="text-rose-600">*</span>
                                    </label>
                                    <input
                                        type="text"
                                        onChange={formik.handleChange}
                                        value={formik.values.url_image3}
                                        autoComplete="off"
                                        name="url_image3"
                                        className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                                        placeholder="Other image 3"
                                    />
                                    {formik.touched.url_image3 && formik.errors.url_image3 ? (
                                        <div className="text-rose-600">{formik.errors.url_image3}</div>
                                    ) : null}
                                </div>
                            </div>
                            <div className="w-full lg:w-6/12 px-4">
                                <div className="relative w-full mb-3">
                                    <label
                                        className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                                    >
                                        Ảnh phụ 4 <span className="text-rose-600">*</span>
                                    </label>
                                    <input
                                        type="text"
                                        onChange={formik.handleChange}
                                        value={formik.values.url_image4}
                                        autoComplete="off"
                                        name="url_image4"
                                        className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                                        placeholder="Other image 4"
                                    />
                                    {formik.touched.url_image4 && formik.errors.url_image4 ? (
                                        <div className="text-rose-600">{formik.errors.url_image4}</div>
                                    ) : null}
                                </div>
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
                                        value={categorySelected}
                                    />
                                </div>
                            </div>
                        </div>
                        <div className="flex justify-end">
                            <button
                                className="bg-lightBlue-500 text-white active:bg-lightBlue-600 font-bold uppercase text-xs px-4 py-2 rounded shadow hover:shadow-md outline-none focus:outline-none mr-1 ease-linear transition-all duration-150"
                                type="submit"
                            >
                                Lưu lại
                            </button>
                        </div>
                        <hr className="mt-6 border-b-1 border-blueGray-300" />
                    </form>
                </div>
            </div>

        </>
    );
}
