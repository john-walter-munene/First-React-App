import Enzyme, { mount } from 'enzyme'
import EnzymeAdapter from 'enzyme-adapter-react-16'
import Accordion from '../accordion'

// False negatives.
// Note the differences in both tests.
// The second had to be refactored to make them pass as they test implementation details.

// Setup enzyme's react adapter
Enzyme.configure({ adapter: new EnzymeAdapter() })

test('setOpenIndex sets the open index state properly', () => {
	const wrapper = mount(<Accordion items={[]} />)
	expect(wrapper.state('openIndex')).toBe(0)
	wrapper.instance().setOpenIndex(1)
	expect(wrapper.state('openIndex')).toBe(1)
})

test('Accordion renders AccordionContents with the item contents', () => {
	const hats = { title: 'Favorite Hats', contents: 'Fedoras are classy' }
	const footware = {
		title: 'Favorite Footware',
		contents: 'Flipflops are the best',
	}
	const wrapper = mount(<Accordion items={[hats, footware]} />)
	expect(wrapper.find('AccordionContents').props().children).toBe(hats.contents)
})

// Now the above tests fail from false negatives.
// Rafactor them to
test('setOpenIndex sets the open index state properly', () => {
	const wrapper = mount(<Accordion items={[]} />);
	expect(wrapper.state('openIndexes')).toEqual([0]);
	wrapper.instance().setOpenIndex(1);
	expect(wrapper.state('openIndexes')).toEqual([1]);
});

Check Updated Accordion Tests for implementation detail free testing.