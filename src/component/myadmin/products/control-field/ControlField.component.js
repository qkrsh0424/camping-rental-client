import { useEffect, useReducer, useState, useRef } from 'react';
import styled from 'styled-components';
import { numberFormatHandler } from '../../../../utils/numberFormatHandler';
import valueUtils from '../../../../utils/valueUtils';
import SingleBlockButton from '../../../module/button/SingleBlockButton';
import CommonModalComponent from '../../../module/modal/CommonModalComponent';
import CustomSelect from '../../../module/select/CustomSelect';
import { useImageFileUploaderHook } from '../../../module/uploader/useImageFileUploaderHook';

const Container = styled.div`
    margin-top: 20px;
    max-width: 1280px;
    margin-left: auto;
    margin-right: auto;

    @media all and (max-width:992px){
        padding: 0 10px;
    }

    .add-button-item{
        margin: 0;
        width: 100px;
        border: none;
        background: #b39283;
        font-size: 14px;
        font-weight: 600;
        color: white;
        cursor: pointer;
    }
`;

const AddProductModalWrapper = styled.div`
    padding:10px;

    .input-box{
        padding:20px 10px;
    }

    .input-label{
        font-size: 14px;
        font-weight: 500;

        @media all and (max-width:992px){
            font-size: 12px;
        }
    }

    .input-item{
        box-sizing: border-box;
        width:100%;
        padding:10px;
        border:none;
        border-bottom: 1px solid #e0e0e0;
        margin-top: 5px;
        font-size: 14px;

        @media all and (max-width:992px){
            font-size: 12px;
        }
        
        &:focus{
            outline:none;
            border-bottom: 1px solid #2c73d2;
        }

        &:read-only{
            cursor: pointer;
        }
    }

    .textarea-item{
        box-sizing: border-box;
        margin-top: 5px;
        padding:10px;
        width:100%;
        height: 200px;
        resize:none;
        font-size: 14px;
        border:none;
        border-bottom:1px solid #e0e0e0;

        @media all and (max-width:992px){
            font-size: 12px;
        }

        &:focus{
            outline:none;
            border: 1px solid #2c73d2;
        }

        &:read-only{
            cursor: pointer;
        }
    }

    .text-length-label{
        font-size: 12px;
        color:#505050;
    }

    .image-list-wrapper{
        margin-top: 5px;
        display: flex;
        flex-wrap: wrap;
    }

    .image-add-button-item{
        position: relative;
        overflow: hidden;
        width:80px;
        height: 80px;
        background: white;
        border:1px solid #e0e0e0;
        cursor: pointer;
    }

    .image-add-button-icon{
        width: 50px;
        height: 50px;
        position: absolute;
        top:50%;
        left:50%;
        transform: translate(-50%, -50%);
    }

    .image-box{
        position: relative;
        overflow: hidden;
        width:80px;
        height: 80px;
        background: white;
        border:1px solid #e0e0e0;
        box-sizing: border-box;
        margin-right: 5px;
        margin-bottom: 5px;
    }

    .image-box:hover>.image-item{
        -webkit-filter: grayscale(50%) blur(1px);
	    filter: grayscale(50%) blur(1px);
    }

    .image-box:hover>.image-delete-button{
        display: block;
    }

    .image-item{
        width:100%;
        height: 100%;
        object-fit: cover;
    }

    .image-delete-button{
        display: none;
        position:absolute;
        padding:0;
        margin:0;
        box-sizing: border-box;
        top:50%;
        left:50%;
        transform: translate(-50%, -50%);
        width:25px;
        height: 25px;
        border:1px solid #e56767;
        border-radius: 50%;
        background:white;
        cursor: pointer;
    }

    .image-delete-button-icon{
        position:absolute;
        top:50%;
        left:50%;
        transform: translate(-50%, -50%);
        width:25px;
        height: 25px;
    }

    .button-box{
        display: flex;
        margin-top: 20px;
    }

    .button-item{
        border:none;
        margin: 0;
        font-size: 14px;
    }
`;

export default function ControlFieldComponent(props) {
    const [addProductModalOpen, setAddProductModalOpen] = useState(false);

    const __product = {
        action: {
            openAddProductModal: () => {
                setAddProductModalOpen(true);
            },
            closeAddProductModal: () => {
                setAddProductModalOpen(false);
            }
        },
        submit: {
            add: (product) => {
                props.onSubmitAddProduct(product);
                __product.action.closeAddProductModal();
            }
        }
    }

    return (
        <>
            <Container>
                <SingleBlockButton
                    type='button'
                    className='add-button-item'
                    onClick={__product.action.openAddProductModal}
                >
                    제품 추가
                </SingleBlockButton>
            </Container>

            <CommonModalComponent
                open={addProductModalOpen}
                onClose={__product.action.closeAddProductModal}
                maxWidth={'sm'}
            >
                <AddProductModal
                    allCategories={props.allCategories}
                    onSubmitAdd={__product.submit.add}
                />
            </CommonModalComponent>
        </>
    );
}

function AddProductModal({
    allCategories,
    onSubmitAdd
}) {
    const { __reqUploadImageFile } = useImageFileUploaderHook();
    const fileUploaderRef = useRef();
    const [product, dispatchProduct] = useReducer(productReducer, initialProduct);

    const __product = {
        action: {
            openFileUploader: (e) => {
                if (product.images.length >= 10) {
                    alert('이미지는 최대 10개 까지 등록 가능합니다.');
                    return;
                }
                fileUploaderRef.current.click();
            },
            deleteImage: (imageId) => {
                let newImages = [...product.images.filter(r => r.id !== imageId)];

                dispatchProduct({
                    type: 'SET_DATA',
                    payload: {
                        ...product,
                        images: newImages
                    }
                })
            }
        },
        change: {
            valueOfName: (e) => {
                let name = e.target.name;
                let value = e.target.value;

                dispatchProduct({
                    type: 'SET_DATA',
                    payload: {
                        ...product,
                        [name]: value
                    }
                })
            },
            price: (e) => {
                let value = e.target.value;

                if (!numberFormatHandler().checkNumberWithCommasOnlyFormat(value)) {
                    return;
                }

                value = value.replace(/,/g, '');

                dispatchProduct({
                    type: 'SET_DATA',
                    payload: {
                        ...product,
                        price: value
                    }
                })
            },
            discountRate: (e) => {
                let value = e.target.value;

                if (!numberFormatHandler().checkNumberOnlyFormat(value) || value < 0 || value > 100) {
                    return;
                }

                dispatchProduct({
                    type: 'SET_DATA',
                    payload: {
                        ...product,
                        discountRate: value
                    }
                })
            },
            pushImage: async (e) => {
                e.preventDefault();

                if (product.images.length >= 10) {
                    alert('이미지는 최대 10개 까지 등록 가능합니다.');
                    return;
                }

                // 파일을 선택하지 않은 경우
                if (e.target.files.length <= 0) return;

                let imageInfos = await __reqUploadImageFile(e);

                let images = [...product.images];
                images = images.concat(imageInfos.map(r => {
                    return {
                        ...r,
                        productId: null
                    }
                }));

                dispatchProduct({
                    type: 'SET_DATA',
                    payload: {
                        ...product,
                        images: images
                    }
                })
            }
        },
        submit: {
            confirm: (e) => {
                e.preventDefault();
                if (product.images.length <= 0 || product.images.length > 10) {
                    alert('이미지는 1개 이상 10개 이하로 등록할 수 있습니다.');
                    return;
                }

                if (!product.name) {
                    alert('제품명은 필수 입력입니다.')
                    return;
                }

                if (!product.productCategoryId) {
                    alert('카테고리는 필수 선택입니다.')
                    return;
                }

                if (product.price < 0 || product.price > 1000000000) {
                    alert('가격을 정확하게 입력해주세요.');
                    return;
                }

                if (product.discountRate < 0 || product.discountRate > 100) {
                    alert('연박 할인을 정확하게 입력해 주세요.');
                    return;
                }

                let body = {
                    ...product,
                    price: valueUtils.isEmptyNumbers(parseInt(product.price)) ? 0 : parseInt(product.price),
                    discountRate: valueUtils.isEmptyNumbers(parseInt(product.discountRate)) ? 0 : parseInt(product.discountRate)
                }

                onSubmitAdd(body);
            }
        }
    }

    return (
        <>
            <AddProductModalWrapper>
                <form onSubmit={__product.submit.confirm}>
                    <div
                        className='input-box'
                        style={{
                            borderBottom: '1px solid #e0e0e0'
                        }}
                    >
                        <div className='input-label'>이미지({product.images.length} / 10)</div>
                        <div className='image-list-wrapper'>
                            {product.images.map(r => {
                                return (
                                    <div key={r.id} className='image-box'>
                                        <img
                                            className='image-item'
                                            src={r.fileFullUri}
                                            alt="file"
                                        ></img>
                                        <button
                                            type='button'
                                            className='image-delete-button'
                                            onClick={() => __product.action.deleteImage(r.id)}
                                        >
                                            <img
                                                className='image-delete-button-icon'
                                                src='/assets/icon/remove_default_red.svg'
                                                alt='delete icon'
                                            ></img>
                                        </button>
                                    </div>
                                );
                            })}
                            <button
                                type='button'
                                className='image-add-button-item'
                                onClick={__product.action.openFileUploader}
                            >
                                <img
                                    className='image-add-button-icon'
                                    src='/assets/icon/add_default_gray.svg'
                                    alt={'add default'}
                                ></img>
                            </button>
                        </div>
                        <input
                            ref={fileUploaderRef}
                            type="file"
                            accept="image/*"
                            multiple
                            style={{ display: 'none' }}
                            onClick={(e) => e.target.value = ''}
                            onChange={(e) => __product.change.pushImage(e)}
                        />
                    </div>
                    <div className='input-box'>
                        <div className='input-label'>제품명</div>
                        <input
                            type='text'
                            className='input-item'
                            name='name'
                            value={product.name || ''}
                            onChange={__product.change.valueOfName}
                            required
                        ></input>
                    </div>
                    <div className='input-box'>
                        <CustomSelect
                            style={{
                                margin: 0
                            }}
                            name='productCategoryId'
                            value={product.productCategoryId || ''}
                            onChange={__product.change.valueOfName}
                            required
                        >
                            <option value=''>카테고리 선택</option>
                            {allCategories?.map(r => {
                                return (
                                    <option key={r.id} value={r.id}>{r.name}</option>
                                )
                            })}
                        </CustomSelect>
                    </div>
                    <div className='input-box'>
                        <div className='input-label'>가격(원)</div>
                        <input
                            type='text'
                            className='input-item'
                            name='price'
                            value={numberFormatHandler().numberWithCommas(product.price) || ''}
                            onChange={__product.change.price}
                        ></input>
                    </div>
                    <div className='input-box'>
                        <div className='input-label'>연박 할인(%)</div>
                        <input
                            type='text'
                            className='input-item'
                            name='discountRate'
                            value={product.discountRate || ''}
                            max={100}
                            min={0}
                            onChange={__product.change.discountRate}
                        ></input>
                    </div>
                    <div className='input-box'>
                        <div className='input-label'>설명</div>
                        <textarea
                            className='textarea-item'
                            name='description'
                            value={product.description || ''}
                            onChange={__product.change.valueOfName}
                        ></textarea>
                    </div>
                    <div className='input-box'>
                        <SingleBlockButton
                            type='submit'
                            style={{
                                margin: 0,
                                background: '#000000',
                                color: 'white',
                                border: 'none'
                            }}
                        >
                            추가
                        </SingleBlockButton>
                    </div>
                </form>
            </AddProductModalWrapper>
        </>
    );
}

const initialProduct = {
    name: '',
    description: '',
    price: '',
    discountRate: '',
    productCategoryId: '',
    images: [] // {id, fileOriginName, fileStorageUri, fileFullUri, serviceUrl, filePath, fileExtension, madeAt, size}
}

const productReducer = (state, action) => {
    switch (action.type) {
        case 'SET_DATA':
            return action.payload;
        case 'CLEAR':
            return initialProduct;
        default: return initialProduct;
    }
}