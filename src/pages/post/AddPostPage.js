
import { Editor } from "react-draft-wysiwyg";
import { useRef, useState } from "react";
import { useForm } from 'react-hook-form';
import draftToHtml from 'draftjs-to-html';
import { convertToRaw } from "draft-js";
import axios from "axios";
import Spinners from '../../components/Spinners';
import { URL_API } from '../../constants/config';
import { useHistory } from "react-router-dom";
import { toast } from "react-toastify";
export const AddPostPage = () => {
    const history = useHistory();
    const fileRef = useRef();
    const [file, setFile] = useState(null);
    const [image, setImage] = useState(null);
    const [content, setContent] = useState(null);
    const { register, handleSubmit } = useForm();
    const [spn, setSpn] = useState(false);
    const onSubmitPost = (data) => {
        setSpn(true);
        if (file && content) {
            const formData = new FormData();
            formData.append("postImage", file);
            data.content = content;
            formData.append("post", JSON.stringify(data));
            axios({
                url: `${URL_API}/post`,
                method: "POST",
                data: formData,
                headers: {
                    "Authorization": `Bearer ${sessionStorage.getItem("token")}`
                }
            })
                .then(res => res.data)
                .then(data => {
                    setSpn(false);
                    if (data.status === "success") {
                        history.push("/blog");
                        toast.success("Tạo bài viết thành công!", {
                            position: "top-right",
                            autoClose: 3000,
                            closeButton: true
                        })
                    }
                })
        }
    }
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
    const onChangeEditor = (editorState) => {
        setContent(draftToHtml(convertToRaw(editorState.getCurrentContent())));
    }
    return (
        <div className="wrapper-product">
            <div className="container-fluid" style={{ marginBottom: "10px" }}>
                <div className="card shadow mb-4">
                    <div className="card-header py-3">
                        <h6 className="m-0 font-weight-bold text-primary">Tạo bài viết</h6>
                    </div>
                </div>
            </div>
            <div className="post-wrapper">
                <form className="post-form" onSubmit={handleSubmit(onSubmitPost)}>
                    <div className="post-form_group">
                        <input
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
                    <Editor
                        placeholder="Nội dung..."
                        onEditorStateChange={onChangeEditor}
                        wrapperClassName="post-editor"
                    />
                    <div className="post-form_group">
                        <input
                            {...register("tags", { required: true })}
                            type="text"
                            placeholder="Tags..." />
                    </div>
                    <button className="post-form_btn">
                        {spn ? <Spinners /> : ""}
                        Tạo bài viết
                    </button>
                </form>
            </div>
        </div>
    )
}