import { useSession } from "next-auth/react";

export function GridContainerPerfil() {
  const { data: session, status } = useSession();

  return (
    <div>
      <pre>{JSON.stringify(session)}</pre>
      <pre>{JSON.stringify(status)}</pre>
      GridContainerPerfil
    </div>
  );
}
