"use client"

import React, { createContext, useContext, useState, useEffect, ReactNode } from "react"

interface LivesContextType {
  lives: number
  maxLives: number
  loseLife: () => void
  rechargeLife: () => void
  setLives: (l: number) => void
  isRecharging: boolean
  rechargeTime: number
  startRecharge: () => void
}

const LivesContext = createContext<LivesContextType | undefined>(undefined)

const LIVES_KEY = "misiones_lives"
const RECHARGE_KEY = "misiones_lives_recharge"
const MAX_LIVES = 5
const RECHARGE_SECONDS = 20 * 60 // 20 minutos por vida (ajustable)

export function LivesProvider({ children }: { children: ReactNode }) {
  const [lives, setLives] = useState<number>(MAX_LIVES)
  const [isRecharging, setIsRecharging] = useState(false)
  const [rechargeTime, setRechargeTime] = useState(0)

  // Cargar vidas desde localStorage
  useEffect(() => {
    const saved = localStorage.getItem(LIVES_KEY)
    if (saved) setLives(Number(saved))
    const recharge = localStorage.getItem(RECHARGE_KEY)
    if (recharge) setRechargeTime(Number(recharge))
  }, [])

  // Guardar vidas en localStorage
  useEffect(() => {
    localStorage.setItem(LIVES_KEY, String(lives))
  }, [lives])

  // Lógica de recarga automática
  useEffect(() => {
    if (lives < MAX_LIVES && !isRecharging) {
      setIsRecharging(true)
      let interval = setInterval(() => {
        setRechargeTime((prev) => {
          if (prev <= 1) {
            clearInterval(interval)
            setLives((l) => Math.min(l + 1, MAX_LIVES))
            setIsRecharging(false)
            localStorage.removeItem(RECHARGE_KEY)
            return 0
          } else {
            localStorage.setItem(RECHARGE_KEY, String(prev - 1))
            return prev - 1
          }
        })
      }, 1000)
      return () => clearInterval(interval)
    }
    if (lives === MAX_LIVES) {
      setIsRecharging(false)
      setRechargeTime(0)
      localStorage.removeItem(RECHARGE_KEY)
    }
  }, [lives, isRecharging])

  // Iniciar recarga manualmente
  const startRecharge = () => {
    if (lives < MAX_LIVES && rechargeTime === 0) {
      setRechargeTime(RECHARGE_SECONDS)
      setIsRecharging(true)
      localStorage.setItem(RECHARGE_KEY, String(RECHARGE_SECONDS))
    }
  }

  const loseLife = () => {
    if (lives > 0) {
      setLives((l) => {
        const newLives = l - 1
        if (newLives < MAX_LIVES && rechargeTime === 0) {
          setRechargeTime(RECHARGE_SECONDS)
          setIsRecharging(true)
          localStorage.setItem(RECHARGE_KEY, String(RECHARGE_SECONDS))
        }
        return newLives
      })
    }
  }

  const rechargeLife = () => {
    setLives((l) => Math.min(l + 1, MAX_LIVES))
    setIsRecharging(false)
    setRechargeTime(0)
    localStorage.removeItem(RECHARGE_KEY)
  }

  return (
    <LivesContext.Provider value={{ lives, maxLives: MAX_LIVES, loseLife, rechargeLife, setLives, isRecharging, rechargeTime, startRecharge }}>
      {children}
    </LivesContext.Provider>
  )
}

export function useLives() {
  const ctx = useContext(LivesContext)
  if (!ctx) throw new Error("useLives must be used within a LivesProvider")
  return ctx
}
