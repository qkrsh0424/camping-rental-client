import styled from 'styled-components';
import { useCustomRouterHook } from '../../../hooks/router/useCustomRouterHook';

const Container = styled.div`
    max-width: 1280px;
    margin-left: auto;
    margin-right: auto;
    /* margin-bottom: 200px; */
`;

const NavWrapper = styled.div`
    display:flex;
    justify-content: space-around;
    .nav-item{
        flex:1;
        padding:10px 0;
        border-bottom: 3px solid #00000000;

        font-size: 18px;
        font-weight: 500;
        text-align: center;
        cursor:pointer;

        &:hover{
            border-bottom: 3px solid #e0e0e0;
        }
    }

    .active{
        border-bottom: 3px solid #b39283 !important;
    }
`;

export default function SideNavFieldComponent(props) {
    const customRouter = useCustomRouterHook();

    const __handle = {
        action: {
            routeToViewType: (viewType) => {
                let query = {
                    ...customRouter.query,
                    viewType: viewType
                };
                customRouter.push({
                    pathname: '/room',
                    query: query,
                    replace: true
                })
            }
        }
    }
    return (
        <>
            <Container>
                <NavWrapper>
                    <div
                        className={`nav-item ${customRouter.query.viewType === 'product' ? 'active' : ''}`}
                        onClick={() => __handle.action.routeToViewType('product')}
                    >제품</div>
                    <div className='nav-item' onClick={() => __handle.action.routeToViewType('')}>후기</div>
                    <div className='nav-item' onClick={() => __handle.action.routeToViewType('')}>문의</div>
                </NavWrapper>
            </Container>
        </>
    );
}