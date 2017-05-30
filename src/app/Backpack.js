import React, {Component} from 'react';
import PropTypes from 'prop-types';
import { DropTarget } from 'react-dnd';
import {ItemTypes} from './Constant';

const courseTarget = {
  drop(props, monitor) {
    props.onDrop(monitor.getItem());
  },
};

class Backpack extends Component {
    render() {
        const { canDrop, isOver, connectDropTarget, droppedCourseNames } = this.props;
        const isActive = canDrop && isOver;

        let backgroundColor = '#cedeec';
        if (isActive) {
            backgroundColor = 'darkgreen';
        } else if (canDrop) {
            backgroundColor = 'darkkhaki';
        }

        return (
            connectDropTarget(
                <div 
                    style={{ backgroundColor }}
                    className="list-group drop-target">
                    {
                        droppedCourseNames.length > 0 ? droppedCourseNames.map((course, index) => (
                            <a
                                key={index}
                                href="javascript:void(0)" className="list-group-item">
                                <h4 className="list-group-item-heading">{course}</h4>
                            </a>
                        )) : null
                    }
                    { isActive ? 'Release to drop' : 'Drag a Course here' }    
                </div>
            )
        );
    }
}

Backpack.propTypes = {
    connectDropTarget: PropTypes.func.isRequired,
    isOver: PropTypes.bool.isRequired,
    canDrop: PropTypes.bool.isRequired,
    onDrop: PropTypes.func.isRequired,
    droppedCourseNames: PropTypes.arrayOf(PropTypes.string.isRequired)
};

export default DropTarget(ItemTypes.COURSE, courseTarget, (connect, monitor) => ({
  connectDropTarget: connect.dropTarget(),
  isOver: monitor.isOver(),
  canDrop: monitor.canDrop(),
}))(Backpack);