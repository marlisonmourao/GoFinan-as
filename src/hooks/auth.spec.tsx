import { renderHook, act } from "@testing-library/react-hooks";
import { AuthProvider, useAuth } from "./auth";
import { startAsync } from "expo-auth-session";
import { signInAsync } from "expo-apple-authentication";

jest.mock("@react-native-async-storage/async-storage", () =>
  require("@react-native-async-storage/async-storage/jest/async-storage-mock")
);

jest.mock("expo-auth-session");

jest.mock("expo-apple-authentication", () => {
  return {
    signInAsync: jest.fn(),
  };
});


describe("Auth Hook", () => {
  it("should be able to sign in with Apple account existing", async () => {
    const AppleMocked = jest.mocked(signInAsync as any)
    AppleMocked.mockReturnValueOnce({
      type: "success",
      user: {
        id: "1",
        email: "bentesmourao@gmail.com",
        name: "Marlison",
        photo: "any_photo.png",
      },
    });

    const { result } = renderHook(() => useAuth(), {
      wrapper: AuthProvider,
    });

    await act(() => result.current.signInWithApple());

    expect(result.current.user).toBeTruthy()
  });

  it("should be able to sign in with Google account existing", async () => {
    const googleMocked = jest.mocked(startAsync as any);
    googleMocked.mockReturnValueOnce({
      type: "success",
      user: {
        id: "1",
        email: "bentesmourao@gmail.com",
        name: "Marlison",
        photo: "any_photo.png",
      },
    });

    const { result } = renderHook(() => useAuth(), {
      wrapper: AuthProvider,
    });

    await act(() => result.current.signInWithGoogle());

    expect(result.current.user).toBeTruthy();
  });

  it("user should not connect if cancel authentication with Google", async () => {
    const googleMocked = jest.mocked(startAsync as any);
    googleMocked.mockReturnValue({
      type: "cancel",
    });

    const { result } = renderHook(() => useAuth(), {
      wrapper: AuthProvider,
    });

    await act(() => result.current.signInWithGoogle());

    expect(result.current.user).not.toHaveProperty("id");
  });
});
