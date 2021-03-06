import React from "react";
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';
// components

export default function CardAddMainCategory(props) {
    const { addCategory } = props;

    const mainCategorySchema = Yup.object().shape({
        name: Yup.string()
            .required('This field is required'),
    });

    return (
        <>
            <div className="relative flex flex-col min-w-0 break-words w-full shadow-lg rounded-lg bg-blueGray-100">

                <div className="flex-auto px-4 lg:px-10 py-10 pt-0">
                    <Formik
                        initialValues={{
                            name: '', description: ''
                        }}
                        validationSchema={mainCategorySchema}
                        onSubmit={async (values) => {
                            addCategory(values);
                        }}
                    >
                        {({ errors, touched }) => (
                            <Form>
                                <h6 className="text-blueGray-400 text-sm mt-3 font-bold uppercase">
                                    Danh mục
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
                                                placeholder="Tên" />
                                            {errors.name && touched.name ? (
                                                <div className="text-rose-600">{errors.name}</div>
                                            ) : null}
                                        </div>
                                    </div>
                                    <div className="w-6/12 px-4">
                                        <div className="relative w-full mb-3">
                                            <label
                                                className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                                            >
                                                Mô tả
                                            </label>
                                            <Field
                                                component="textarea"
                                                autoComplete="off"
                                                name="description"
                                                rows={4}
                                                className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150 resize-none"
                                                placeholder="Mô tả" />
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
                                        Thêm danh mục
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
