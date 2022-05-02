import { Checkbox, FormControl, FormControlLabel, InputLabel, MenuItem, Select } from '@mui/material';
import styled from 'styled-components';
import { useEffect, useReducer, useRef } from 'react';

const Container = styled.div`
    padding: 30px;

    @media all and (max-width:992px){
        padding: 30px 10px;
    }
`;

const CategorySelectorWrapper = styled.div`
    /* border: 1px solid red; */
    margin-top: 20px;
    .selector-box{
        width: 400px;
    }

    @media all and (max-width:992px){
        .selector-box{
            width: 100%;
        }   
    }
`;

const RentalRegionSelectorWrapper = styled.div`
    margin-top: 20px;
    padding: 10px;
    border:1px solid #e1e1e1;
    border-radius: 5px;

    .title{
        font-size: 16px;
        font-weight: 600;
    }
`;

const ReturnRegionSelectorWrapper = styled.div`
    margin-top: 20px;
    padding: 10px;
    border:1px solid #e1e1e1;
    border-radius: 5px;

    .title{
        font-size: 16px;
        font-weight: 600;
    }
`;

const InputBox = styled.div`
    margin-top: 20px;
    .input-label{
        margin-bottom: 5px;
        font-size: 14px;
        color: #555;
    }

    .input-el{
        box-sizing: border-box;
        width:100%;
        padding: 10px;
        font-size: 16px;
    }
`;

const ThumbnailWrapper = styled.div`
    & .input-group{
        padding: 0 15px;
    }

    @media only screen and (max-width:992px){
        & .input-group{
            padding: 0;
        }
    }
`;

const ImageWrapper = styled.div`
    margin-top:20px;
    width:25%;

   .image-figure{
        position: relative;
        padding-bottom: 100%; // 1:1
   }

   .image-el{
        position: absolute;
        object-fit: cover;
        width: 100%;
        height: 100%;
        transition: .5s;
        border:1px solid #f1f1f1;
        border-radius: 8px;
        cursor: pointer;
   }

   @media only screen and (max-width:992px){
        width:35%;
   }
    @media only screen and (max-width:425px){
        width:50%;
    }
`;

const ButtonBox = styled.div`
    margin-top: 20px;
    .submit-btn{
        width: 100%;
        padding: 10px;

        background: white;
        border: 1px solid #ced4da;
        border-radius: 5px;

        font-size: 16px;
        font-weight: 600;

        cursor: pointer;

        &:hover{
            background: #e1e1e160;
        }
    }
`;

const initialWriteValueState = null
const initialPasswordState = null;

const writeValueStateReducer = (state, action) => {
    switch (action.type) {
        case 'INIT_DATA':
            return action.payload;
        case 'SET_DATA':
            return {
                ...state,
                [action.payload.name]: action.payload.value
            }
        case 'SET_THUMBNAIL':
            return {
                ...state,
                thumbnailOriginName: action.payload.thumbnailOriginName,
                thumbnailName: action.payload.thumbnailName,
                thumbnailFullUri: action.payload.thumbnailFullUri,
                thumbnailPath: action.payload.thumbnailPath
            }
        default: return { ...state }
    }
}

const passwordStateReducer = (state, action) => {
    switch (action.type) {
        case 'SET_DATA':
            return action.payload;
        default: return null
    }
}

const BodyComponent = (props) => {
    const fileUploaderRef = useRef();
    const [writeValueState, dispatchWriteValueState] = useReducer(writeValueStateReducer, initialWriteValueState);
    const [passwordState, dispatchPasswordState] = useReducer(passwordStateReducer, initialPasswordState);

    useEffect(() => {
        if (!props.itemState) {
            return;
        }

        dispatchWriteValueState({
            type: 'INIT_DATA',
            payload: props.itemState
        })
    }, [props.itemState]);

    useEffect(() => {
        if (!props.uploadedFileState) {
            return;
        }

        dispatchWriteValueState({
            type: 'SET_THUMBNAIL',
            payload: {
                thumbnailOriginName: props.uploadedFileState[0].fileOriginName,
                thumbnailName: props.uploadedFileState[0].fileName,
                thumbnailFullUri: props.uploadedFileState[0].fileFullUri,
                thumbnailPath: props.uploadedFileState[0].filePath,
            }
        });

        props._onClearUploadedFileState();
    }, [props.uploadedFileState]);

    const _onSelectCategory = (e) => {
        let categoryId = e.target.value;
        let categoryState = props.categoryListState.filter(r => r.id === categoryId)[0];
        let categoryName = categoryState.name;

        dispatchWriteValueState({
            type: 'SET_DATA',
            payload: {
                name: 'categoryId',
                value: categoryId
            }
        });

        dispatchWriteValueState({
            type: 'SET_DATA',
            payload: {
                name: 'categoryName',
                value: categoryName
            }
        });
    }

    const _onChangeWriteValueState = (e) => {
        dispatchWriteValueState({
            type: 'SET_DATA',
            payload: {
                name: e.target.name,
                value: e.target.value
            }
        })
    }

    const _onChangePasswordState = (e) => {
        dispatchPasswordState({
            type: 'SET_DATA',
            payload: e.target.value
        })
    }

    const _onFileUploaderOpen = () => {
        fileUploaderRef.current.click();
    }

    const _onFileUpload = (e) => {
        if (e.target.files.length <= 0) return;

        const formData = new FormData();

        formData.append('files', e.target.files[0]);
        formData.append('password', passwordState);

        props._onFileUpload(formData);
    }

    const _onSubmit = () => {
        if (!passwordState) {
            alert('접근번호를 입력해주세요.');
            return;
        }

        if (!writeValueState.categoryId || !writeValueState.categoryName) {
            alert('분류를 선택해 주세요.');
            return;
        }

        if (!writeValueState.name) {
            alert('제품명을 입력해 주세요.');
            return;
        }

        if (!writeValueState.price || writeValueState.price === 0) {
            alert('1박당 가격을 정확히 입력해 주세요.');
            return;
        }

        if (!writeValueState.discountRate) {
            alert('연박시 할인율을 정확히 입력해 주세요.');
            return;
        }

        if (!writeValueState.thumbnailFullUri || !writeValueState.thumbnailName || !writeValueState.thumbnailOriginName || !writeValueState.thumbnailPath) {
            alert('썸네일을 등록해 주세요.');
            return;
        }

        if (!writeValueState.rentalRegions) {
            alert('대여 가능 장소는 최소 1개 선택 입니다.');
            return;
        }

        if (!writeValueState.returnRegions) {
            alert('반납 가능 장소는 최소 1개 선택 입니다.');
            return;
        }

        let params = {
            itemDto: {
                ...writeValueState
            },
            password: passwordState
        }

        props._onSubmit(params)
    }

    const _onChangeRentalRegionListState = (name) => {
        let selectedRentalRetions = writeValueState.rentalRegions.length > 0 ? writeValueState.rentalRegions.split(',') : [];

        if (_isCheckedRentalRegion(name)) {
            selectedRentalRetions = selectedRentalRetions.filter(r => r !== name);
        } else {
            selectedRentalRetions.push(name);
        }

        dispatchWriteValueState({
            type: 'SET_DATA',
            payload: {
                name: 'rentalRegions',
                value: selectedRentalRetions.map(r => r).join()
            }
        })
    }

    const _isCheckedRentalRegion = (name) => {
        return writeValueState?.rentalRegions?.split(',').includes(name);
    }

    const _onChangeReturnRegionListState = (name) => {
        let selectedReturnRetions = writeValueState.returnRegions.length > 0 ? writeValueState.returnRegions.split(',') : [];

        if (_isCheckedReturnRegion(name)) {
            selectedReturnRetions = selectedReturnRetions.filter(r => r !== name);
        } else {
            selectedReturnRetions.push(name);
        }

        dispatchWriteValueState({
            type: 'SET_DATA',
            payload: {
                name: 'returnRegions',
                value: selectedReturnRetions.map(r => r).join()
            }
        })
    }

    const _isCheckedReturnRegion = (name) => {
        return writeValueState?.returnRegions?.split(',').includes(name)
    }

    return (
        <>
            {writeValueState &&
                <Container>
                    <InputBox>
                        <div className='input-label'>접근번호</div>
                        <input type='password' className='input-el' value={passwordState || ''} onChange={(e) => _onChangePasswordState(e)}></input>
                    </InputBox>
                    <CategorySelectorWrapper>
                        <div className='selector-box'>
                            <FormControl fullWidth>
                                <InputLabel id="demo-simple-select-label">분류</InputLabel>
                                <Select
                                    value={writeValueState?.categoryId || ''}
                                    label="분류"
                                    onChange={(e) => _onSelectCategory(e)}
                                >
                                    {props.categoryListState?.map(r => {
                                        return (
                                            <MenuItem key={r.id} value={r.id}>{r.name}</MenuItem>
                                        );
                                    })}
                                </Select>
                            </FormControl>
                        </div>
                    </CategorySelectorWrapper>
                    <InputBox>
                        <div className='input-label'>제품명</div>
                        <input type='text' className='input-el' name='name' value={writeValueState.name || ''} onChange={(e) => _onChangeWriteValueState(e)}></input>
                    </InputBox>
                    <InputBox>
                        <div className='input-label'>설명</div>
                        <input type='text' className='input-el' name='description' value={writeValueState.description || ''} onChange={(e) => _onChangeWriteValueState(e)}></input>
                    </InputBox>
                    <InputBox>
                        <div className='input-label'>1박당 가격(원)</div>
                        <input type='number' className='input-el' name='price' value={writeValueState.price || ''} onChange={(e) => _onChangeWriteValueState(e)}></input>
                    </InputBox>
                    <InputBox>
                        <div className='input-label'>연박시 할인율(%)</div>
                        <input type='number' className='input-el' name='discountRate' value={writeValueState.discountRate || ''} onChange={(e) => _onChangeWriteValueState(e)}></input>
                    </InputBox>
                    <ThumbnailWrapper>
                        <input
                            ref={fileUploaderRef}
                            type="file"
                            accept="image/*"
                            style={{ display: 'none' }}
                            onClick={(e) => e.target.value = ''}
                            onChange={(e) => _onFileUpload(e)}
                        />
                        <ImageWrapper>
                            <div className='image-figure'>
                                {(writeValueState.thumbnailFullUri) &&
                                    <img name='imageFile' className='image-el' src={writeValueState?.thumbnailFullUri} title={writeValueState?.thumbnailOriginName} alt={writeValueState?.thumbnailOriginName} onClick={() => _onFileUploaderOpen()} />
                                }
                                {(!writeValueState.thumbnailFullUri) &&
                                    <img name='imageFile' className='image-el' src='/assets/images/no-image.jpg' title='no image' alt='nothing' onClick={() => _onFileUploaderOpen()} />
                                }
                            </div>
                        </ImageWrapper>

                    </ThumbnailWrapper>
                    <RentalRegionSelectorWrapper>
                        <div className='title'>대여 가능 장소 선택</div>
                        {props.handlingAreaListState?.map(handlingArea => {
                            return (
                                <FormControlLabel
                                    key={handlingArea.id}
                                    control={
                                        <Checkbox
                                            checked={_isCheckedRentalRegion(handlingArea.name)}
                                            onChange={() => _onChangeRentalRegionListState(handlingArea.name)}
                                        />
                                    }
                                    label={handlingArea.name}
                                />
                            );
                        })}
                    </RentalRegionSelectorWrapper>
                    <ReturnRegionSelectorWrapper>
                        <div className='title'>반납 가능 장소 선택</div>
                        {props.handlingAreaListState?.map(handlingArea => {
                            return (
                                <FormControlLabel
                                    key={handlingArea.id}
                                    control={
                                        <Checkbox
                                            checked={_isCheckedReturnRegion(handlingArea.name)}
                                            onChange={() => _onChangeReturnRegionListState(handlingArea.name)}
                                        />
                                    }
                                    label={handlingArea.name}
                                />
                            );
                        })}
                    </ReturnRegionSelectorWrapper>
                    <ButtonBox>
                        <button type='button' className='submit-btn' onClick={() => _onSubmit()}>상품 등록</button>
                    </ButtonBox>
                </Container>
            }

        </>
    );
}
export default BodyComponent;