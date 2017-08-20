import React, {Component} from "react";
import { ItemTypes } from './Constant';
import DraggableCourse from "./dnd/DraggableCourse";
import { DropTarget } from 'react-dnd';
import BlankCourse from "./dnd/BlankCourse";

const dropTarget = {
    hover(props, monitor, component) {
        console.log("~~~~~~~ onHover ~~~~~");
        console.log("props", props);
        console.log("monitor", monitor);
        console.log("component", component);
        console.log("~~~~~~~ #### ~~~~~~~");
    },
    drop(props, monitor, component) {
        console.log("#### onDrop #####");
        console.log("props", props);
        console.log("monitor", monitor);
        console.log("component", component);
        console.log("~~~~~~~ #### ~~~~~~~");
    }
};

class Term extends Component {
    constructor(props) {
        super(props);
        this.moveCard = this.moveCard.bind(this);
        this.updateCard = this.updateCard.bind(this);
    }
    moveCard(dragInfo) {
        this.props.onHover(dragInfo);
    }
    updateCard(dropInfo) {
        this.props.onDrop(dropInfo);
    }
    render() {
        const { term, connectDropTarget } = this.props;

        return (
            connectDropTarget(
                <div className="col term">
                    <div className="block">
                        <h4> {term.name} </h4>
                    </div>
                    {
                        term.courses.length < 1
                            ? <BlankCourse index={0} termId={term.id} moveCard={this.moveCard} updateCard={this.updateCard} />
                            : term.courses.map((course, idx) => (
                                <DraggableCourse isDisabled={course.isDisabled} termId={term.id} key={course.id} index={idx} course={course} moveCard={this.moveCard} updateCard={this.updateCard} />
                            ))
                    }
                </div>
            )
        );
    }
}

export default DropTarget(ItemTypes.COURSE, dropTarget, (connect, monitor) => ({
    connectDropTarget: connect.dropTarget(),
    isOver: monitor.isOver(),
    canDrop: monitor.canDrop()
}))(Term);
