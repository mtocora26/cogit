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
const RECHARGE_UNTIL_KEY = "misiones_lives_recharge_until"
const MAX_LIVES = 5
const RECHARGE_SECONDS = 20 * 60 // 20 minutos por vida (ajustable)

export function LivesProvider({ children }: { children: ReactNode }) {
  const [lives, setLives] = useState<number>(MAX_LIVES)
  const [isRecharging, setIsRecharging] = useState(false)
  const [rechargeTime, setRechargeTime] = useState(0)

  // Calcular tiempo restante dinámicamente
  function getTimeLeft() {
    const until = localStorage.getItem(RECHARGE_UNTIL_KEY)
    if (!until) return 0
    const diff = Math.max(0, Math.floor((parseInt(until) - Date.now()) / 1000))
    return diff
  }

  // Cargar vidas y recarga desde localStorage correctamente
  useEffect(() => {
    const saved = localStorage.getItem(LIVES_KEY)
    if (saved) setLives(Number(saved))
    const until = localStorage.getItem(RECHARGE_UNTIL_KEY)
    if (until) {
      const left = getTimeLeft()
      setRechargeTime(left)
      if (left > 0 && lives < MAX_LIVES) setIsRecharging(true)
    }
  }, [])

  // Guardar vidas en localStorage
  useEffect(() => {
    localStorage.setItem(LIVES_KEY, String(lives))
  }, [lives])

  // Lógica de recarga automática robusta
  useEffect(() => {
    if (lives < MAX_LIVES) {
      setIsRecharging(true)
      const interval = setInterval(() => {
        const left = getTimeLeft()
        setRechargeTime(left)
        if (left <= 0) {
          setLives((l) => Math.min(l + 1, MAX_LIVES))
          setIsRecharging(false)
          setRechargeTime(0)
          localStorage.removeItem(RECHARGE_UNTIL_KEY)
        }
      }, 1000)
      return () => clearInterval(interval)
    } else {
      setIsRecharging(false)
      setRechargeTime(0)
      localStorage.removeItem(RECHARGE_UNTIL_KEY)
    }
  }, [lives])

  // Iniciar recarga manualmente
  const startRecharge = () => {
    if (lives < MAX_LIVES && rechargeTime === 0) {
      const until = Date.now() + RECHARGE_SECONDS * 1000
      localStorage.setItem(RECHARGE_UNTIL_KEY, String(until))
      setRechargeTime(RECHARGE_SECONDS)
      setIsRecharging(true)
    }
  }

  const loseLife = () => {
    if (lives > 0) {
      setLives((l) => {
        const newLives = l - 1
        if (newLives < MAX_LIVES && rechargeTime === 0) {
          const until = Date.now() + RECHARGE_SECONDS * 1000
          localStorage.setItem(RECHARGE_UNTIL_KEY, String(until))
          setRechargeTime(RECHARGE_SECONDS)
          setIsRecharging(true)
        }
        return newLives
      })
    }
  }

  const rechargeLife = () => {
    setLives((l) => Math.min(l + 1, MAX_LIVES))
    setIsRecharging(false)
    setRechargeTime(0)
    localStorage.removeItem(RECHARGE_UNTIL_KEY)
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
