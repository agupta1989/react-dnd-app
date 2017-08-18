import React, {Component} from "react";
import Header from "../app/Header";
import update from "react/lib/update";
import { ItemTypes } from "./Constant";
import Planner from "./Planner";

import "../app/App.css";
import "./edu.css";

class Edu extends Component {
    constructor(props) {
        super(props);
        this.onHover = this.onHover.bind(this);
        this.state = {
            terms: [
                {
                    id: 1,
                    name: "Fall",
                    courses: [
                        {
                            id: 1,
                            name: "Physics",
                            type: ItemTypes.COURSE,
                            termId: 1,
                            isDisabled: true
                        },
                        {
                            id: 2,
                            name: "Chemistry",
                            type: ItemTypes.COURSE,
                            termId: 1,
                            isDisabled: false
                        },
                        {
                            id: 3,
                            name: "Biology",
                            type: ItemTypes.COURSE,
                            termId: 1,
                            isDisabled: false
                        }
                    ]
                },
                {
                    id: 2,
                    name: "Winter",
                    courses: [
                        {
                            id: 4,
                            name: "Civics",
                            type: ItemTypes.COURSE,
                            termId: 2
                        },
                        {
                            id: 5,
                            name: "History",
                            type: ItemTypes.COURSE,
                            termId: 2
                        },
                        {
                            id: 6,
                            name: "Geography",
                            type: ItemTypes.COURSE,
                            termId: 2
                        }
                    ]
                },
                {
                    id: 3,
                    name: "Spring",
                    courses: [
                        {
                            id: 7,
                            name: "Algebra",
                            type: ItemTypes.COURSE,
                            termId: 3
                        },
                        {
                            id: 8,
                            name: "Geometry",
                            type: ItemTypes.COURSE,
                            termId: 3
                        },
                        {
                            id: 9,
                            name: "Statistics",
                            type: ItemTypes.COURSE,
                            termId: 3
                        }
                    ]
                },
                {
                    id: 4,
                    name: "Summer",
                    courses: [

                    ]
                }
            ]
        };
    }

    onHover({dragIndex, hoverIndex, termId, course}) {
        const currentTermIndex = this.state.terms.findIndex(t => t.id === termId);
        const prevTermIndex = this.state.terms.findIndex(t => t.id === course.termId);

        const currentTerm = this.state.terms[currentTermIndex];

        // check if drag ops is within the same term
        if (currentTermIndex === prevTermIndex) {
            const draggedCourse = currentTerm.courses[dragIndex];

            this.setState(update(this.state, {
                terms: {
                    [currentTermIndex]: {
                        courses: {
                            $splice: [
                                [dragIndex, 1],
                                [hoverIndex, 0, draggedCourse],
                            ]
                        }
                    }
                }
            }));
        } else {
            const prevTerm = this.state.terms[prevTermIndex];
            const draggedCourse = prevTerm.courses[dragIndex];
            // change the course term id with new term.
            draggedCourse.termId = currentTerm.id;

            if (currentTerm.courses.length === 0) {
                this.setState(update(this.state, {
                    terms: {
                        [currentTermIndex]: {
                            courses: {
                                $push: [ draggedCourse ]
                            }
                        },
                        [prevTermIndex]: {
                            courses: {
                                $splice: [
                                    [dragIndex, 1]
                                ]
                            }
                        }
                    }
                }));
            } else {
                this.setState(update(this.state, {
                    terms: {
                        [currentTermIndex]: {
                            courses: {
                                $splice: [
                                    [hoverIndex, 0, draggedCourse],
                                ]
                            }
                        },
                        [prevTermIndex]: {
                            courses: {
                                $splice: [
                                    [dragIndex, 1]
                                ]
                            }
                        }
                    }
                }));
            }
        }
    }

    onDrop(dropInfo) {
        console.log("DropInfo ", dropInfo);
    }

    render() {
        return (
            <div className={"App"}>
                <Header />
                <Planner terms={this.state.terms} onHover={this.onHover} onDrop={this.onDrop} />
            </div>
        )
    }
}

export default Edu;