import { Component } from "react";

// False negatives on testing implementation details.

// Dummy accordion contents for demo.
function AccordionContents ({ stuff }) { return <>{stuff}</>}

class Accordion extends Component {
    state = { openIndex: 0 };

    render() {
		const { openIndex } = this.state

		return (
			<div>
				{this.props.items.map((item, index) => (
					<>
						<button onClick={() => this.setOpenIndex(index)}>{item.title}</button>
						{index === openIndex ? (<AccordionContents>{item.contents}</AccordionContents>) : null}
					</>
				))}
			</div>
		)
	}
}

export { Accordion };

//Refactor accordion component to have mode more than one of its contents open at once.
// behavior remains constant, but implementation breaks.
class AccordionTwo extends Component {
	state = {openIndexes: [0]};
  	setOpenIndex = openIndex => this.setState({openIndexes: [openIndex]});

	render() {
		const {openIndexes} = this.state;

		return (
			<div>
        		{this.props.items.map((item, index) => (
          			<>
            			<button onClick={() => this.setOpenIndex(index)}>{item.title}</button>
						{openIndexes.includes(index) ? (
              				<AccordionContents>{item.contents}</AccordionContents>) : null}
          			</>))}
      		</div>);
	}
}

export { AccordionTwo };

// False positives.

// Co-worker sees this code
// <button onClick={() => this.setOpenIndex(index)}>{item.title}</button>

// They clean up the inline arrow functions for perfomance optimization
// <button onClick={this.setOpenIndex}>{item.title}</button>

