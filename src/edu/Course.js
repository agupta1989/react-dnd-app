import React, {Component} from "react";

export default class Course extends Component {

    render() {
        const { course } = this.props;
        return (
            <div key={course.id} className="block drags">
                <h4>{course.name}</h4>
                <span>4 credits</span>
            </div>
        );
    }
}