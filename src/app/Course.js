import React, {Component} from 'react';
import { ItemTypes } from './Constant';
import { DragSource } from 'react-dnd';

const courseSource = {
  beginDrag(props) {
    return {
       item: props.item
    };
  }
};

function collect(connect, monitor) {
  return {
    connectDragSource: connect.dragSource(),
    isDragging: monitor.isDragging()
  }
}

class Course extends Component {
    render() {
        const { isDragging, connectDragSource, item } = this.props;
        return (
            connectDragSource(
                <a
                    style={{
                        opacity: isDragging ? 0.5 : 1,
                    }}
                    href="javascript:void(0)" className="list-group-item">
                    <h4 className="list-group-item-heading">{item.name}</h4>
                </a>
            )
        );
    }
}

export default DragSource(ItemTypes.COURSE, courseSource, collect)(Course);
