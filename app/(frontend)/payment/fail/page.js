import Link from "next/link";

export default function PaymentFail() {
  return (
    <div className="text-center h-screen flex items-center justify-center flex-col p-10">
      <h1 className="text-red-600 font-bold text-2xl">Payment Failed</h1>
      <p>There was an issue processing your transaction.</p>
      <Link href="/events/checkout" className="text-[#00a19a] underline">
        Go back to checkout and try again
      </Link>
    </div>
  );
}