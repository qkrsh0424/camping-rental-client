import styled from 'styled-components';
import { useCustomRouterHook } from '../../../hooks/router/useCustomRouterHook';

const Container = styled.div`
    padding: 10px;
`;

const Wrapper = styled.div`
    display: flex;
`;

const NavItem = styled.div`
    user-select: none;
    display: flex;
    justify-content: center;
    align-items: center;
    width:100px;
    height: 34px;
    text-align: center;

    cursor: pointer;

    &:hover{
        background-color: #f0f0f0;
    }
`;

export default function NavbarComponent(props) {
    const customRouter = useCustomRouterHook();

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
                        style={{
                            backgroundColor: customRouter.pathname === '/myadmin' ? 'black' : '',
                            color: customRouter.pathname === '/myadmin' ? 'white' : '',
                            fontWeight: customRouter.pathname === '/myadmin' ? '600' : '',
                        }}
                        onClick={() => __handle.action.route('/myadmin')}
                    >
                        홈
                    </NavItem>
                    <NavItem
                        style={{
                            backgroundColor: customRouter.pathname === '/myadmin/products' ? 'black' : '',
                            color: customRouter.pathname === '/myadmin/products' ? 'white' : '',
                            fontWeight: customRouter.pathname === '/myadmin/products' ? '600' : '',
                        }}
                        onClick={() => __handle.action.route('/myadmin/products')}
                    >
                        상품 리스트
                    </NavItem>
                    <NavItem
                        style={{
                            backgroundColor: customRouter.pathname === '/myadmin/order' ? 'black' : '',
                            color: customRouter.pathname === '/myadmin/order' ? 'white' : '',
                            fontWeight: customRouter.pathname === '/myadmin/order' ? '600' : '',
                        }}
                    >
                        주문 내역
                    </NavItem>
                </Wrapper>
            </Container>
        </>
    );
}