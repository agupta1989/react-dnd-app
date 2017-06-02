import React, {Component} from 'react';

export default class Course extends Component {
    render() {
        const { item, className } = this.props;
        return (
            <a
                href="javascript:void(0)" className={className}>
                <h4 className="list-group-item-heading">{item.name}</h4>
            </a>
        );
    }
}
