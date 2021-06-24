import { render } from '@testing-library/react'
import Playground from '../../pages/playground'

describe('[pages]: <Playground />', () => {
  it('should render <Playground /> as a truthy value', () => {
    expect(render(<Playground />)).toBeTruthy()
  })
})
