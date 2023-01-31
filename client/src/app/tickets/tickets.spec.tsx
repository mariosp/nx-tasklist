import { render } from '@testing-library/react';

import Tickets from './tickets';

describe('Tickets', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<Tickets loading={true} tickets={[]} users={[]} handleNewTicket={()=>{}} />);
    expect(baseElement).toBeTruthy();
  });
});
