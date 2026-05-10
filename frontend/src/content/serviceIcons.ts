import { Monitor, ShoppingBag, Terminal, Cpu, BarChart2, type LucideIcon } from 'lucide-react';
import type { ServiceIconKey } from './types';

export const SERVICE_ICONS: Record<ServiceIconKey, LucideIcon> = {
    Monitor,
    ShoppingBag,
    Terminal,
    Cpu,
    BarChart2
};

export function getServiceIcon(key: ServiceIconKey): LucideIcon {
    return SERVICE_ICONS[key];
}
