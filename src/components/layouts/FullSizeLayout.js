import React from 'react';
import { withRouter } from 'react-router-dom';

const FullSizeLayout = props => {
  const Page = props.page;
  return (
    <section>
      <Page {...props} />
    </section>
  );
};

export default withRouter(FullSizeLayout);
