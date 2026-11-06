import {NavSubItem} from './nav-sub-item';

export interface NavItem {
  name: string;
  route?: string;
  dropdown?: NavSubItem[];
}
