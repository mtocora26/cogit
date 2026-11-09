import { useState } from "react"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

// Banco de ejercicios de dificultad progresiva
const exercises = [
	{
		initialSteps: [
			{ id: 1, text: "Tomar un vaso" },
			{ id: 2, text: "Abrir la llave del agua" },
			{ id: 3, text: "Beber el agua" },
			{ id: 4, text: "Llenar el vaso con agua" },
		],
		correctSteps: [
			{ id: 1, text: "Tomar un vaso" },
			{ id: 2, text: "Abrir la llave del agua" },
			{ id: 4, text: "Llenar el vaso con agua" },
			{ id: 3, text: "Beber el agua" },
		],
	},
	{
		initialSteps: [
			{ id: 1, text: "Ponerse los calcetines" },
			{ id: 2, text: "Ponerse los zapatos" },
			{ id: 3, text: "Atarse los cordones" },
			{ id: 4, text: "Buscar los zapatos" },
		],
		correctSteps: [
			{ id: 1, text: "Ponerse los calcetines" },
			{ id: 4, text: "Buscar los zapatos" },
			{ id: 2, text: "Ponerse los zapatos" },
			{ id: 3, text: "Atarse los cordones" },
		],
	},
	{
		initialSteps: [
			{ id: 1, text: "Poner la pasta de dientes en el cepillo" },
			{ id: 2, text: "Enjuagar la boca" },
			{ id: 3, text: "Cepillar los dientes" },
			{ id: 4, text: "Tomar el cepillo de dientes" },
			{ id: 5, text: "Abrir la pasta de dientes" },
		],
		correctSteps: [
			{ id: 4, text: "Tomar el cepillo de dientes" },
			{ id: 5, text: "Abrir la pasta de dientes" },
			{ id: 1, text: "Poner la pasta de dientes en el cepillo" },
			{ id: 3, text: "Cepillar los dientes" },
			{ id: 2, text: "Enjuagar la boca" },
		],
	},
	{
		initialSteps: [
			{ id: 1, text: "Encender la computadora" },
			{ id: 2, text: "Escribir el documento" },
			{ id: 3, text: "Guardar el documento" },
			{ id: 4, text: "Abrir el programa de texto" },
			{ id: 5, text: "Apagar la computadora" },
		],
		correctSteps: [
			{ id: 1, text: "Encender la computadora" },
			{ id: 4, text: "Abrir el programa de texto" },
			{ id: 2, text: "Escribir el documento" },
			{ id: 3, text: "Guardar el documento" },
			{ id: 5, text: "Apagar la computadora" },
		],
	},
	{
		initialSteps: [
			{ id: 1, text: "Poner la olla en la estufa" },
			{ id: 2, text: "Agregar agua a la olla" },
			{ id: 3, text: "Encender la estufa" },
			{ id: 4, text: "Esperar a que hierva el agua" },
			{ id: 5, text: "Agregar la pasta" },
			{ id: 6, text: "Escurrir la pasta" },
		],
		correctSteps: [
			{ id: 1, text: "Poner la olla en la estufa" },
			{ id: 2, text: "Agregar agua a la olla" },
			{ id: 3, text: "Encender la estufa" },
			{ id: 4, text: "Esperar a que hierva el agua" },
			{ id: 5, text: "Agregar la pasta" },
			{ id: 6, text: "Escurrir la pasta" },
		],
	},
]
const MAX_ROUNDS = exercises.length

export default function AlgorithmFix({
	onComplete,
	maxAttempts = 2,
}: {
	onComplete: (success: boolean, time: number) => void
	maxAttempts?: number
}) {
	const [round, setRound] = useState(1)
	const [steps, setSteps] = useState([...exercises[0].initialSteps])
	const [completed, setCompleted] = useState(false)
	const [success, setSuccess] = useState(false)
	const [attempts, setAttempts] = useState(0)
	const [startTime] = useState(Date.now())
	const [feedback, setFeedback] = useState<string | null>(null)

	const currentExercise = exercises[round - 1]
	const correctSteps = currentExercise.correctSteps

	const handleMove = (from: number, to: number) => {
		if (completed) return
		const newSteps = [...steps]
		const [removed] = newSteps.splice(from, 1)
		newSteps.splice(to, 0, removed)
		setSteps(newSteps)
	}
	const handleRemove = (idx: number) => {
		if (completed) return
		setSteps(steps.filter((_, i) => i !== idx))
	}
	const checkFix = () => {
		const isCorrect =
			steps.length === correctSteps.length &&
			steps.every((s, i) => s.text === correctSteps[i].text)
		setCompleted(true)
		setSuccess(isCorrect)
		setAttempts((a) => a + 1)
		setFeedback(
			isCorrect
				? "¡Algoritmo corregido!"
				: "Aún hay errores. Intenta de nuevo."
		)
		setTimeout(() => {
			if (round < MAX_ROUNDS) {
				setRound(round + 1)
				setSteps([...exercises[round].initialSteps])
				setCompleted(false)
				setSuccess(false)
				setFeedback(null)
				setAttempts(0)
			} else {
				onComplete(isCorrect, Math.floor((Date.now() - startTime) / 1000))
			}
		}, 2000)
	}
	const reset = () => {
		setSteps([...currentExercise.initialSteps])
		setCompleted(false)
		setSuccess(false)
		setFeedback(null)
		setAttempts(0)
	}
	return (
		<div className="bg-[#1e2330] rounded-lg p-6 border border-gray-800 max-w-xl mx-auto">
			<h2 className="text-xl font-bold mb-4">Corrige el algoritmo</h2>
			<div className="flex items-center gap-2 mb-4">
				<span className="text-sm text-gray-400">Ronda:</span>
				<span className="bg-blue-500/20 text-blue-400 px-2 py-1 rounded-full text-sm">
					{round}/{MAX_ROUNDS}
				</span>
			</div>
			<div className="space-y-2 mb-6">
				{steps.map((step, idx) => (
					<div
						key={step.id}
						className={cn(
							"bg-[#23283a] rounded p-3 flex items-center gap-2 border border-gray-700 shadow-sm",
							completed && !success && "opacity-70"
						)}
					>
						{" "}
						<span className="font-bold text-lg">{idx + 1}.</span>{" "}
						<span className="flex-1">{step.text}</span>{" "}
						{!completed && idx > 0 && (
							<Button
								size="sm"
								variant="outline"
								onClick={() => handleMove(idx, idx - 1)}
							>
								↑
							</Button>
						)}{" "}
						{!completed && idx < steps.length - 1 && (
							<Button
								size="sm"
								variant="outline"
								onClick={() => handleMove(idx, idx + 1)}
							>
								↓
							</Button>
						)}{" "}
						{!completed && (
							<Button
								size="sm"
								variant="destructive"
								onClick={() => handleRemove(idx)}
							>
								Eliminar
							</Button>
						)}{" "}
					</div>
				))}
			</div>
			{feedback && (
				<div
					className={cn(
						"mb-4 font-semibold",
						success ? "text-green-400" : "text-yellow-400"
					)}
				>
					{feedback}
				</div>
			)}
			{!completed && (
				<Button
					className="bg-blue-600 hover:bg-blue-700"
					onClick={checkFix}
				>
					Probar algoritmo
				</Button>
			)}
			{completed && !success && attempts < maxAttempts && (
				<Button
					className="mt-4 bg-yellow-600 hover:bg-yellow-700"
					onClick={reset}
				>
					Intentar de nuevo
				</Button>
			)}
			{completed && !success && attempts >= maxAttempts && (
				<div className="mt-4 text-red-400 font-semibold">
					Has alcanzado el número máximo de intentos.
				</div>
			)}
		</div>
	)
}
