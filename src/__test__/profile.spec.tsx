import { render } from '@testing-library/react-native'

import { Profile } from '../screens/Profile'

describe('Profile Screen', () => {
  it('should', () => {
    const { getByPlaceholderText } = render(<Profile />)

   const inputName = getByPlaceholderText("Nome")

   expect(inputName).toBeTruthy()

  })
})