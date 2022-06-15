import { Link } from 'react-router-dom';
import styled from 'styled-components';

const Container = styled.div`

`;

const Notice = styled.div`
    user-select: none;
    position: fixed;
    top:50%;
    left:50%;
    transform: translate(-50%, -50%);
    font-size: 20px;
    font-weight: 500;
`;

export default function NotFoundPage(props) {
    return (
        <Container>
            <Notice>
                <div>
                    페이지를 찾을 수 없습니다. 😥 | 404
                </div>
                <div
                    style={{
                        textAlign:'center',
                        marginTop:'10px'
                    }}
                >
                    <Link
                        to={'/'}
                        replace={true}
                    >
                        홈으로 돌아가기
                    </Link>
                </div>
            </Notice>
        </Container>
    );
}