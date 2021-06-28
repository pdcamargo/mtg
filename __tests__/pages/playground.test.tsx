import { render } from '@testing-library/react'

describe('[pages]: <Playground />', () => {
  it('should render <Playground /> as a truthy value', () => {
    expect(render(<div />)).toBeTruthy()
  })
})
