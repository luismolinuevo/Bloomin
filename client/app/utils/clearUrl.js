"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import cookie from "js-cookie";

export default function useClearUrl() {
  const router = useRouter();

  useEffect(() => {
    const url = new URL(window.location.href);
    const tokenParam = url.searchParams.get("token");

    if (tokenParam) {
      cookie.set("user_token", tokenParam);

      const newUrl = window.location.href.split("?")[0];
      window.history.replaceState({}, document.title, newUrl);

      router.push("/");
    }
  }, [router]);
}
