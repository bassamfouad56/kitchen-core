import Loading from "./components/Loading";

// This is the root loading UI for Next.js App Router
// It's automatically shown when a route segment is loading
export default function RootLoading() {
  return <Loading variant="logo" fullScreen text="Loading" />;
}
