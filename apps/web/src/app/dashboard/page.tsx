import { requireAuth } from "@/lib/auth"
import { PrivateDataClient } from "./private-data-client"

export default async function Dashboard() {
  const session = await requireAuth()

  return (
    <div>
      <h1>Dashboard</h1>
      <p>Welcome {session.userId}</p>
      <PrivateDataClient />
    </div>
  )
}
