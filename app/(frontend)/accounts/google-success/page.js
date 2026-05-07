"use client";

import { Suspense } from "react";
import GoogleSuccessContent from "./_components/GoogleSuccessContent";

export default function Page() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <GoogleSuccessContent/>
    </Suspense>
  );
}