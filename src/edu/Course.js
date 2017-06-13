import React, {Component} from "react";

export default class Course extends Component {

    render() {
        const { course, isDisabled } = this.props;
        return (
            <div key={course.id} className={isDisabled ? "block" : "block drags"}>
                <h4>{course.name}</h4>
                <span>14 credits</span>
                <p>Some random text here</p>
            </div>
        );
    }
}