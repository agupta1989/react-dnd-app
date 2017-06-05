import React, {Component} from "react";
import update from "react/lib/update";
import DraggableCourse from "../dnd/DraggableCourse";
import { DragDropContext } from "react-dnd";
import HTML5Backend from 'react-dnd-html5-backend';

class Term extends Component {
    constructor(props) {
        super(props);
        this.moveCard = this.moveCard.bind(this);
    }
    getEmptyBlock() {
        return <div className="block drop"></div>;
    }
    moveCard(dragIndex, hoverIndex) {
        let term = this.props.term;
        console.log("dragIndex", dragIndex);
        console.log("hoverIndex", hoverIndex);

        const dragCard = term.courses[dragIndex];
        term = update(term, {
            courses: {
                $splice: [
                    [dragIndex, 1],
                    [hoverIndex, 0, dragCard],
                ],
            },
        });

        this.props.updateTerm(term);
    }
    render() {
        const { term } = this.props;

        return (
            <div className="col">
                <div className="block">
                    <h4> {term.name} </h4>
                </div>
                {
                    term.courses.length < 1
                        ? this.getEmptyBlock()
                        : term.courses.map((course, index) => (
                            <DraggableCourse key={index} index={course.id} course={course} moveCard={this.moveCard} />
                        ))
                }
            </div>
        );
    }
}

export default DragDropContext(HTML5Backend)(Term);
