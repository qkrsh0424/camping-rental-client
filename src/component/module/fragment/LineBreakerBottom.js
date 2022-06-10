import PropTypes from 'prop-types';
import styled from "styled-components";

const Container = styled.div`
    padding-top: ${props => `${props.gapTop}px`};
    margin-bottom: ${props => `${props.gapBottom}px`};
    border-bottom: ${(props) => `${props.lineSize}px ${props.lineType} ${props.lineColor}`};
`;

/**
 * @param {Object} props
 * @param {number} props.lineSize - Unit = 'px', Default size = 1
 * @param {string} props.lineType - Default value = 'solid'
 * @param {string} props.lineColor - Default value = '#f1f1f1' 
 * @param {number} props.gapTop - Unit = 'px', Default size = 0
 * @param {number} props.gapBottom - Unit = 'px', Default size = 0
 * @version 1.0.0
 * @author Austin Park
 */
export default function LineBreakerBottom(props) {
    return (
        <Container
            lineSize={props.lineSize || 1}
            lineType={props.lineType || 'solid'}
            lineColor={props.lineColor || '#f1f1f1'}
            gapTop={props.gapTop || 0}
            gapBottom={props.gapBottom || 0}
        ></Container>
    );
}

LineBreakerBottom.prototype = {
    lineSize: PropTypes.number,
    lineType: PropTypes.string,
    lineColor: PropTypes.string,
    gapTop: PropTypes.number,
    gapBottom: PropTypes.number
}