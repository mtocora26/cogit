import UsuariosTabla from "@/components/admin/usuarios-tabla"

export default function AdminUsuarios() {
  return (
    <div className="space-y-6">
      <header>
        <h1 className="font-display text-3xl font-semibold">Usuarios</h1>
        <p className="mt-2 max-w-2xl text-muted-foreground">
          Consulta las cuentas y define su rol. El correo solo se muestra aquí, para dar soporte de acceso; no aparece en el ranking ni
          en la comunidad.
        </p>
      </header>
      <UsuariosTabla />
    </div>
  )
}
