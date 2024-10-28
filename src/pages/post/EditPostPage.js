import axios from "axios"
import { useEffect, useRef, useState } from "react"
import { useParams } from "react-router"
import { URL_API } from "../../constants/config"
import draftToHtml from 'draftjs-to-html';
import { Editor } from 'react-draft-wysiwyg';
import Spinners from '../../components/Spinners';
import { useForm } from 'react-hook-form';
import { EditorState, ContentState, convertFromHTML, convertToRaw } from 'draft-js';
import { toast } from "react-toastify";
import { useHistory } from "react-router-dom";
export const EditPostPage = () => {
    const history = useHistory();
    const [product, setProduct] = useState({});
    const { register, handleSubmit, setValue } = useForm();
    const [image, setImage] = useState("");
    const fileRef = useRef();
    const params = useParams();
    const [file, setFile] = useState(null);
    const [spn, setSpn] = useState(false);
    const fetchOneProduct = () => {
        axios.get(`${URL_API}/post/${params.id}`)
            .then(res => res.data)
            .then(data => {
                setImage(data.post.image);
                setProduct(data.post);
                setValue("title", data.post.title);
                setValue("tags", data.post.tags);
            })
    }
    useEffect(() => {
        fetchOneProduct();
        return () => {
            setProduct({});
        }
    }, [params.id])
    const onChangeFileImage = (e) => {
        setFile(e.target.files[0])
        encodeImageFileAsURL(e.target.files[0]);
    }
    const encodeImageFileAsURL = (element) => {
        var file = element;
        var reader = new FileReader();
        reader.onloadend = function () {
            setImage(reader.result)
        }
        reader.readAsDataURL(file);
    }
    const onSubmitPost = (dataa) => {
        setSpn(true);
        const formData = new FormData();
        dataa.content = product.content;
        if (file) {
            formData.append("postImage", file);
        }
        else {
            dataa.image = product.image;
        }
        formData.append("post", JSON.stringify(dataa));
        axios({
            method: "POST",
            url: `${URL_API}/post/${product._id}`,
            data: formData,
            headers: {
                "Authorization": `Bearer ${sessionStorage.getItem("token")}`
            }
        })
            .catch(err => console.log(err))
            .then(res => res.data)
            .then(res => {
                setSpn(true);
                if (res?.status === "success") {
                    toast.success("Sửa bài viết thành công!", {
                        position: "top-right",
                        autoClose: 3000,
                        closeButton: true
                    })
                    history.push("/Blog");
                }
                else {
                    toast.error("Sửa bài viết thất bại!", {
                        position: "top-right",
                        autoClose: 3000,
                        closeButton: true
                    })
                }
            })
    }
    const onChangeEditor = (editorState) => {
        setProduct({ ...product, content: draftToHtml(convertToRaw(editorState.getCurrentContent())) })
    }
    return (
        <div className="wrapper-product">
            <div className="container-fluid" style={{ marginBottom: "10px" }}>
                <div className="card shadow mb-4">
                    <div className="card-header py-3">
                        <h6 className="m-0 font-weight-bold text-primary">Sửa bài viết</h6>
                    </div>
                </div>
            </div>
            <div className="post-wrapper">
                <form className="post-form" onSubmit={handleSubmit(onSubmitPost)}>
                    <div className="post-form_group">
                        <input
                            defaultValue={product.title}
                            {...register("title", { required: true })}
                            type="text"
                            placeholder="Tiêu đề....." />
                    </div>
                    <div className="post-form_group" onClick={() => fileRef.current.click()}>
                        <input
                            onChange={onChangeFileImage}
                            type="file"
                            hidden ref={fileRef} />
                        {!image ? <div className="post-form_file">
                            <span><i class="fas fa-images"></i></span>
                        </div> : <div className="post-form_file"><img alt="Ảnh đại diện bài viết" src={image} className="post-form_image" /></div>}
                    </div>
                    {product.content && (
                        <Editor
                            defaultEditorState={EditorState.createWithContent(
                                ContentState.createFromBlockArray(
                                    convertFromHTML(product?.content)
                                )
                            )}
                            placeholder="Nội dung..."
                            onEditorStateChange={onChangeEditor}
                            wrapperClassName="post-editor"
                        />
                    )}
                    <div className="post-form_group">
                        <input
                            defaultValue={product.tags}
                            {...register("tags", { required: true })}
                            type="text"
                            placeholder="Tags..." />
                    </div>
                    <button className="post-form_btn">
                        {spn ? <Spinners /> : ""}
                        Sửa bài viết
                    </button>
                </form>
            </div>
        </div>
    )
}