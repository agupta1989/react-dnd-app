import React, {Component} from "react";

export default class Course extends Component {

    render() {
        const { course, isDisabled } = this.props;
        return (
            <div key={course.id} className={isDisabled ? "block" : "block drags"}>
                <h4>{course.name}</h4>
                <span>12 credits</span>
                <p>Hello World</p>
            </div>
        );
    }
}