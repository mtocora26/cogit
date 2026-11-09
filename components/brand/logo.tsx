import Image from "next/image"

/**
 * Logo horizontal de COGIT del kit de marca. A color solo sobre fondo oscuro;
 * sobre fondo claro se usa la versión negra (regla de la guía de marca).
 */
export function Logo({ className = "h-9 w-auto" }: { className?: string }) {
  return (
    <>
      <Image
        src="/brand/logo-color.png"
        alt="COGIT"
        width={2516}
        height={776}
        priority
        className={`hidden dark:block ${className}`}
      />
      <Image
        src="/brand/logo-negro.png"
        alt="COGIT"
        width={2516}
        height={776}
        priority
        className={`dark:hidden ${className}`}
      />
    </>
  )
}

/** Isotipo "G" para espacios pequeños (mínimo 24 px). */
export function Isotipo({ size = 40, className = "" }: { size?: number; className?: string }) {
  return <Image src="/brand/isotipo.png" alt="" width={size} height={size} className={className} />
}
