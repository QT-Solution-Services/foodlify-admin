import React, { useState, useEffect } from "react";
import Button from "@/components/Button";
import Image from "next/image";
import useAuthentication from "@/hooks/useAuthentication";
import SplashScreen from "@/components/SplashScreen";

function Index() {
  const { reqLoading, handleLoginWithForm } = useAuthentication();

  const [showSplash, setShowSplash] = useState(true);
  useEffect(() => {
    const timerId = setTimeout(() => {
      setShowSplash(false);
    }, 3000);

    return () => clearTimeout(timerId);
  }, []);

  // const [username, setUsername] = useState("");
  // const [password, setPassword] = useState("");
  const [username, setUsername] = useState("admin@foodlify.com.ng");
  const [password, setPassword] = useState("TheAdmin@foodlify");

  async function handleSubmit(e: any) {
    e.preventDefault();
    if (!username || !password) return;
    handleLoginWithForm({ username, password });
  }

  return (
    <>
      {showSplash && <SplashScreen />}
      {!showSplash && (
        <div className="h-screen bg-yellow-100">
          <header className="flex h-14 items-center justify-between bg-yellow-400 px-8 py-2 ">
            <h2 className="text-sm capitalize md:text-2xl">
              foodlify admin app
            </h2>
            <h2>
              <input
                type="text"
                name=""
                placeholder="oder #id"
                className="input hidden w-40 transition-all duration-300  focus:w-60 md:block "
              />
              <Image
                src="/hamburger.svg"
                width={50}
                height={50}
                alt="hamburger-icon"
                className="block md:hidden"
              />
            </h2>
          </header>
          <main className="mx-auto my-16  md:w-[900px] ">
            <div className="rounded-2xl bg-yellow-200/60 px-12 py-8 md:px-20 md:py-16 md:text-center">
              <h2 className="text-2xl font-light md:text-5xl md:font-semibold">
                Foodlify admin dashbord
              </h2>
              <h3 className="text-center text-sm font-medium italic text-yellow-600">
                Elevating Culinary Management...
              </h3>
              <h3 className="mb-4 mt-8 text-stone-700 md:text-xl">
                👋️ welcome back, please start by filling the form
              </h3>
              {/* form */}
              <form className="flex flex-col items-center justify-center gap-3">
                <input
                  type="text"
                  placeholder="username"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  className="input w-72 text-stone-600"
                />
                <input
                  type="password"
                  placeholder="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="input w-72"
                />
                <Button
                  type="big"
                  bgc="bg-yellow-400"
                  className="hover:bg-yellow-500"
                  loading={reqLoading}
                  onClick={handleSubmit}
                >
                  Login
                </Button>
              </form>
            </div>
          </main>
        </div>
      )}
    </>
  );
}

export default Index;
