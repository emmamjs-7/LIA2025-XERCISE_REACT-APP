import { render } from '@testing-library/react'
import RoundedButton from '../shared/components/RoundedButton'

test('renders RoundedButton without crashing', () => {
    render(<RoundedButton label="Save Log" size="small" />)
})
