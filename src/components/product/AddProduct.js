import React, { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { Editor } from 'react-draft-wysiwyg'
import { EditorState, convertToRaw } from 'draft-js'
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css'
import draftToHtml from 'draftjs-to-html'
import '../../css/custom.css'
import Upload from '../Upload'
import Spinners from '../Spinners'

function AddProduct(props) {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset
  } = useForm()
  const [editorState, setEditorState] = useState(() =>
    EditorState.createEmpty()
  )
  const [description, setDescription] = useState('')
  const {
    loadingBtn,
    handleCloseModal,
    handleAddProduct,
    rsForm,
    handleRsForm,
    types,
    nxb
  } = props
  const [files, setFiles] = useState(null)
  const currentYear = new Date().getFullYear()

  useEffect(() => {
    if (rsForm) {
      reset({
        title: '',
        author: '',
        description: '',
        price: '',
        publicYear: '',
        inStock: ''
      })
      handleRsForm(false)
    }
  }, [rsForm])
  const handleClose = () => {
    handleCloseModal()
  }
  const onSubmit = (data) => {
    if (files !== null) {
      if (data.types === '') data.types = types[0]
      if (data.publicCompany === '') data.publicCompany = nxb[0]
      data.description = description
      Number(data.sale)
      handleAddProduct(data, files)
      setEditorState(() => {
        EditorState.createEmpty()
      })
    }
  }
  const onSubmitImage = (files) => {
    setFiles(files)
  }
  const onChangeDes = (editorState) => {
    setEditorState(editorState)
    setDescription(draftToHtml(convertToRaw(editorState.getCurrentContent())))
  }
  return (
    <div className='container'>
      <div className='tm-bg-primary-dark tm-block tm-block-h-auto'>
        <div className='row'>
          <span className='close-modal' onClick={handleClose}>
            <i className='fas fa-times'></i>
          </span>
          <div className='col-12'>
            <h2 className='tm-block-title d-inline-block'>Thêm sản phẩm</h2>
          </div>
        </div>
        <div className='row tm-edit-product-row'>
          <div className='col-xl-12 col-lg-12 col-md-12'>
            <form
              onSubmit={handleSubmit(onSubmit)}
              className='tm-edit-product-form'
            >
              <div className='row'>
                <div className='col-xl-6'>
                  <div className='form-group mb-3'>
                    <label>Tên Sách</label>
                    <input
                      id='name'
                      {...register('title', { required: true })}
                      type='text'
                      className='form-control'
                    />
                    {errors.title && (
                      <span style={{ color: 'red' }}>
                        Vui lòng nhập tên sách
                      </span>
                    )}
                  </div>
                  <div className='form-group mb-3'>
                    <label>Tên Tác Giả</label>
                    <input
                      id='name'
                      type='text'
                      className='form-control'
                      {...register('author', { required: true })}
                    />
                    {errors.author && (
                      <span style={{ color: 'red' }}>
                        Vui lòng nhập tên tác giả
                      </span>
                    )}
                  </div>
                  <div className='form-group mb-3 h-300'>
                    <label>Giới thiệu</label>
                    <Editor
                      editorState={editorState}
                      onEditorStateChange={onChangeDes}
                      editorClassName='editorClassName'
                    />
                  </div>
                  <div className='form-group mb-3'>
                    <label>Thể loại</label>
                    <select
                      {...register('types')}
                      className='custom-select'
                      defaultValue={types[0]?._id}
                    >
                      {types.map((type) => {
                        return (
                          <option key={type._id} value={type._id}>
                            {type.name}
                          </option>
                        )
                      })}
                    </select>
                  </div>
                  <div className='form-group mb-3'>
                    <label>Nhà xuất bản</label>
                    <select
                      {...register('publicCompany')}
                      className='custom-select'
                      defaultValue={nxb[0]?._id}
                    >
                      {nxb.map((n) => {
                        return (
                          <option key={n._id} value={n._id}>
                            {n.name}
                          </option>
                        )
                      })}
                    </select>
                  </div>
                </div>
                <div className='col-xl-6'>
                  <div className='row'>
                    <div className='form-group mb-3 col-xs-12 col-sm-6'>
                      <label>Số trang</label>
                      <input
                        id='expire_date'
                        type='number'
                        className='form-control'
                        {...register('pages', { 
                          required: true, 
                          min: 1, 
                          pattern: {
                            value: /^[1-9]\d*$/,
                            message: 'Vui lòng nhập số nguyên dương'
                          }
                        })}
                      />
                      {errors.pages && (
                        <span style={{ color: 'red' }}>
                          {errors.pages.message || 'Vui lòng nhập số nguyên dương'}
                        </span>
                      )}
                    </div>
                    <div className='form-group mb-3 col-xs-12 col-sm-6'>
                      <label>Năm xuất bản</label>
                      <input
                        id='expire_date'
                        type='number'
                        className='form-control'
                        {...register('publicYear', { 
                          required: true, 
                          min: 0,
                          max: currentYear,
                          pattern: {
                            value: /^\d{4}$/,
                            message: 'Vui lòng nhập năm hợp lệ'
                          }
                        })}
                      />
                      {errors.publicYear && (
                        <span style={{ color: 'red' }}>
                          {errors.publicYear.message || 'Vui lòng nhập năm xuất bản không lớn hơn năm hiện tại'}
                        </span>
                      )}
                    </div>
                    <div className='form-group mb-3 col-xs-12 col-sm-6'>
                      <label>Số lượng</label>
                      <input
                        id='stock'
                        type='number'
                        className='form-control'
                        {...register('inStock', { 
                          required: true, 
                          min: 1, 
                          pattern: {
                            value: /^[1-9]\d*$/,
                            message: 'Vui lòng nhập số nguyên dương'
                          }
                        })}
                      />
                      {errors.inStock && (
                        <span style={{ color: 'red' }}>
                          {errors.inStock.message || 'Vui lòng nhập số lượng'}
                        </span>
                      )}
                    </div>
                    <div className='form-group mb-3 col-xs-12 col-sm-6'>
                      <label>Giá</label>
                      <input
                        id='expire_date'
                        type='number'
                        className='form-control'
                        {...register('price', { min: 0, required: true })}
                      />
                      {errors.price && (
                        <span style={{ color: 'red' }}>
                          Vui lòng nhập giá sản phẩm không âm
                        </span>
                      )}
                    </div>
                  </div>
                  <div className='form-group mb-3'>
                    <label>Giảm giá (không bắt buộc) (%)</label>
                    <input
                      id='sale'
                      type='text'
                      className='form-control'
                      {...register('sale')}
                    />
                  </div>
                  <div className='row'>
                    <h5 className='text-center d-block pl-1 px-3'>Hình ảnh</h5>
                    <Upload rsForm={rsForm} onSubmitImage={onSubmitImage} />
                    
                  </div>
                </div>
              </div>
              <button
                type='submit'
                className='btn btn-primary btn-block text-uppercase'
              >
                {loadingBtn ? <Spinners /> : ''}
                Thêm sản phẩm
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}

export default AddProduct
