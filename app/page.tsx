import Link from "next/link";

export default function Home() {
  return (
    <>
      <h1>The Cave Bank</h1>
      <Link href="/auth/login">Login</Link>
    </>
  );
}
