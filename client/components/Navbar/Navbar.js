"use client"
import Image from "next/image"
import { useState } from "react"

export default function Navbar() {
  return (
    <header>
        <Image
            src={"/logo.png"}
        />
    </header>
  )
}
