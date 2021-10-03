import React, { useEffect, useState } from 'react';
import * as Yup from 'yup';
import { useFormik } from 'formik';
import { bannerService } from 'data-services/banner';
import FullPageLoading from "components/Loading/FullPageLoading";
import { REQUEST_STATE } from 'app-configs';
import { notification } from 'antd';

function UpdateBanner(props) {
    const [listImages, setListImages] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const bannerSchema = Yup.object().shape({
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
            url_image1: '', url_image2: '', url_image3: '', url_image4: ''
        },
        onSubmit: async (values) => {
            const params = [];
            if (values.url_image1) {
                params.push(values.url_image1)
            }
            if (values.url_image2) {
                params.push(values.url_image2)
            }
            if (values.url_image3) {
                params.push(values.url_image3)
            }
            if (values.url_image4) {
                params.push(values.url_image4)
            }

            setIsLoading(true);
            const response = await bannerService.updateBanner({ list_images: params });
            console.log(response);
            if(response.state === REQUEST_STATE.SUCCESS) {
                notification['success']({
                    message: 'Cập nhật ảnh banner',
                    description:
                        'Cập nhật thành công',
                });
            } else {
                notification['error']({
                    message: 'Cập nhật ảnh banner',
                    description:
                        'Một lỗi đã xáy ra. Vui lòng thử lại.',
                });
            }
            setIsLoading(false);
        },
        validationSchema: bannerSchema,
    });

    useEffect(() => {
        (async () => {
            const listImages = await bannerService.listBanner();
            setListImages(listImages.list_images);
        })();
    }, [])

    useEffect(() => {
        if (listImages.length > 0) {
            console.log('listImages: ', listImages);
            formik.values.url_image1 = listImages[0] || '';
            formik.values.url_image2 = listImages[1] || '';
            formik.values.url_image3 = listImages[2] || '';
            formik.values.url_image4 = listImages[3] || '';
            setIsLoading(false);
        }
    }, [listImages])


    return (<>
        {isLoading && <FullPageLoading />}
        <div className="flex flex-wrap mt-4">
            <div className="w-full mb-12 px-0 sm:px-4">
                <div
                    className="relative flex flex-col min-w-0 break-words w-full shadow-lg rounded-t bg-white pb-4"
                >
                    <div className="rounded-t mb-0 px-4 py-3 border-0">
                        <h3
                            className="mb-0 mr-2 whitespace-nowrap font-semibold text-lg text-blueGray-700"
                        >
                            Cập nhật ảnh banner
                        </h3>
                    </div>
                    <form onSubmit={formik.handleSubmit}>
                        <div className="flex flex-wrap">
                            <div className="w-full lg:w-6/12 px-4">
                                <div className="relative w-full mb-3">
                                    <label
                                        className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                                    >
                                        Ảnh banner 1
                                    </label>
                                    <input
                                        type="text"
                                        onChange={formik.handleChange}
                                        value={formik.values.url_image1}
                                        autoComplete="off"
                                        name="url_image1"
                                        className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                                        placeholder="Ảnh banner 1"
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
                                        Ảnh banner 2
                                    </label>
                                    <input
                                        type="text"
                                        onChange={formik.handleChange}
                                        value={formik.values.url_image2}
                                        autoComplete="off"
                                        name="url_image2"
                                        className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                                        placeholder="Ảnh banner 2"
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
                                        Ảnh banner 2
                                    </label>
                                    <input
                                        type="text"
                                        onChange={formik.handleChange}
                                        value={formik.values.url_image3}
                                        autoComplete="off"
                                        name="url_image3"
                                        className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                                        placeholder="Ảnh banner 2"
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
                                        Ảnh banner 4
                                    </label>
                                    <input
                                        type="text"
                                        onChange={formik.handleChange}
                                        value={formik.values.url_image4}
                                        autoComplete="off"
                                        name="url_image4"
                                        className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                                        placeholder="Ảnh banner 4"
                                    />
                                    {formik.touched.url_image4 && formik.errors.url_image4 ? (
                                        <div className="text-rose-600">{formik.errors.url_image4}</div>
                                    ) : null}
                                </div>
                            </div>
                        </div>
                        <div className="flex justify-end">
                            <button
                                className="mt-4 mr-4 bg-lightBlue-500 text-white active:bg-lightBlue-600 font-bold uppercase text-xs px-4 py-2 rounded shadow hover:shadow-md outline-none focus:outline-none ease-linear transition-all duration-150"
                                type="submit"
                            >
                                Lưu lại
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    </>

    );
}

export default UpdateBanner;