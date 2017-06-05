import React, {Component} from 'react';
import Header from "../app/Header";
import Term from "./plans/Term";
import { ItemTypes } from "./Constant";

import '../app/App.css';
import "./edu.css";

class Edu extends Component {
    constructor(props) {
        super(props);
        this.updateTerm = this.updateTerm.bind(this);
        this.state = {
            terms: [
                {
                    id: 1,
                    name: "Fall",
                    courses: [
                        {
                            id: 1,
                            name: "Physics",
                            type: ItemTypes.COURSE
                        },
                        {
                            id: 2,
                            name: "Chemistry",
                            type: ItemTypes.COURSE
                        },
                        {
                            id: 3,
                            name: "Biology",
                            type: ItemTypes.COURSE
                        }
                    ]
                },
                {
                    id: 2,
                    name: "Winter",
                    courses: [
                        {
                            id: 1,
                            name: "Civics",
                            type: ItemTypes.COURSE
                        },
                        {
                            id: 2,
                            name: "History",
                            type: ItemTypes.COURSE
                        },
                        {
                            id: 3,
                            name: "Geography",
                            type: ItemTypes.COURSE
                        }
                    ]
                },
                {
                    id: 3,
                    name: "Spring",
                    courses: [
                        {
                            id: 1,
                            name: "Algebra",
                            type: ItemTypes.COURSE
                        }, 
                        {
                            id: 2,
                            name: "Geometry",
                            type: ItemTypes.COURSE
                        },
                        {
                            id: 3,
                            name: "Statistics",
                            type: ItemTypes.COURSE
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

    updateTerm(term) {
        console.log("updated term", term);
        const t = this.state.terms.map(t => {
            if (t.id === term.id) {
                return term;
            } else {
                return t;
            }
        });

        this.setState(t);
    }

    render() {
        return (
            <div className={"App"}>
                <Header />
                <div className={"container"}>
                    {
                        this.state.terms.map((term) => (
                            <Term key={term.id} index={term.id} term={term} updateTerm={this.updateTerm} />
                        ))
                    }
                </div>
            </div>
        )
    }
}

export default Edu;