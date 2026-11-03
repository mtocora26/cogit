"use client"

import { ShoppingBag, Zap, Gift, Brain } from "lucide-react"
import NavBar from "@/components/nav-bar"
import { Button } from "@/components/ui/button"
import { useState, useEffect } from "react"
import { useLives } from "@/components/misiones/lives-context"

const sparkzPackages = [
	{
		name: "Mini Chispa",
		amount: 50,
		price: 0.49,
		pricePer: 0.0098,
		comment: "Microtransacción simbólica",
	},
	{
		name: "Chispa Rápida",
		amount: 150,
		price: 1.49,
		pricePer: 0.0099,
		comment: "Accesible para usuarios casuales",
	},
	{
		name: "Carga Neuronal",
		amount: 300,
		price: 2.99,
		pricePer: 0.0099,
		comment: "Relación cantidad/precio ideal",
	},
	{
		name: "Tormenta Mental",
		amount: 700,
		price: 5.99,
		pricePer: 0.0086,
		comment: "Descuento progresivo",
	},
	{
		name: "Rayo Supremo",
		amount: 1200,
		price: 9.99,
		pricePer: 0.0083,
		comment: "Más económico por Sparkz",
	},
]

const lifePackages = [
	{ amount: 1, sparkz: 30, usd: 0.3, label: "Por emergencia" },
	{ amount: 3, sparkz: 80, usd: 0.8, label: "Combo ahorro" },
	{ amount: 5, sparkz: 120, usd: 1.2, label: "Paquete estándar" },
]

export default function TiendaPage() {
	// Estado local para Sparkz
	const [sparkz, setSparkz] = useState(0)
	const [bonusAvailable, setBonusAvailable] = useState(true)
	const [bonusMessage, setBonusMessage] = useState("")

	const { lives, maxLives, setLives } = useLives()

	// Cargar valores de localStorage al montar
	useEffect(() => {
		if (typeof window !== "undefined") {
			const s = localStorage.getItem("sparkz")

			setSparkz(s ? parseInt(s) : 0)

			// Bonus diario
			const lastBonus = localStorage.getItem("lastBonusDate")
			const today = new Date().toISOString().slice(0, 10)
			setBonusAvailable(lastBonus !== today)
		}
	}, [])

	// Guardar en localStorage cuando cambian
	useEffect(() => {
		if (typeof window !== "undefined") {
			localStorage.setItem("sparkz", sparkz.toString())
		}
	}, [sparkz])

	// Comprar Sparkz
	const handleBuySparkz = (amount: number) => {
		setSparkz((prev) => prev + amount)
	}

	// Recargar Neuronas (descontando Sparkz y usando contexto)
	const handleRecargarNeuronas = (pkg: { amount: number; sparkz: number }) => {
		if (sparkz >= pkg.sparkz) {
			setSparkz((prev) => prev - pkg.sparkz)
			setLives(Math.min(lives + pkg.amount, maxLives))
		} else {
			alert("No tienes suficientes Sparkz para recargar neuronas.")
		}
	}

	// Reclamar bonus diario
	const handleBonus = () => {
		const today = new Date().toISOString().slice(0, 10)
		setSparkz((prev) => prev + 30)
		localStorage.setItem("lastBonusDate", today)
		setBonusAvailable(false)
		setBonusMessage("¡Has reclamado tu bonus diario de 30 Sparkz!")
		setTimeout(() => setBonusMessage(""), 2500)
	}

	// Solo para pruebas/desarrollo: botón para reiniciar bonus y setear Sparkz
	const handleDevReset = () => {
		setSparkz(1000)
		setBonusAvailable(true)
		localStorage.removeItem("lastBonusDate")
		setBonusMessage("Modo práctica: Sparkz a 1000 y bonus diario reiniciado.")
		setTimeout(() => setBonusMessage(""), 2500)
	}

	return (
		<div className="min-h-screen bg-[#1a1d23] text-white">
			<NavBar activePage="tienda" />
			<div className="container mx-auto px-4 py-8">
				{/* Botón de desarrollo para pruebas */}
				<div className="mb-4">
					<Button
						className="bg-pink-600 hover:bg-pink-700 font-bold"
						onClick={handleDevReset}
					>
						Modo práctica: Resetear bonus y poner 1000 Sparkz
					</Button>
				</div>

				<div className="flex items-center gap-3 mb-8">
					<ShoppingBag className="h-8 w-8 text-yellow-400" />
					<h1 className="text-3xl font-bold">Tienda Sparkz</h1>
				</div>

				{/* Saldo actual */}
				<div className="flex gap-6 items-center mb-8">
					<div className="flex items-center gap-2 bg-[#23263a] px-4 py-2 rounded-lg border border-yellow-400/30">
						<Zap className="h-5 w-5 text-yellow-400" />
						<span className="font-bold text-yellow-300">{sparkz} Sparkz</span>
					</div>
					<div className="flex items-center gap-2 bg-[#23263a] px-4 py-2 rounded-lg border border-blue-400/30">
						<Brain className="h-5 w-5 text-blue-400" />
						<span className="font-bold text-blue-200">{lives} Neuronas</span>
					</div>
				</div>

				{/* BONUS DIARIO */}
				<div className="bg-gradient-to-r from-yellow-400/20 to-pink-500/10 border border-yellow-400/30 rounded-xl p-6 flex items-center gap-4 mb-10 shadow-lg">
					<Gift className="h-10 w-10 text-pink-400 animate-bounce" />
					<div>
						<div className="text-lg font-bold flex items-center gap-2">
							🎁 BONUS DIARIO:{" "}
							<span className="text-yellow-400">Reclama 30 Sparkz gratis</span>
						</div>
						<div className="text-sm text-gray-200 mt-1">
							¡Vuelve cada día para obtener tu recompensa!
						</div>
						{bonusMessage && (
							<div className="text-green-400 font-bold mt-2 animate-pulse">
								{bonusMessage}
							</div>
						)}
					</div>
					<Button
						className="ml-auto bg-yellow-400 text-black font-bold hover:bg-yellow-300 disabled:opacity-60"
						onClick={handleBonus}
						disabled={!bonusAvailable}
					>
						{bonusAvailable ? "Reclamar" : "Ya reclamado"}
					</Button>
				</div>

				{/* RECARGA DE NEURONAS */}
				<div className="bg-gradient-to-r from-blue-500/20 to-purple-500/10 border border-blue-400/30 rounded-xl p-6 flex flex-col md:flex-row items-center gap-6 mb-10 shadow-lg mt-8">
					<div className="flex items-center gap-3 mb-4 md:mb-0">
						<Brain className="h-10 w-10 text-blue-400 animate-pulse" />
						<span className="text-xl font-bold text-blue-300">
							Recargar Neuronas
						</span>
					</div>
					<div className="flex-1 flex flex-col md:flex-row gap-4 items-center">
						{lifePackages.map((pkg) => (
							<div
								key={pkg.amount}
								className="bg-[#23263a] rounded-lg p-4 flex flex-col items-center border border-blue-500/30 shadow-md min-w-[120px]"
							>
								<div className="flex items-center gap-1 mb-2">
									{Array.from({ length: pkg.amount }).map((_, i) => (
										<Brain key={i} className="h-6 w-6 text-blue-400" />
									))}
								</div>
								<div className="text-lg font-bold text-blue-200 mb-1">
									{pkg.amount} Neurona
									{pkg.amount > 1 ? "s" : ""}
								</div>
								<div className="flex items-center gap-1 text-yellow-400 font-bold mb-1">
									<Zap className="h-5 w-5" /> {pkg.sparkz} Sparkz
								</div>
								<div className="text-xs text-gray-300 mb-2">
									≈ ${pkg.usd.toFixed(2)} USD
								</div>
								<div className="text-xs text-gray-400 mb-2">
									{pkg.label}
								</div>
								<Button
									className="bg-blue-600 hover:bg-blue-700 w-full font-bold mt-1"
									onClick={() => handleRecargarNeuronas(pkg)}
								>
									Recargar
								</Button>
							</div>
						))}
					</div>
				</div>

				{/* PAQUETES DE SPARKZ */}
				<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
					{sparkzPackages.map((pkg) => (
						<div
							key={pkg.name}
							className="bg-[#23263a] rounded-xl p-6 flex flex-col justify-between border border-gray-700 hover:border-yellow-400 transition-all shadow-md"
						>
							<div>
								<div className="text-yellow-400 text-lg font-bold mb-2">
									<Zap className="inline-block align-middle" /> {pkg.name}
								</div>
								<div className="text-3xl font-extrabold text-white mb-2">
									{pkg.amount}
									<span className="text-sm text-gray-400"> Sparkz</span>
								</div>
								<div className="text-xl font-bold text-green-400 mb-4">
									${pkg.price.toFixed(2)}
								</div>
							</div>
							<Button
								className="bg-blue-600 hover:bg-blue-700 font-bold py-2"
								onClick={() => handleBuySparkz(pkg.amount)}
							>
								Comprar
							</Button>
						</div>
					))}
				</div>
			</div>
		</div>
	)
}
