import styled from 'styled-components';
import { useCustomRouterHook } from '../../../hooks/router/useCustomRouterHook';

const Container = styled.div`
    padding: 10px;
`;

const Wrapper = styled.div`
    display: flex;
`;

const NavItem = styled.div`
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
                    >
                        홈
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
                    <NavItem
                        style={{
                            backgroundColor: customRouter.pathname === '/myadmin/items' ? 'black' : '',
                            color: customRouter.pathname === '/myadmin/items' ? 'white' : '',
                            fontWeight: customRouter.pathname === '/myadmin/items' ? '600' : '',
                        }}
                    >
                        상품 리스트
                    </NavItem>
                </Wrapper>
            </Container>
        </>
    );
}