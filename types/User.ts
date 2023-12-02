export type User = {
  id: string | number
  name: string
  email: string
  avatar_url: string
  email_verified_at: Date | null
  provider: string | null
  provider_id: string | null
}
