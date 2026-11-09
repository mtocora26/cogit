import { Isotipo } from "@/components/brand/logo"

const CELLS = 14
const ROWS = 6
const PAT = (r: number, c: number) => ((Math.min(c, CELLS - 1 - c) + r * 2) % 8 < 3) || ((c * 3 + r) % 7 === 0 && r % 2 === 0)
const thread = (t: number) => `hsl(${Math.round(186 + 91 * t)} 100% calc(var(--tl0) - var(--tld) * ${t}))`

/** Panel lateral de login y registro: una tela tejida en lugar de una foto de stock. */
export function AuthPanel({ title, text, children }: { title: string; text: string; children?: React.ReactNode }) {
  return (
    <div className="relative hidden overflow-hidden bg-card md:block md:w-1/2">
      <svg aria-hidden viewBox={`0 0 ${CELLS * 30} ${ROWS * 26}`} className="absolute inset-x-0 bottom-0 block w-full opacity-90" style={{ maskImage: "linear-gradient(to top, black 55%, transparent)", WebkitMaskImage: "linear-gradient(to top, black 55%, transparent)" }}>
        {Array.from({ length: ROWS }, (_, r) =>
          Array.from({ length: CELLS }, (_, c) => (
            <rect
              key={`${r}-${c}`}
              x={c * 30 + 1}
              y={r * 26 + 1}
              width={28}
              height={24}
              rx={4}
              style={{ fill: PAT(r % 6, c) ? thread(r / (ROWS - 1)) : "hsl(var(--accent))" }}
            />
          )),
        )}
      </svg>
            <div className="relative z-10 flex h-full flex-col items-center justify-start px-12 pt-[14vh] text-center">
        <Isotipo size={72} className="mb-6 h-[72px] w-[72px] rounded-xl" />
        <h2 className="max-w-md font-display text-4xl font-semibold">{title}</h2>
        <p className="mt-4 max-w-md text-lg text-muted-foreground">{text}</p>
        <div className="mt-6">{children}</div>
      </div>
    </div>
  )
}
