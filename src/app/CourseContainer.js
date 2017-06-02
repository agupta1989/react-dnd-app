import React, {Component} from 'react';
import DraggableCourse from './DraggableCourse';

import CustomDragLayer from './CustomDragLayer';

export default class CourseContainer extends Component {
    render() {
        const {lists} = this.props;
        const courses = this.props.lists.length > 0
            ? lists.map((item) => (
                <DraggableCourse key={item.id} item={item} />
            ))
            : null;
        return (
            <div className="list-group">
                {courses}
                <CustomDragLayer /> 
            </div>
        );
    }
}