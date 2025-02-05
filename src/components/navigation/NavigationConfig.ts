import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
  faServer,
  faDatabase,
  faBolt,
  faFlask
} from '@fortawesome/pro-solid-svg-icons';

export interface NavigationItem {
  name: string
  href: string
  icon: typeof FontAwesomeIcon
  iconDef: typeof faServer
  current?: boolean
}

export interface Team {
  id: number
  name: string
  href: string
  initial: string
  current: boolean
}

export const navigation: NavigationItem[] = [
  { name: 'Clusters', href: '/dashboard/clusters', icon: FontAwesomeIcon, iconDef: faServer },
  { name: 'Data Sources', href: '/dashboard/data-sources', icon: FontAwesomeIcon, iconDef: faDatabase },
  { name: 'Spark', href: '/dashboard/spark', icon: FontAwesomeIcon, iconDef: faBolt },
  { name: 'Jupyter', href: '/dashboard/jupyter', icon: FontAwesomeIcon, iconDef: faFlask },
]

export function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(' ')
} 