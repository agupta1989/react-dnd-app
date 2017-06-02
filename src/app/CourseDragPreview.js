import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Course from './Course';

const styles = {
    display: 'inline-block',
    // transform: 'rotate(-7deg)',
    // WebkitTransform: 'rotate(-7deg)',
};

export default class CourseDragPreview extends Component {

    constructor(props) {
        super(props);
        this.tick = this.tick.bind(this);
        this.state = {
            tickTock: false,
        };
    }

    componentDidMount() {
        this.interval = setInterval(this.tick, 500);
    }

    componentWillUnmount() {
        clearInterval(this.interval);
    }

    tick() {
        this.setState({
            tickTock: !this.state.tickTock,
        });
    }

    render() {
        const { item } = this.props;
        const { tickTock } = this.state;

        return (
            <div style={styles}>
                <Course item={item} className={"list-group-item"}/>
            </div>
        );
    }
}

CourseDragPreview.propTypes = {
    title: PropTypes.string,
}