import React, {Component} from 'react';
import update from 'react/lib/update';
import { DragDropContext } from 'react-dnd';

import HTML5Backend, { NativeTypes } from 'react-dnd-html5-backend';
import { default as TouchBackend } from 'react-dnd-touch-backend';
import Backpack from './Backpack';
import CourseContainer from './CourseContainer';
import {ItemTypes} from './Constant';

class Body extends Component {
    constructor(props) {
        super(props);
        this.handleDrop = this.handleDrop.bind(this);
        
        this.state = {
            backpack: [
                { accepts: [ItemTypes.COURSE]}
            ],
            courses: [
                { id: 1, name: 'Physics', type: ItemTypes.COURSE },
                { id: 2, name: 'Chemistry', type: ItemTypes.COURSE },
                { id: 3, name: 'Biology', type: ItemTypes.COURSE },
                { id: 4, name: 'Maths', type: ItemTypes.COURSE },
                { id: 5, name: 'Geography', type: ItemTypes.COURSE },
                { id: 6, name: 'Hindi', type: ItemTypes.COURSE },
            ],
            droppedCourseNames: [],
        };
    }

    handleDrop(dropped) {
        const { item } = dropped;
        this.setState(update(this.state, {
            droppedCourseNames: item ? {
                $push: [item.name],
            } : {},
        }));
    }
    getLists() {
        return [
            {
                id: 1,
                type: "course"
            },
            {
                id: 2,
                type: "course"
            },
            {
                id: 3,
                type: "course"
            },
            {
                id: 4,
                type: "course"
            },
            {
                id: 5,
                type: "course"
            },
            {
                id: 6,
                type: "course"
            },
            {
                id: 7,
                type: "course"
            }
        ];
    }

    render() {
        return (
            <div className="container-fluid text-center">    
                <div className="row content">
                    <div className="col-sm-3 sidenav">
                        <CourseContainer lists={this.state.courses} />
                    </div>
                    <div className="col-sm-9 text-left"> 
                        <h1>Drop Items here...</h1>
                        <Backpack
                            onDrop={this.handleDrop}
                            droppedCourseNames={this.state.droppedCourseNames}
                        />
                    </div>
                </div>
            </div>
        );
    }
}

let _Container = null;
if ('ontouchstart' in window || navigator.maxTouchPoints) {
  window.console.log("its touch based");
  _Container = DragDropContext(TouchBackend)(Body);
} else {
  window.console.log("its mouse based");
  _Container = DragDropContext(HTML5Backend)(Body);
}
export default _Container;