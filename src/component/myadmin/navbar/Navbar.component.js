import styled from 'styled-components';
import { useMatch } from 'react-router-dom';
import { useCustomRouterHook } from '../../../hooks/router/useCustomRouterHook';

const Container = styled.div`
    padding: 10px;
`;

const Wrapper = styled.div`
    display: flex;

    .nav-active{
        color:#b39283 !important;
        font-weight: 700;
    }
`;

const NavItem = styled.div`
    user-select: none;
    display: flex;
    justify-content: center;
    align-items: center;
    width:100px;
    height: 34px;
    text-align: center;
    color: #505050;
    font-weight: 500;

    cursor: pointer;

    &:hover{
        color: #303030;
    }
`;

export default function NavbarComponent(props) {
    const customRouter = useCustomRouterHook();
    const rentalManageRouterMatcher = useMatch('/myadmin/rental-manage/:status');

    const __handle = {
        action: {
            route: (pathname) => {
                customRouter.push({
                    pathname: pathname,
                    replace: true
                })
            }
        }
    }
    return (
        <>
            <Container>
                <Wrapper>
                    <NavItem
                        className={`${customRouter.pathname === '/myadmin' ? 'nav-active' : ''}`}
                        onClick={() => __handle.action.route('/myadmin')}
                    >
                        홈
                    </NavItem>
                    <NavItem
                        className={`${customRouter.pathname === '/myadmin/products' ? 'nav-active' : ''}`}
                        onClick={() => __handle.action.route('/myadmin/products')}
                    >
                        제품관리
                    </NavItem>
                    <NavItem
                        className={`${rentalManageRouterMatcher ? 'nav-active' : ''}`}
                        onClick={() => __handle.action.route('/myadmin/rental-manage/new-order')}
                    >
                        대여관리
                    </NavItem>
                </Wrapper>
            </Container>
        </>
    );
}