import React from 'react';
import ImageUploading from 'react-images-uploading';
import { toast } from 'react-toastify';
function Upload(props) {
    const [images, setImages] = React.useState([]);
    const { onSubmitImage, rsForm } = props;
    const maxNumber = 4;
    const onChange = (imageList, addUpdateIndex) => {
        const files = [];
        for (const file of imageList) {
            files.push(file.file);
        }
        onSubmitImage(files);
        setImages(imageList);
    };
    React.useEffect(() => {
        if (rsForm) {
            setImages([]);
        }
    }, [rsForm, images])
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
    return (
        <div>
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
                    onImageRemoveAll,
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
                                    <img src={image.data_url} alt="" width="100" />
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
    );
}

export default Upload;