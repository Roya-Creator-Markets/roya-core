import LoginButton from "./components/LoginButton";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-24">
      <div className="z-10 w-full max-w-5xl items-center justify-center font-mono text-sm">
        <h1 className="text-4xl font-bold mb-8 text-center">
          Privy Authentication Demo
        </h1>
        <div className="flex justify-center">
          <LoginButton />
        </div>
      </div>
    </main>
  );
}