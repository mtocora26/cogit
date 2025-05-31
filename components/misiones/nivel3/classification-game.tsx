import { useState } from "react"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

// Banco de ejercicios de clasificación (3 rondas)
const rounds = [
	{
		items: [
			{ id: 1, label: "🔴", color: "rojo", shape: "círculo" },
			{ id: 2, label: "🔵", color: "azul", shape: "círculo" },
			{ id: 3, label: "🟢", color: "verde", shape: "círculo" },
			{ id: 4, label: "🟥", color: "rojo", shape: "cuadrado" },
			{ id: 5, label: "🟦", color: "azul", shape: "cuadrado" },
			{ id: 6, label: "🟩", color: "verde", shape: "cuadrado" },
		],
		groups: ["Por color", "Por forma"],
		correct: (item: any, group: string) => group === (group === "Por color" ? item.color : item.shape),
		description: "Clasifica los íconos por color o por forma.",
	},
	{
		items: [
			{ id: 1, label: "🍎", type: "fruta" },
			{ id: 2, label: "🥦", type: "verdura" },
			{ id: 3, label: "🍌", type: "fruta" },
			{ id: 4, label: "🥕", type: "verdura" },
			{ id: 5, label: "🍇", type: "fruta" },
			{ id: 6, label: "🥬", type: "verdura" },
		],
		groups: ["Fruta", "Verdura"],
		correct: (item: any, group: string) => (item.type === "fruta" ? group === "Fruta" : group === "Verdura"),
		description: "Clasifica los alimentos en frutas o verduras.",
	},
	{
		items: [
			{ id: 1, label: "🐶", group: "animal" },
			{ id: 2, label: "🚗", group: "vehículo" },
			{ id: 3, label: "🐱", group: "animal" },
			{ id: 4, label: "✈️", group: "vehículo" },
			{ id: 5, label: "🐦", group: "animal" },
			{ id: 6, label: "🚲", group: "vehículo" },
		],
		groups: ["Animal", "Vehículo"],
		correct: (item: any, group: string) => (item.group === "animal" ? group === "Animal" : group === "Vehículo"),
		description: "Clasifica los íconos en animales o vehículos.",
	},
]
const MAX_ROUNDS = rounds.length

export default function ClassificationGame({ onComplete }: { onComplete: (success: boolean, time: number) => void }) {
	const [round, setRound] = useState(1)
	const [selectedGroup, setSelectedGroup] = useState<string>(rounds[0].groups[0])
	const [assignments, setAssignments] = useState<{ [id: number]: string }>({})
	const [completed, setCompleted] = useState(false)
	const [feedback, setFeedback] = useState<string | null>(null)
	const [startTime] = useState(Date.now())
	const [attempts, setAttempts] = useState(0)
	const [showHint, setShowHint] = useState(false)

	const current = rounds[round - 1]

	const handleAssign = (itemId: number, group: string) => {
		if (completed) return
		setAssignments({ ...assignments, [itemId]: group })
	}
	const check = () => {
		let ok = true
		for (const item of current.items) {
			if (!current.correct(item, assignments[item.id] || "")) ok = false
		}
		setCompleted(true)
		setFeedback(ok ? "¡Correcto! Clasificación exitosa." : "Algunos elementos están mal agrupados.")
		setAttempts((a) => a + 1)
		setTimeout(() => {
			if (ok && round < MAX_ROUNDS) {
				setRound(round + 1)
				setAssignments({})
				setCompleted(false)
				setFeedback(null)
				setShowHint(false)
				setAttempts(0)
				setSelectedGroup(rounds[round].groups[0])
			} else if (ok && round === MAX_ROUNDS) {
				onComplete(true, Math.floor((Date.now() - startTime) / 1000))
			}
		}, 2000)
	}
	const reset = () => {
		setAssignments({})
		setCompleted(false)
		setFeedback(null)
		setShowHint(false)
		setAttempts(0)
		setSelectedGroup(current.groups[0])
	}
	const giveHint = () => {
		setShowHint(true)
	}
	return (
		<div className="bg-[#1e2330] rounded-lg p-6 border border-gray-800 max-w-xl mx-auto">
			<h2 className="text-xl font-bold mb-4">Clasificación y agrupamiento</h2>
			<div className="mb-2 text-gray-300">{current.description}</div>
			<div className="mb-4 flex gap-2">
				{current.groups.map((g) => (
					<Button key={g} variant={selectedGroup === g ? "default" : "outline"} onClick={() => setSelectedGroup(g)}>{g}</Button>
				))}
			</div>
			<div className="grid grid-cols-3 gap-4 mb-6">
				{current.items.map((item) => (
					<div key={item.id} className="flex flex-col items-center gap-2">
						<div className="text-3xl">{item.label}</div>
						<div className="flex gap-2">
							{current.groups.map((g) => (
								<Button key={g} size="sm" variant={assignments[item.id] === g ? "default" : "outline"} onClick={() => handleAssign(item.id, g)} disabled={completed}>{g}</Button>
							))}
						</div>
					</div>
				))}
			</div>
			{feedback && <div className={cn("mb-4 font-semibold", feedback.includes("Correcto") ? "text-green-400" : "text-yellow-400")}>{feedback}</div>}
			{!completed && (
				<Button className="bg-blue-600 hover:bg-blue-700" onClick={check}>Verificar</Button>
			)}
			{completed && (
				<Button className="mt-4 bg-gray-600 hover:bg-gray-700" onClick={reset}>{round < MAX_ROUNDS ? "Siguiente ronda" : "Intentar otro"}</Button>
			)}
			{!completed && attempts >= 2 && (
				<Button className="mt-4 bg-yellow-600 hover:bg-yellow-700" onClick={giveHint}>Pista</Button>
			)}
			{showHint && <div className="mt-2 text-blue-300">Pista: Observa bien las características de cada ícono.</div>}
			<div className="mt-4 text-sm text-gray-400">Ronda: {round}/{MAX_ROUNDS}</div>
		</div>
	)
}
