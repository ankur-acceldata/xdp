interface UserProfileProps {
  imageSrc: string
  name: string
  compact?: boolean
}

export function UserProfile({ imageSrc, name, compact = false }: UserProfileProps) {
  return (
    <a
      href="#"
      className="flex items-center gap-x-4 px-6 py-3 text-sm/6 font-semibold text-white hover:bg-gray-800"
    >
      <img
        alt=""
        src={imageSrc}
        className="size-8 rounded-full bg-gray-800"
      />
      {!compact && (
        <>
          <span className="sr-only">Your profile</span>
          <span aria-hidden="true">{name}</span>
        </>
      )}
    </a>
  )
} 