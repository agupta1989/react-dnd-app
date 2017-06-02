import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { DragLayer } from 'react-dnd';
import {ItemTypes} from './Constant';
import CourseDragPreview from './CourseDragPreview';

const layerStyles = {
    position: 'fixed',
    pointerEvents: 'none',
    zIndex: 100,
    left: 0,
    top: 0,
    width: '100%',
    height: '100%',
};

function getItemStyles(props) {
    const { initialOffset, currentOffset } = props;
    if (!initialOffset || !currentOffset) {
        return {
            display: "none"
        };
    }

    console.log("currentOffset", currentOffset  )

    let { x, y } = currentOffset;
    // if (props.snapToGrid) {
    //     x -= initialOffset.x;
    //     y -= initialOffset.y;
    //     // [x, y] = snapToGrid(x, y);
    //     x += initialOffset.x;
    //     y += initialOffset.y;
    // }

    const transform = `translate(${x}px, ${y}px)`;
    
    return {
        transform,
        WebkitTransform: transform,
    };
}

class CustomDragLayer extends Component {
    renderItem(type, item) {
        switch (type) {
        case ItemTypes.COURSE:
            return (<CourseDragPreview item={item.item} />);
        default:
            return null;
        }
    }

    render() {
        const { item, itemType, isDragging } = this.props;

        if (!isDragging) {
            return null;
        }

        return (
        <div style={layerStyles}>
            <div style={getItemStyles(this.props)}>
                {this.renderItem(itemType, item)}
            </div>
        </div>
        );
    }
}

CustomDragLayer.propTypes = {
    item: PropTypes.object,
    itemType: PropTypes.string,
    initialOffset: PropTypes.shape({
        x: PropTypes.number.isRequired,
        y: PropTypes.number.isRequired,
    }),
    currentOffset: PropTypes.shape({
        x: PropTypes.number.isRequired,
        y: PropTypes.number.isRequired,
    }),
    isDragging: PropTypes.bool.isRequired
};

export default DragLayer(monitor => ({
    item: monitor.getItem(),
    itemType: monitor.getItemType(),
    initialOffset: monitor.getInitialSourceClientOffset(),
    currentOffset: monitor.getSourceClientOffset(),
    isDragging: monitor.isDragging(),
}))(CustomDragLayer);