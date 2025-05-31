import { useState } from "react"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

// Banco de ejercicios progresivos
const exercises = [
	{
		initialSteps: [
			{ id: 1, text: "Avanzar" },
			{ id: 2, text: "Girar a la derecha" }, // Error: debería ser izquierda
			{ id: 3, text: "Avanzar" },
			{ id: 4, text: "Llegar a la meta" },
		],
		correctSteps: [
			{ id: 1, text: "Avanzar" },
			{ id: 2, text: "Girar a la izquierda" },
			{ id: 3, text: "Avanzar" },
			{ id: 4, text: "Llegar a la meta" },
		],
		hint: "El giro en el paso 2 es incorrecto.",
	},
	{
		initialSteps: [
			{ id: 1, text: "Tomar la taza" },
			{ id: 2, text: "Servir café antes de poner azúcar" }, // Error: el azúcar va antes
			{ id: 3, text: "Poner azúcar" },
			{ id: 4, text: "Revolver y beber" },
		],
		correctSteps: [
			{ id: 1, text: "Tomar la taza" },
			{ id: 3, text: "Poner azúcar" },
			{ id: 2, text: "Servir café antes de poner azúcar" },
			{ id: 4, text: "Revolver y beber" },
		],
		hint: "El orden de azúcar y café no es correcto.",
	},
	{
		initialSteps: [
			{ id: 1, text: "Encender la computadora" },
			{ id: 2, text: "Cerrar el programa antes de guardar" }, // Error: debe guardar antes
			{ id: 3, text: "Guardar el archivo" },
			{ id: 4, text: "Apagar la computadora" },
		],
		correctSteps: [
			{ id: 1, text: "Encender la computadora" },
			{ id: 3, text: "Guardar el archivo" },
			{ id: 2, text: "Cerrar el programa antes de guardar" },
			{ id: 4, text: "Apagar la computadora" },
		],
		hint: "No debes cerrar el programa antes de guardar.",
	},
]
const MAX_ROUNDS = exercises.length

export default function DebuggingVisual({ onComplete }: { onComplete: (success: boolean, time: number) => void }) {
	const [round, setRound] = useState(1)
	const [steps, setSteps] = useState([...exercises[0].initialSteps])
	const [completed, setCompleted] = useState(false)
	const [success, setSuccess] = useState(false)
	const [feedback, setFeedback] = useState<string | null>(null)
	const [startTime] = useState(Date.now())
	const [attempts, setAttempts] = useState(0)
	const [showHint, setShowHint] = useState(false)

	const currentExercise = exercises[round - 1]
	const correctSteps = currentExercise.correctSteps
	const hint = currentExercise.hint

	const handleEdit = (idx: number, newText: string) => {
		if (completed) return
		const newSteps = steps.map((s, i) => (i === idx ? { ...s, text: newText } : s))
		setSteps(newSteps)
	}
	const check = () => {
		const ok = steps.length === correctSteps.length && steps.every((s, i) => s.text === correctSteps[i].text)
		setCompleted(true)
		setSuccess(ok)
		setFeedback(ok ? "¡Secuencia corregida!" : "Aún hay un error en la secuencia.")
		setAttempts((a) => a + 1)
		setTimeout(() => {
			if (ok && round < MAX_ROUNDS) {
				setRound(round + 1)
				setSteps([...exercises[round].initialSteps])
				setCompleted(false)
				setSuccess(false)
				setFeedback(null)
				setAttempts(0)
				setShowHint(false)
			} else if (ok && round === MAX_ROUNDS) {
				onComplete(true, Math.floor((Date.now() - startTime) / 1000))
			} else {
				// Si no es correcto, solo mostrar feedback
			}
		}, 2000)
	}
	const reset = () => {
		setSteps([...currentExercise.initialSteps])
		setCompleted(false)
		setSuccess(false)
		setFeedback(null)
		setShowHint(false)
		setAttempts(0)
	}
	const giveHint = () => {
		setShowHint(true)
	}
	return (
		<div className="bg-[#1e2330] rounded-lg p-6 border border-gray-800 max-w-xl mx-auto">
			<h2 className="text-xl font-bold mb-4">Encuentra y corrige el error</h2>
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
						className="bg-[#23283a] rounded p-3 flex items-center gap-2 border border-gray-700 shadow-sm"
					>
						<span className="font-bold text-lg">{idx + 1}.</span>
						<input
							className={cn(
								"flex-1 bg-transparent border-b border-gray-600 text-white outline-none px-1",
								completed && !success && "opacity-70"
							)}
							value={step.text}
							onChange={(e) => handleEdit(idx, e.target.value)}
							disabled={completed}
						/>
					</div>
				))}
			</div>
			{feedback && (
				<div className={cn("mb-4 font-semibold", success ? "text-green-400" : "text-yellow-400")}>
					{feedback}
				</div>
			)}
			{!completed && (
				<Button className="bg-blue-600 hover:bg-blue-700" onClick={check}>
					Probar secuencia
				</Button>
			)}
			{completed && (
				<Button className="mt-4 bg-gray-600 hover:bg-gray-700" onClick={reset}>
					{round < MAX_ROUNDS ? "Siguiente ronda" : "Intentar otro"}
				</Button>
			)}
			{!completed && attempts >= 2 && (
				<Button className="mt-4 bg-yellow-600 hover:bg-yellow-700" onClick={giveHint}>
					Pista
				</Button>
			)}
			{showHint && <div className="mt-2 text-blue-300">Pista: {hint}</div>}
		</div>
	)
}
