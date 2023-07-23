import Link from "next/link"
import React from "react"

export default function Home() {
  return (
    <main className={`flex min-h-screen flex-col items-center justify-between p-24`}>
      <div className="hero max-h-full">
        <div className="hero-overlay bg-opacity-10 sm:bg-opacity-30">
            <div className="hero-content text-center text-neutral-content">
              <div className="max-w-lg lg:max-w-xl">
                <h1 className="md:mb-5 text-xl md:text-2xl lg:text-3xl font-bold">
                  何をすべきか、わからない<br/>何したらいいのか
                </h1>
                <p className="mt-3 mb-5 md:text-lg sm:flex">
                  そんなあなたを助けてくれます。<br />そしてメッセージを送って<br />あなたの気持ちを伝えることができます。
                </p>
                <Link href="/random_page">
                  <button className="p-4 rounded-md btn border-none sm:inline-block bg-gradient-to-r from-orange-400 via-yellow-300 to-white hover:bg-gradient-to-r hover:from-white hover:via-yellow-300 hover:to-orange-400">
                    覗いてみる
                  </button>
                </Link>
              </div>
            </div>
        </div>
      </div>
    </main>
  )
}
