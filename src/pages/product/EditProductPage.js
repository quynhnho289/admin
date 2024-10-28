import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import ImageUploading from 'react-images-uploading';
import { toast } from 'react-toastify'
import { EditorState, ContentState, convertFromHTML, convertToRaw } from 'draft-js';
import { Editor } from 'react-draft-wysiwyg';
import draftToHtml from 'draftjs-to-html';
import { useParams, useHistory } from 'react-router-dom';
import { URL_API } from '../../constants/config';
import Loading from '../../components/Loading';
import axios from 'axios';
import Spinners from '../../components/Spinners';
function EditProduct(props) {
    let history = useHistory();
    const [images, setImages] = React.useState([]);
    const [loading, setLoading] = useState(false);
    const { productID } = useParams();
    const [files, setFiles] = useState([]);
    const [loadingBtn, setLoadingBtn] = useState(false);
    const [typeDefault, setTypeDefault] = useState("");
    const [nxbDefault, setNxbDefault] = useState("");
    const [types, setTypes] = useState([{ _id: "" }]);
    const [nxb, setNxb] = useState([{ _id: "" }])
    const [des, setDes] = useState("");
    const { register, handleSubmit, formState: { errors }, setValue } = useForm();
    const maxNumber = 4;
    const onChange = (imageList) => {
        const files = [];
        const url = [];
        for (const file of imageList) {
            if (file.file) files.push(file.file);
            else {
                url.push(file)
            }
        }
        setFiles(files);
        setImages(imageList);
    };
    const onErrros = (errros, files) => {
        if (errros.maxNumber) {
            toast.error("Tối đa chỉ 4 ảnh!", {
                position: 'top-right',
                autoClose: 3000,
                closeOnClick: true,
                pauseOnHover: true
            })
        }
    }
    function getOneProduct() {
        setLoading(false);
        axios({
            method: "GET",
            url: `${URL_API}/products/${productID}`,
            headers: {
                "Authorization": `Bearer ${sessionStorage.getItem('token')}`
            }
        })
            .then(res => res.data)
            .then(data => {
                setImages(data.product.urls);
                setTypeDefault(data.product.types._id);
                setNxbDefault(data.product.publicCompany._id)
                setLoading(true);
                setDes(data.product.description);
                console.log(data.product.sale)
                setValue('form', {
                    title: data.product.title,
                    author: data.product.author,
                    // description: data.product.description,
                    price: data.product.price,
                    publicYear: data.product.publicYear,
                    inStock: data.product.inStock,
                    pages: data.product.pages,
                    sale: data.product?.sale || 0
                })
            })
            .catch(err => {
                console.log(err)
            })
    }
    function GetAllTypeAndNxb() {
        axios.get(`${URL_API}/tn/type`)
            .then(res => res.data)
            .then(data => {
                setTypes(data.types);
            })
        axios.get(`${URL_API}/tn/nxb`)
            .then(res => res.data)
            .then(data => {
                setNxb(data.nxb);
            })
    }
    useEffect(() => {
        GetAllTypeAndNxb();
        getOneProduct();
    }, [productID])
    const onSubmit = (data) => {
        const formData = new FormData();
        if (files.length != 0) {
            files.forEach(file => {
                formData.append('image', file);
            })
        }
        data.form.urls = [];
        images.forEach(file => {
            if (!file.data_url) data.form.urls.push(file);
        })
        if (data.form.types === "") data.form.types = typeDefault;
        if (data.form.publicCompany === "") data.form.publicCompany = nxbDefault;
        data.form.description = des;
        Number(data.form.price);
        Number(data.form.sale);
        formData.append('product', JSON.stringify(data.form));
        setLoadingBtn(true);
        axios({
            method: "POST",
            url: `${URL_API}/products/${productID}`,
            data: formData,
            headers: {
                "Content-type": "application/json",
                "Authorization": `${sessionStorage.getItem("token")}`
            }
        })
            .then(res => res.data)
            .then(data => {
                console.log(data);
                setLoadingBtn(false);
                if (data.status === 'success') {
                    toast.success("Sửa sản phẩm thành công!", {
                        position: "top-right",
                        autoClose: 3000,
                        closeOnClick: true,
                        pauseOnHover: true
                    })
                    history.push("/product/list");
                }
                else {
                    toast.error("Sửa sản phẩm thất bại!", {
                        position: "top-right",
                        autoClose: 3000,
                        closeOnClick: true,
                        pauseOnHover: true
                    })
                }
            });
    }
    const onChangeDes = (editorState) => {
        setDes(draftToHtml(convertToRaw(editorState.getCurrentContent())));
    }
    return (
        <div className="container" >
            {loading ? <div className="wrapper-edit">
                <div className="row">
                    <div className="col-12">
                        <div class="card shadow mb-4">
                            <div class="card-header py-3">
                                <h6 class="m-0 font-weight-bold text-primary">Sửa sản phẩm</h6>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="row tm-edit-product-row">
                    <div className="col-xl-12 col-lg-12 col-md-12">
                        <form onSubmit={handleSubmit(onSubmit)} className="tm-edit-product-form">
                            <div className="row">
                                <div className="col-xl-6">
                                    <div className="form-group mb-3">
                                        <label
                                        >Tên Sách
                                        </label>
                                        <input
                                            id="name"
                                            {...register("form.title", { required: true })}
                                            type="text"
                                            className="form-control"
                                        />
                                        {errors.title && <span style={{ color: 'red' }}>Vui lòng nhập tên sách</span>}
                                    </div>
                                    <div className="form-group mb-3">
                                        <label
                                        >Tên Tác Giả
                                        </label>
                                        <input
                                            id="name"
                                            type="text"
                                            className="form-control"
                                            {...register("form.author", { required: true })}
                                        />
                                        {errors.author && <span style={{ color: 'red' }}>Vui lòng nhập tên tác giả</span>}
                                    </div>
                                    <div className="form-group mb-3">
                                        <label>Mô tả</label>
                                        {des && (
                                            <Editor
                                                defaultEditorState={EditorState.createWithContent(
                                                    ContentState.createFromBlockArray(
                                                        convertFromHTML(des)
                                                    )
                                                )}
                                                onEditorStateChange={onChangeDes}
                                            />
                                        )}
                                    </div>
                                    <div className="form-group mb-3">
                                        <label
                                        >Thể loại</label>
                                        <select
                                            className="custom-select "
                                            id="category"
                                            {...register('form.types')}
                                            defaultValue={typeDefault}
                                        >
                                            {types.map(type => {
                                                return (
                                                    <option
                                                        key={type._id}
                                                        value={type._id}
                                                        selected={type._id === typeDefault}
                                                    >{type.name}</option>
                                                )
                                            })}
                                        </select>
                                    </div>
                                    <div className="form-group mb-3 ">
                                        <label
                                        >Nhà Xuất Bản
                                        </label>
                                        <select
                                            className="custom-select "
                                            id="category"
                                            {...register('form.publicCompany')}
                                            defaultValue={nxbDefault}
                                        >
                                            {nxb.map(n => {
                                                return (
                                                    <option
                                                        key={n._id}
                                                        value={n._id}
                                                        selected={n._id === nxbDefault}
                                                    >{n.name}</option>
                                                )
                                            })}
                                        </select>
                                    </div>
                                </div>
                                <div className="col-xl-6">
                                    <div className="row">
                                        <div className="form-group mb-3 col-xs-12 col-sm-6">
                                            <label
                                            >Giá
                                            </label>
                                            <input
                                                type="text"
                                                className="form-control"
                                                {...register('form.price', { required: true })}
                                            />
                                            {errors.publicYear && <span style={{ color: 'red' }}>Vui lòng nhập giá sản phẩm</span>}
                                        </div>
                                        <div className="form-group mb-3 col-xs-12 col-sm-6">
                                            <label
                                            >Năm xuất bản
                                            </label>
                                            <input
                                                id="expire_date"
                                                type="number"
                                                className="form-control"
                                                {...register('form.publicYear', { maxLength: 4, required: true })}
                                            />
                                            {errors.price && <span style={{ color: 'red' }}>Vui lòng nhập năm xuất bản</span>}
                                        </div>
                                        <div className="form-group mb-3 col-xs-12 col-sm-6">
                                            <label
                                            >Số lượng
                                            </label>
                                            <input
                                                id="stock"
                                                type="number"
                                                className="form-control"
                                                {...register('form.inStock', { required: true })}
                                            />
                                            {errors.inStock && <span style={{ color: 'red' }}>Vui lòng nhập số lượng</span>}
                                        </div>
                                        <div className="form-group mb-3 col-xs-12 col-sm-6">
                                            <label
                                            >Số trang
                                            </label>
                                            <input
                                                id="expire_date"
                                                type="number"
                                                className="form-control"
                                                {...register('form.pages', { required: true })}
                                            />
                                            {errors.pages && <span style={{ color: 'red' }}>Vui lòng nhập giá sản phẩm</span>}
                                        </div>
                                    </div>
                                    <div className="form-group mb-3">
                                        <label
                                        >Giảm giá (%)
                                        </label>
                                        <input
                                            id="sale"
                                            type="text"
                                            className="form-control"
                                            {...register("form.sale")}
                                        />
                                    </div>
                                    <div className="row">
                                        <ImageUploading
                                            multiple
                                            value={images}
                                            onChange={onChange}
                                            maxNumber={maxNumber}
                                            onError={onErrros}
                                            dataURLKey="data_url"
                                        >
                                            {({
                                                imageList,
                                                onImageUpload,
                                                onImageUpdate,
                                                onImageRemove,
                                                isDragging,
                                                dragProps
                                            }) => (
                                                <div
                                                    className="upload__image-wrapper">
                                                    <div
                                                        style={isDragging ? { color: "red" } : null}
                                                        onClick={onImageUpload}
                                                        {...dragProps}
                                                        className="on-images-upload">
                                                        <p><i class="far fa-images"></i></p>
                                                    </div>
                                                    <div className="image-list">
                                                        {imageList.map((image, index) => (
                                                            <div key={index} className="image-item">
                                                                <img src={image.data_url ? image.data_url : image.url} alt="" width="100" />
                                                                <div className="image-item__btn-wrapper">
                                                                    <span onClick={() => onImageUpdate(index)}><i class="fas fa-pen-square"></i></span>
                                                                    <span onClick={() => onImageRemove(index)}><i class="far fa-trash-alt"></i></span>
                                                                </div>
                                                            </div>
                                                        ))}
                                                    </div>
                                                </div>
                                            )}
                                        </ImageUploading>
                                    </div>
                                </div>
                                <button type="submit" className="btn btn-primary btn-block text-uppercase">
                                    {loadingBtn ? <Spinners /> : ''}
                                    Sửa sản phẩm
                                </button>
                            </div>
                        </form>

                    </div>
                </div>
            </div> : <Loading />}
        </div>

    );
}

export default EditProduct;