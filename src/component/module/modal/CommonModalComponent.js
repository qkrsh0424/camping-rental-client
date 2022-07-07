import { Dialog } from '@mui/material';
import styled from 'styled-components';

const Container = styled.div`

`;

const CustomDialog = styled(Dialog)`
    .MuiPaper-root::-webkit-scrollbar{
        background: #e1e1e130;
        height:7px;
        width: 5px;
    }

    .MuiPaper-root::-webkit-scrollbar-track{
        border-radius: 10px;
    }
    .MuiPaper-root::-webkit-scrollbar-thumb{
        background-color: #00000020;
        border-radius: 10px;
    }

    .css-yiavyu-MuiBackdrop-root-MuiDialog-backdrop{
        background-color:${props => props.backgroundcolor ? props.backgroundcolor : 'inherit'};
    }
`;

/**
 * 
 * @param {Object} props
 * @param {boolean} props.open
 * @param {boolean} props.fullWidth
 * @param {string} props.maxWidth [xs, sm, md, lg, xl]
 * @param {function} props.onClose
 * @returns 
 */
const CommonModalComponent = ({ open, fullWidth, maxWidth, onClose, backgroundColor, children }) => {
    return (
        <>
            <CustomDialog
                open={open || false}
                fullWidth={fullWidth || true}
                maxWidth={maxWidth || 'xs'}
                onClose={() => onClose() || {}}
                backgroundcolor={backgroundColor || '#00000080'}
            >
                {children}
            </CustomDialog>
        </>
    );
}
export default CommonModalComponent;