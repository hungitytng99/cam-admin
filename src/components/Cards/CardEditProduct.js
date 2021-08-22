import React, { useEffect, useState } from "react";
import Select from 'react-select';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { categoryService } from "data-services/category";
// components

export default function CardEditProduct(props) {
    const { submitEditMainCategory, detailProduct } = props;
    const [subCategoryOption, setSubCategoryOption] = useState({ label: '', value: '' });
    const [subCategorySelected, setSubCategorySelected] = useState({ label: '', value: '' });

    const handleSubChange = subCategoryOption => {
        setSubCategorySelected(subCategoryOption);
    };

    const productSchema = Yup.object().shape({
        title: Yup.string()
            .required('This field is required'),
        description: Yup.string()
            .required('This field is required'),
        model_number: Yup.string()
            .required('This field is required'),
        main_image_url: Yup.string()
            .required('This field is required')
            .url('This field must be a valid url'),
        url_image1: Yup.string()
            .url('This field must be a valid url'),
        url_image2: Yup.string()
            .url('This field must be a valid url'),
        url_image3: Yup.string()
            .url('This field must be a valid url'),
        url_image4: Yup.string()
            .url('This field must be a valid url'),
        price: Yup.string()
            .required('This field is required'),
        material: Yup.string()
            .required('This field is required'),
    });

    const formik = useFormik({
        initialValues: {
            title: '', description: '', model_number: '', main_image_url: '',
            url_image1: '', url_image2: '', url_image3: '', url_image4: '',
            price: '', material: '',
        },
        onSubmit: (values) => {
            submitEditMainCategory({ 
                size: 0, 
                category_id: subCategorySelected.value,
                slug: detailProduct.data.slug,
                ...values });
        },
        validationSchema: productSchema,
    });

    useEffect(() => {
        const listSubCateogry = async () => {
            let listSubCategory = await categoryService.listSubCategoryAsync();
            listSubCategory.data = listSubCategory.data.map((subCategory) => {
                return {
                    label: subCategory.name,
                    value: subCategory.id,
                }
            });
            setSubCategoryOption(listSubCategory.data);
        }
        listSubCateogry();

        if (detailProduct?.state === "SUCCESS") {
            formik.values.title = detailProduct.data.title;
            formik.values.description = detailProduct.data.description;
            formik.values.model_number = detailProduct.data.model;
            formik.values.price = detailProduct.data.price;
            formik.values.material = detailProduct.data.material;
            formik.values.main_image_url = detailProduct.data?.image[0];
            formik.values.url_image1 = detailProduct.data?.image[1] || '';
            formik.values.url_image2 = detailProduct.data?.image[2] || '';
            formik.values.url_image3 = detailProduct.data?.image[3] || '';
            formik.values.url_image4 = detailProduct.data?.image[4] || '';
            setSubCategorySelected({ label: detailProduct.data?.sub_category, value: detailProduct.data?.sub_category_id })
        }
    }, [detailProduct])

    return (
        <>
            <div className="relative flex flex-col min-w-0 break-words w-full shadow-lg rounded-lg bg-blueGray-100 border-0">
                <div className="rounded-t mb-0 px-6 py-6">
                    <div className="text-center flex justify-between">
                        <h6 className="mb-0 text-blueGray-700 text-xl font-bold">Edit products</h6>
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
                                        Model <span className="text-rose-600">*</span>
                                    </label>
                                    <input
                                        type="text"
                                        onChange={formik.handleChange}
                                        value={formik.values.model_number}
                                        autoComplete="off"
                                        name="model_number"
                                        className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                                        placeholder="Model"
                                    />
                                    {formik.touched.model_number && formik.errors.model_number ? (
                                        <div className="text-rose-600">{formik.errors.model_number}</div>
                                    ) : null}
                                </div>
                            </div>

                            <div className="w-full lg:w-6/12 px-4">
                                <div className="relative w-full mb-3">

                                    <label
                                        className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                                    >
                                        Name <span className="text-rose-600">*</span>
                                    </label>
                                    <input
                                        type="text"
                                        onChange={formik.handleChange}
                                        value={formik.values.title}
                                        autoComplete="off"
                                        name="title"
                                        className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                                        placeholder="Name"
                                    />
                                    {formik.touched.title && formik.errors.title ? (
                                        <div className="text-rose-600">{formik.errors.title}</div>
                                    ) : null}
                                </div>
                            </div>

                            <div className="w-full lg:w-6/12 px-4">
                                <div className="relative w-full mb-3">

                                    <label
                                        className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                                    >
                                        Price ($) <span className="text-rose-600">*</span>
                                    </label>
                                    <input
                                        type="text"
                                        onChange={formik.handleChange}
                                        value={formik.values.price}
                                        autoComplete="off"
                                        name="price"
                                        className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                                        placeholder="Price"
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
                                        Material <span className="text-rose-600">*</span>
                                    </label>
                                    <input
                                        type="text"
                                        onChange={formik.handleChange}
                                        value={formik.values.material}
                                        autoComplete="off"
                                        name="material"
                                        className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                                        placeholder="Material"
                                    />
                                    {formik.touched.material && formik.errors.material ? (
                                        <div className="text-rose-600">{formik.errors.material}</div>
                                    ) : null}
                                </div>
                            </div>

                            <div className="w-full lg:w-6/12 px-4">
                                <div className="relative w-full mb-3">

                                    <label
                                        className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                                    >
                                        Description <span className="text-rose-600">*</span>
                                    </label>
                                    <input
                                        type="text"
                                        onChange={formik.handleChange}
                                        value={formik.values.description}
                                        autoComplete="off"
                                        name="description"
                                        className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                                        placeholder="Description"
                                    />
                                    {formik.touched.description && formik.errors.description ? (
                                        <div className="text-rose-600">{formik.errors.description}</div>
                                    ) : null}
                                </div>
                            </div>
                        </div>
                        <hr className="mt-6 border-b-1 border-blueGray-300" />
                        <h6 className="text-blueGray-400 text-sm mt-3 mb-6 font-bold uppercase">
                            Images
                        </h6>
                        <div className="flex flex-wrap">
                            <div className="w-full lg:w-12/12 px-4">
                                <div className="relative w-full mb-3">
                                    <label
                                        className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                                    >
                                        Main image <span className="text-rose-600">*</span>
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
                                        Other image 1 <span className="text-rose-600">*</span>
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
                                        Other image 2 <span className="text-rose-600">*</span>
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
                                        Other image 3 <span className="text-rose-600">*</span>
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
                                        Other image 4 <span className="text-rose-600">*</span>
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
                            Category
                        </h6>
                        <div className="flex flex-wrap">
                            <div className="w-full lg:w-6/12 px-4">
                                <div className="relative w-full mb-3">
                                    <label
                                        className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                                    >
                                        Sub category <span className="text-rose-600">*</span>
                                    </label>
                                    <Select
                                        className="w-64"
                                        placeholder="Sub category"
                                        onChange={handleSubChange}
                                        options={subCategoryOption}
                                        value={subCategorySelected}
                                    />
                                </div>
                            </div>
                        </div>
                        <div className="flex justify-end">
                            <button
                                className="bg-lightBlue-500 text-white active:bg-lightBlue-600 font-bold uppercase text-xs px-4 py-2 rounded shadow hover:shadow-md outline-none focus:outline-none mr-1 ease-linear transition-all duration-150"
                                type="submit"
                            >
                                Save
                            </button>
                        </div>
                        <hr className="mt-6 border-b-1 border-blueGray-300" />
                    </form>
                </div>
            </div>

        </>
    );
}
