import React, {Component} from 'react';
import Header from "../app/Header";
import update from "react/lib/update";
import Term from "./Term";
import { ItemTypes } from "./Constant";

import '../app/App.css';
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
        // console.log("dragIndex", dragIndex);
        // console.log("hoverIndex", hoverIndex);
        // console.log("which course", course);

        const tIndex = this.state.terms.findIndex(t => t.id === termId);

        let term = this.state.terms[tIndex];

        // check if drag ops is within the same term
        if (course.termId === term.id) {
            const dragCard = term.courses[dragIndex];

            term = update(term, {
                courses: {
                    $splice: [
                        [dragIndex, 1],
                        [hoverIndex, 0, dragCard],
                    ]
                }
            });
            this.setState(update(this.state, {
                terms: {
                    $splice: [
                        [tIndex, 1],
                        [tIndex, 0, term]
                    ]
                }
            }));
        } else {
            // change the course term id with new term.
            course.termId = term.id;

            // update the term
            term = update(term, {
                courses: {
                    $splice: [
                        [hoverIndex, 0, course],
                    ]
                }
            });

            // update the state
            this.setState(update(this.state, {
                terms: {
                    $splice: [
                        [tIndex, 1],
                        [tIndex, 0, term]
                    ]
                }
            }));
        }
    }

    onDrop(dropInfo) {
        console.log("DropInfo ", dropInfo);
        // Since terms do not match, hence keep a track of parentTerm in which course originally belongs to.
        // const parentTermIndex = this.state.terms.findIndex(t => t.id === course.termId);
        // let courseParentTerm = this.state.terms[parentTermIndex];

        // remove the course from parent term.
        // courseParentTerm = courseParentTerm.courses.filter(c => {
        //     return c.id !== course.id;
        // });

        // console.log("parentTermIndex", parentTermIndex);
        // console.log("courseParentTerm", courseParentTerm);
        // console.log("tIndex", tIndex);

        // this.setState(update(this.state, {
        //     terms: {
        //         $splice: [
        //             [parentTermIndex, 1],
        //             [parentTermIndex, 0, courseParentTerm]
        //         ]
        //     }
        // }))
    }

    render() {
        return (
            <div className={"App"}>
                <Header />
                <div className={"container"}>
                    {
                        this.state.terms.map((term, index) => (
                            <Term key={term.id} index={index} term={term} onHover={this.onHover} onDrop={this.onDrop} />
                        ))
                    }
                </div>
            </div>
        )
    }
}

export default Edu;