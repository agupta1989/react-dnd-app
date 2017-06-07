import React, {Component} from "react";
import { ItemTypes } from "../Constant";
import { DropTarget } from "react-dnd";
import { findDOMNode } from "react-dom";

const termTarget = {
    hover(props, monitor, component) {
        const courseItem = monitor.getItem();
        const dragIndex = courseItem.index;
        const hoverIndex = props.index;
        const termId = props.termId;

        // Don't replace items with themselves
        if (termId === courseItem.course.termId && dragIndex === hoverIndex) {
          return;
        }

        // Determine rectangle on screen
        const hoverBoundingRect = findDOMNode(component).getBoundingClientRect();

        // Get vertical middle
        const hoverMiddleY = (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2;

        // Determine mouse position
        const clientOffset = monitor.getClientOffset();

        // Get pixels to the top
        const hoverClientY = clientOffset.y - hoverBoundingRect.top;

        // Only perform the move when the mouse has crossed half of the items height
        // When dragging downwards, only move when the cursor is below 50%
        // When dragging upwards, only move when the cursor is above 50%

        // Dragging downwards
        if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) {
          return;
        }

        // Dragging upwards
        if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) {
          return;
        }

        // Time to actually perform the action
        props.moveCard({dragIndex, hoverIndex, termId, course: courseItem.course});

        // Note: we're mutating the monitor item here!
        // Generally it's better to avoid mutations,
        // but it's good here for the sake of performance
        // to avoid expensive index searches.
        monitor.getItem().index = hoverIndex;
    },
    drop(props, monitor, component) {
        console.log("props", props);
    }
};


class BlankCourse extends Component {
    render() {
        const { connectDropTarget } = this.props;
        return (
            connectDropTarget(
                <div className={"empty"}>
                    {"Drop Some Course Here..."}
                </div>
            )
        );
    }
}

export default DropTarget(ItemTypes.COURSE, termTarget, connect => ({
    connectDropTarget: connect.dropTarget(),
}))(BlankCourse);

