import React from 'react';

import MainPanel from './MainPanel';
import ManagePanel from './ManagePanel';

const NARROW_PANEL_MIN_WIDTH = 300;

export default class SnoozePopup extends React.Component {
  render() {
    const { activePanel, tabIsSnoozable } = this.props;
    return (
      <div className="panel-wrapper"
           ref={el => this.handleDOMRef(el)}>
        {tabIsSnoozable && <MainPanel {...this.props} id="main" active={'main' === activePanel} />}
        <ManagePanel {...this.props} id="manage" active={'manage' === activePanel} />
      </div>
    );
  }

  handleDOMRef(el) {
    if (!el) { return; }

    // HACK: Perform a terrible media-query-like style adaptation if the
    // component is narrow
    if (el.clientWidth < NARROW_PANEL_MIN_WIDTH) {
      el.classList.add('narrow');
    }
  }
}
