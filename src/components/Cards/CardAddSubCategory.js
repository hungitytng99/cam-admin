import React, { useEffect, useState } from "react";
import Select from 'react-select';
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';
import { categoryService } from "data-services/category";
// components

export default function CardAddSubCategory(props) {
    const [mainCategoryOption, setMainCategoryOption] = useState([{ label: '', value: '' }]);
    const [mainCategorySelected, setMainCategorySelected] = useState({ label: '', value: '' })
    const { addSubCategory } = props;

    const handleMainChange = mainCategoryOption => {
        // setMainCategoryOption(mainCategoryOption);
        setMainCategorySelected(mainCategoryOption)
    };

    const subCategorySchema = Yup.object().shape({
        name: Yup.string()
            .required('This field is required'),
    });
    const subCategoryStyle = {
        control: styles => ({ ...styles, height: '45px' })
    }

    useEffect(() => {
        const listMainCateogry = async () => {
            let listMainCategory = await categoryService.listMainCategoryAsync();
            listMainCategory.data = listMainCategory.data.map((subCategory) => {
                return {
                    label: subCategory.name,
                    value: subCategory.id,
                }
            });
            setMainCategoryOption(listMainCategory.data);
        }
        listMainCateogry();
    }, [])

    return (
        <>
            <div className="relative flex flex-col min-w-0 break-words w-full shadow-lg rounded-lg bg-blueGray-100 border-0">
                <div className="flex-auto px-4 lg:px-10 py-10 pt-0">
                    <Formik
                        initialValues={{
                            name: ''
                        }}
                        validationSchema={subCategorySchema}
                        onSubmit={async (values) => {
                            // same shape as initial values
                            const params = { main_category_id: mainCategorySelected.value, ...values }
                            addSubCategory(params);
                        }}
                    >
                        {({ errors, touched }) => (
                            <Form>
                                <h6 className="text-blueGray-400 text-sm mt-3 mb-6 font-bold uppercase">
                                    Sub category
                                </h6>
                                <div className="flex flex-wrap">
                                    <div className="w-full lg:w-6/12 px-4">
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
                                    <div className="w-full lg:w-6/12 px-4">
                                        <div className="relative w-full mb-3">
                                            <label
                                                className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                                            >
                                                Main category <span className="text-rose-600">*</span>
                                            </label>
                                            <Select
                                                styles={subCategoryStyle}
                                                placeholder="Main category"
                                                onChange={handleMainChange}
                                                options={mainCategoryOption}
                                            />
                                        </div>
                                    </div>
                                </div>
                                <div className="flex justify-end">
                                    <button
                                        className="bg-lightBlue-500 text-white active:bg-lightBlue-600 font-bold uppercase text-xs px-4 py-2 rounded shadow hover:shadow-md outline-none focus:outline-none mr-1 ease-linear transition-all duration-150"
                                        type="submit"
                                    >
                                        Add sub category
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
