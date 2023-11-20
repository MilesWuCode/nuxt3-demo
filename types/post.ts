export type Reaction = {
  like_count: number
  dislike_count: number
  like_state: string
  favorite_state: boolean
}

export type Post = {
  id: string | number
  title: string
  cover_url: string
  content?: string
  reaction?: Reaction
}
