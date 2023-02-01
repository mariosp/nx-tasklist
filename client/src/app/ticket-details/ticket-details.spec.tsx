import { Ticket } from '@acme/shared-models';
import { act, render } from '@testing-library/react';

import TicketDetails from './ticket-details';

describe('TicketDetails', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<TicketDetails loading={true} tickets={[]} users={[]} handleChange={()=>{}}/>);
    expect(baseElement).toBeTruthy();
  });

  it('should render no tickets found when is not loading and ticket is not found',  () => {
    const { baseElement } = render(<TicketDetails loading={false} tickets={[]} users={[]} handleChange={()=>{}}/>);

    expect(baseElement.innerHTML).toContain("No ticket found");
  });
});
