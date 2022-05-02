import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import qs from 'query-string';
import styled from 'styled-components';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

const Container = styled.div`
    padding: 20px 30px;

    @media all and (max-width:992px) {
        padding: 20px 10px;
    }
`;

const Wrapper = styled.div`
    .flex-box{
        display: flex;
        justify-content: end;
    }

    .selector-box{
        width: 400px;
    }

    .btn-active{
        background: #00B8BA !important;
        border: 1px solid #00B8BA;
        color: white;
    }

    @media all and (max-width:992px){
        .selector-box{
            width: 100%;
        }
    }
`;

const CategoryListComponent = (props) => {
    const navigate = useNavigate();
    const location = useLocation();
    const query = qs.parse(location.search);

    const _onCategoryRoute = (e) => {
        query.categoryId = e.target.value;
        if (e.target.value === 'all') {
            navigate(location.pathname, {
                replace: true
            });
            return;
        }
        let url = qs.stringifyUrl({
            url: location.pathname,
            query: { ...query }
        })
        navigate(url, {
            replace: true
        })
    }
    return (
        <>
            <Container>
                <Wrapper>
                    <div className='flex-box'>
                        <div className='selector-box'>
                            <FormControl fullWidth>
                                <InputLabel id="demo-simple-select-label">분류</InputLabel>
                                <Select
                                    value={query.categoryId || 'all'}
                                    label="분류"
                                    onChange={(e) => _onCategoryRoute(e)}
                                >
                                    <MenuItem value={'all'}>전체</MenuItem>
                                    {props.categoryListState?.map(r => {
                                        return (
                                            <MenuItem key={r.id} value={r.id}>{r.name}</MenuItem>
                                        );
                                    })}
                                </Select>
                            </FormControl>
                        </div>
                    </div>
                </Wrapper>
            </Container>
        </>
    );
}
export default CategoryListComponent;