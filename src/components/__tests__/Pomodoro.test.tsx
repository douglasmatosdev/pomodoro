
import {render, screen} from '@testing-library/react'
import { Pomodoro } from '../Pomodoro';

describe('Pomodoro component', () => {
    it('should render with initial value 25:00', () => {
        render(<Pomodoro />)
        const timer = screen.getByText('25:00')

        expect(timer).toBeInTheDocument()
    });
});