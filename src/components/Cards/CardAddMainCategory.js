import React from "react";
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';
// components

export default function CardAddMainCategory(props) {
    const { addMainCategory } = props;

    const mainCategorySchema = Yup.object().shape({
        name: Yup.string()
            .required('This field is required'),
        description: Yup.string()
            .required('This field is required'),
        url_image: Yup.string()
            .url('This field must be a valid URL')
            .required('This field is required'),
        sub_image: Yup.string()
            .url('This field must be a valid URL')
            .required('This field is required'),
    });

    return (
        <>
            <div className="relative flex flex-col min-w-0 break-words w-full shadow-lg rounded-lg bg-blueGray-100 border-0">

                <div className="flex-auto px-4 lg:px-10 py-10 pt-0">
                    <Formik
                        initialValues={{
                            name: '', description: '', url_image: '', sub_image: ''
                        }}
                        validationSchema={mainCategorySchema}
                        onSubmit={async (values) => {
                            addMainCategory(values);
                        }}
                    >
                        {({ errors, touched }) => (
                            <Form>
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
                                            <Field
                                                autoComplete="off"
                                                name="name"
                                                className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                                                placeholder="Name" />
                                            {errors.name && touched.name ? (
                                                <div className="text-rose-600">{errors.name}</div>
                                            ) : null}
                                        </div>
                                    </div>
                                    <div className="w-full lg:w-4/12 px-4">
                                        <div className="relative w-full mb-3">
                                            <label
                                                className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                                            >
                                                Url main image <span className="text-rose-600">*</span>
                                            </label>
                                            <Field
                                                autoComplete="off"
                                                name="url_image"
                                                className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                                                placeholder="Url image" />
                                            {errors.url_image && touched.url_image ? (
                                                <div className="text-rose-600">{errors.url_image}</div>
                                            ) : null}
                                        </div>
                                    </div>
                                    <div className="w-full lg:w-4/12 px-4">
                                        <div className="relative w-full mb-3">
                                            <label
                                                className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                                            >
                                                Url sub image <span className="text-rose-600">*</span>
                                            </label>
                                            <Field
                                                autoComplete="off"
                                                name="sub_image"
                                                className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                                                placeholder="Url image" />
                                            {errors.sub_image && touched.sub_image ? (
                                                <div className="text-rose-600">{errors.sub_image}</div>
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
                                            <Field
                                                component="textarea"
                                                autoComplete="off"
                                                name="description"
                                                rows={4}
                                                className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150 resize-none"
                                                placeholder="Description" />
                                            {errors.description && touched.description ? (
                                                <div className="text-rose-600">{errors.description}</div>
                                            ) : null}
                                        </div>
                                    </div>
                                </div>
                                <div className="flex justify-end">
                                    <button
                                        className="bg-lightBlue-500 text-white active:bg-lightBlue-600 font-bold uppercase text-xs px-4 py-2 rounded shadow hover:shadow-md outline-none focus:outline-none mr-1 ease-linear transition-all duration-150"
                                        type="submit"
                                    >
                                        Add main category
                                    </button>
                                </div>
                                <hr className="mt-6 border-b-1 border-blueGray-300" />


                            </Form>
                        )}
                    </Formik>
                </div>
            </div>
        </>
    );
}
