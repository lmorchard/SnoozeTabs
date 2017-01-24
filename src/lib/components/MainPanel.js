import React from 'react';

import classnames from 'classnames';
import moment from 'moment';
import { PICK_TIME, times, timeForId } from '../times';

import DatePickerPanel from './DatePickerPanel';

export default class MainPanel extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      datepickerActive: false,
      dateChoice: null
    };
  }

  render() {
    const { id, active, switchPanel } = this.props;
    const { datepickerActive } = this.state;

    return (
      <div>
        <div id={id} className={classnames('static', 'panel', { active, obscured: datepickerActive })}>
          <ul className="times">
            { times.map(item => this.renderTime(item)) }
          </ul>
          <div className="footer">
            <div className="manage" onClick={ () => switchPanel('manage') }><span>Manage Snoozed Tabs</span></div>
          </div>
        </div>
        <DatePickerPanel id="calendar"
                         active={datepickerActive}
                         header="Pick a Date/Time"
                         defaultValue={moment()}
                         onClose={ () => this.closeTimeSelect() }
                         onSelect={ value => this.confirmTimeSelect(value) } />
      </div>
    );
  }

  renderTime(item) {
    const [, date] = timeForId(moment(), item.id);
    return (
      <li className="option" key={item.id} id={item.id} onClick={ ev => this.handleOptionClick(ev, item) }>
        <img src={ `../icons/${item.icon || 'nightly.svg'}` } className="icon" />
        <div className="title">{item.title || '&nbsp;'}</div>
        <div className="date">&nbsp;{date}</div>
      </li>
    );
  }

  handleOptionClick(ev, item) {
    const { scheduleSnoozedTab } = this.props;
    if (item.id === PICK_TIME) {
      this.setState({ datepickerActive: true });
      return;
    }
    const [time, ] = timeForId(moment(), item.id);
    scheduleSnoozedTab(time);
  }

  closeTimeSelect() {
    this.setState({ datepickerActive: false });
  }

  confirmTimeSelect(dateChoice) {
    const { scheduleSnoozedTab } = this.props;
    if (!dateChoice) { return; }
    scheduleSnoozedTab(dateChoice);
  }
}
