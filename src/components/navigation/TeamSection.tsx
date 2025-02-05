import { Team, classNames } from './NavigationConfig'

interface TeamSectionProps {
  teams: Team[]
}

export function TeamSection({ teams }: TeamSectionProps) {
  return (
    <li>
      <div className="text-xs/6 font-semibold text-gray-400">Your teams</div>
      <ul role="list" className="-mx-2 mt-2 space-y-1">
        {teams.map((team) => (
          <li key={team.name}>
            <a
              href={team.href}
              className={classNames(
                team.current
                  ? 'bg-gray-800 text-white'
                  : 'text-gray-400 hover:bg-gray-800 hover:text-white',
                'group flex gap-x-3 rounded-md p-2 text-sm/6 font-semibold',
              )}
            >
              <span className="flex size-6 shrink-0 items-center justify-center rounded-lg border border-gray-700 bg-gray-800 text-[0.625rem] font-medium text-gray-400 group-hover:text-white">
                {team.initial}
              </span>
              <span className="truncate">{team.name}</span>
            </a>
          </li>
        ))}
      </ul>
    </li>
  )
} 