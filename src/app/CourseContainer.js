import React, {Component} from 'react';
import Course from './Course';

export default class CourseContainer extends Component {
    render() {
        const lists = this.props.lists.length > 0 ?
                    this.props.lists.map((item) => {
                        return <Course key={item.id} item={item} />
                    }) : null;
        return (
            <div className="list-group">
               {lists}
            </div>
        );
    }
}