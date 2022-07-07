import styled from 'styled-components';
import { useCustomRouterHook } from '../../../hooks/router/useCustomRouterHook';
import CustomSelect from '../../module/select/CustomSelect';

const Container = styled.div`
    margin-top: 20px;
    max-width: 1280px;
    margin-left: auto;
    margin-right: auto;

    @media all and (max-width:992px){
        padding: 0 10px;
    }
`;

const Wrapper = styled.div`
    display: flex;
    justify-content: flex-end;
`;

export default function CategoryFieldComponent(props) {
    const customRouter = useCustomRouterHook();

    const __handle = {
        action: {
            changeRoute: (e) => {
                let value = e.target.value;
                delete customRouter.query.page;

                if (!value) {
                    delete customRouter.query.categoryId;    

                    customRouter.push({
                        pathname: customRouter.pathname,
                        query: {
                            ...customRouter.query
                        },
                        replace: true
                    });
                    return;
                }

                customRouter.push({
                    pathname: customRouter.pathname,
                    query: {
                        ...customRouter.query,
                        categoryId: value
                    },
                    replace: true
                })
            }
        }
    }

    return (
        <>
            <Container>
                <Wrapper>
                    <CustomSelect
                        width={'300px'}
                        style={{
                            margin: 0,
                            cursor: 'pointer'
                        }}
                        value={customRouter.query.categoryId || ''}
                        onChange={__handle.action.changeRoute}
                    >
                        <option value=''>카테고리 전체</option>
                        {props.categories.map(r => {
                            return (
                                <option
                                    key={r.id}
                                    value={r.id}
                                >
                                    {r.name}
                                </option>
                            );
                        })}
                    </CustomSelect>
                </Wrapper>
            </Container>
        </>
    );
}