import { renderHook, act } from '@testing-library/react-hooks'
import { AuthProvider, useAuth } from './auth'

jest.mock("@react-native-async-storage/async-storage", () =>
  require("@react-native-async-storage/async-storage/jest/async-storage-mock")
)

jest.mock("expo-auth-session", () => {
  return {
    AuthSession: () => {
      return {
        type: "success",
        user: {
          id: "any.email",
          email: "bentesmourao@gmail.com",
          name: "Marlison",
          photo: "any_photo.png",
        },
      };
    },
  };
});

jest.mock("expo-apple-authentication", () => {
  return {
    AppleAuthentication: () => {
      return {
        type: "success",
        user: {
          id: "any.email",
          email: "bentesmourao@gmail.com",
          name: "Marlison",
          photo: "any_photo.png",
        },
      };
    },
  };
});

describe('Auth Hook', () => {
  it('should be able to sign in with Apple account existing', async () => {
    const { result } = renderHook(() => useAuth(), {
      wrapper: AuthProvider
    })

    await act(() => result.current.signInWithApple());

    expect(result.current.user).toBeTruthy()
  })

  it("should be able to sign in with Google account existing", async () => {
    const { result } = renderHook(() => useAuth(), {
      wrapper: AuthProvider,
    });

    await act(() => result.current.signInWithGoogle());
    console.log(result.current.user)

    expect(result.current.user.email).toBeTruthy()
  })
})