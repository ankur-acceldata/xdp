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
  title: string
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
  { name: 'Clusters', href: '/dashboard/clusters', icon: FontAwesomeIcon, iconDef: faServer, title: 'Clusters' },
  { name: 'Data Sources', href: '/dashboard/data-sources', icon: FontAwesomeIcon, iconDef: faDatabase, title: 'Data Sources' },
  { name: 'Spark', href: '/dashboard/spark', icon: FontAwesomeIcon, iconDef: faBolt, title: 'Spark Configuration' },
  { name: 'Jupyter', href: '/dashboard/jupyter', icon: FontAwesomeIcon, iconDef: faFlask, title: 'Jupyter Notebooks' },
]

export function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(' ')
} 