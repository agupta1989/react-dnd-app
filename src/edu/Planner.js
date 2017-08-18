import * as React from "react";
import { DragDropContext } from "react-dnd";
import HTML5Backend from "react-dnd-html5-backend";
import Term from "./Term";

class Planner extends React.Component {
    render() {
        const { terms, onHover, onDrop } = this.props;

        return (
            <div className={"container planner"}>
                {
                    terms.map((term, index) => (
                        <Term key={term.id} index={index} term={term} onHover={onHover} onDrop={onDrop} />
                    ))
                }
            </div>
        );
    }
}

export default DragDropContext(HTML5Backend)(Planner);