import React, {Component} from "react";
import DraggableCourse from "./dnd/DraggableCourse";
import { DragDropContext } from "react-dnd";
import HTML5Backend from 'react-dnd-html5-backend';

class Term extends Component {
    constructor(props) {
        super(props);
        this.moveCard = this.moveCard.bind(this);
        this.updateCard = this.updateCard.bind(this);
    }
    getEmptyBlock() {
        return <div className="block drop"></div>;
    }
    moveCard(dragInfo) {
        this.props.onHover(dragInfo);
    }
    updateCard(dropInfo) {
        this.props.onDrop(dropInfo);
    }
    render() {
        const { term, index } = this.props;

        return (
            <div className="col">
                <div className="block">
                    <h4> {term.name} </h4>
                </div>
                {
                    term.courses.length < 1
                        ? this.getEmptyBlock()
                        : term.courses.map((course, idx) => (
                            <DraggableCourse isDisabled={course.isDisabled} termId={term.id} key={course.id} index={idx} course={course} moveCard={this.moveCard} updateCard={this.updateCard} />
                        ))
                }
            </div>
        );
    }
}

export default DragDropContext(HTML5Backend)(Term);
