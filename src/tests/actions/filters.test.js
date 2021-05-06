import moment from 'moment';
import {setStartDate, setEndDate, sortByAmount, sortByDate, setTextFilter} from '../../actions/filters';


test('should generate set start date action object', () => {
    const action = setStartDate(moment(0));
    expect(action).toEqual({
        type: 'SET_START_DATE',
        startDate: moment(0)
    });
});

test('should generate set end date action object', () => {
    const action = setEndDate(moment(0));
    expect(action).toEqual({
        type: 'SET_END_DATE',
        endDate: moment(0)
    })
});

test('should generate set text filter action object with text value', () => {
    const text = 'provided text filter'
    const action = setTextFilter(text);
    expect(action).toEqual({
        type: 'SET_TEXT_FILTER',
        text
    })
});

test('should generate set text filter action object with default value', () => {
    const action = setTextFilter();
    expect(action).toEqual({
        type: 'SET_TEXT_FILTER',
        text: ''
    })
});

// NOTE: Alternate way to structure our Test Cases
//     - Instead of creating a separated variable to 'sortByDate()' Return Value (Ex. const action = sortByDate(); )
//     - We could toss everything "inline" by calling 'sortByDate()' within our 'expect(sortByDate())' method => And then use '.toEqual({ type: 'SORT_BY_DATE'})' to compare and Assert the expected Action Object Return Value
test('should generate sort by date action object', () => {
    expect(sortByDate()).toEqual({ type: 'SORT_BY_DATE'});
});

test('should generate sort by amount action object', () => {
    expect(sortByAmount()).toEqual({ type: 'SORT_BY_AMOUNT'});
});