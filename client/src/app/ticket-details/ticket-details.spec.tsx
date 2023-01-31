import { render } from '@testing-library/react';

import TicketDetails from './ticket-details';

describe('TicketDetails', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<TicketDetails loading={true} tickets={[]} users={[]} handleChange={()=>{}}/>);
    expect(baseElement).toBeTruthy();
  });
});
