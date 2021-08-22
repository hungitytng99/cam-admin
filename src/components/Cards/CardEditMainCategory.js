import React, { useEffect, useState } from "react";
import { useFormik } from 'formik';
import * as Yup from 'yup';
// components

export default function CardEditMainCategory(props) {
    const { detailMainCategory, submitEditMainCategory } = props;

    const [, setIsReload] = useState(false);
    const validationSchema = Yup.object().shape({
        name: Yup.string()
            .required('This field is required'),
        description: Yup.string()
            .required('This field is required'),
        url_image: Yup.string()
            .required('This field is required')
            .url('This field must be a valid url'),
        sub_image: Yup.string()
            .required('This field is required')
            .url('This field must be a valid url'),
    });

    const formik = useFormik({
        initialValues: {
            name: '',
            description: '',
            url_image: '',
            sub_image: ''
        },
        onSubmit: (values) => {
            submitEditMainCategory(values);
        },
        validationSchema: validationSchema,
    });

    useEffect(() => {
        if (detailMainCategory?.state === "SUCCESS") {
            formik.values.name = detailMainCategory.data.name;
            formik.values.description = detailMainCategory.data.description;
            formik.values.url_image = detailMainCategory.data.image;
            formik.values.sub_image = detailMainCategory.data.sub_image;
            setIsReload(true);
        }
    }, [detailMainCategory])

    return (
        <>
            <div className="relative flex flex-col min-w-0 break-words w-full shadow-lg rounded-lg bg-blueGray-100 border-0">
                <div className="flex-auto px-4 lg:px-10 py-10 pt-0">
                    <form onSubmit={formik.handleSubmit}>
                        <h6 className="text-blueGray-400 text-sm mt-3 mb-6 font-bold uppercase">
                            Main category
                        </h6>
                        <div className="flex flex-wrap">
                            <div className="w-full lg:w-4/12 px-4">
                                <div className="relative w-full mb-3">
                                    <label
                                        className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                                    >
                                        Name <span className="text-rose-600">*</span>
                                    </label>
                                    <input
                                        type="text"
                                        onChange={formik.handleChange}
                                        value={formik.values.name}
                                        autoComplete="off"
                                        name="name"
                                        className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                                        placeholder="Name"
                                    />
                                    {formik.touched.name && formik.errors.name ? (
                                        <div className="text-rose-600">{formik.errors.name}</div>
                                    ) : null}

                                </div>
                            </div>
                            <div className="w-full lg:w-4/12 px-4">
                                <div className="relative w-full mb-3">
                                    <label
                                        className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                                    >
                                        Main image <span className="text-rose-600">*</span>
                                    </label>
                                    <input
                                        type="text"
                                        onChange={formik.handleChange}
                                        value={formik.values.url_image}
                                        autoComplete="off"
                                        name="url_image"
                                        className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                                        placeholder="URL main image"
                                    />
                                    {formik.touched.url_image && formik.errors.url_image ? (
                                        <div className="text-rose-600">{formik.errors.url_image}</div>
                                    ) : null}

                                </div>
                            </div>

                            <div className="w-full lg:w-4/12 px-4">
                                <div className="relative w-full mb-3">
                                    <label
                                        className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                                    >
                                        Sub image <span className="text-rose-600">*</span>
                                    </label>
                                    <input
                                        type="text"
                                        onChange={formik.handleChange}
                                        value={formik.values.sub_image}
                                        autoComplete="off"
                                        name="sub_image"
                                        className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                                        placeholder="URL main image"
                                    />
                                    {formik.touched.sub_image && formik.errors.sub_image ? (
                                        <div className="text-rose-600">{formik.errors.sub_image}</div>
                                    ) : null}

                                </div>
                            </div>

                            <div className="w-full px-4">
                                <div className="relative w-full mb-3">
                                    <label
                                        className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                                    >
                                        Description <span className="text-rose-600">*</span>
                                    </label>
                                    <textarea
                                        onChange={formik.handleChange}
                                        value={formik.values.description}
                                        autoComplete="off"
                                        name="description"
                                        rows={4}
                                        className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150 resize-none"
                                        placeholder="Description"
                                    />
                                    {formik.touched.description && formik.errors.description ? (
                                        <div className="text-rose-600">{formik.errors.description}</div>
                                    ) : null}
                                </div>
                            </div>

                        </div>
                        <div className="flex justify-end">
                            <button
                                className="bg-lightBlue-500 text-white active:bg-lightBlue-600 font-bold uppercase text-xs px-4 py-2 rounded shadow hover:shadow-md outline-none focus:outline-none mr-1 ease-linear transition-all duration-150"
                                type="submit"
                            >
                                Edit main category
                            </button>
                        </div>
                        <hr className="mt-6 border-b-1 border-blueGray-300" />
                    </form>
                </div>
            </div>

        </>
    );
}
