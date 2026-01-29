import {
  MapPin,
  Ruler,
  Palette,
  Calculator,
  ClipboardList,
  Wrench,
  Lightbulb,
  Award,
  Shield,
  Sparkles,
  Users,
  MessageCircle,
  Phone,
  Clock,
  CheckCircle,
  Truck,
  Home,
  Settings,
  Star,
  Heart,
  Eye,
  Zap,
  Target,
  Layers,
  Grid,
  Box,
  Package,
  Hammer,
  type LucideIcon,
} from "lucide-react";

// Icon mapping for dynamic icon rendering
export const iconMap: Record<string, LucideIcon> = {
  MapPin,
  Ruler,
  Palette,
  Calculator,
  ClipboardList,
  Wrench,
  Lightbulb,
  Award,
  Shield,
  Sparkles,
  Users,
  MessageCircle,
  Phone,
  Clock,
  CheckCircle,
  Truck,
  Home,
  Settings,
  Star,
  Heart,
  Eye,
  Zap,
  Target,
  Layers,
  Grid,
  Box,
  Package,
  Hammer,
};

// Get icon component by name with fallback
export function getIcon(name: string): LucideIcon {
  return iconMap[name] || MapPin;
}

// Get all available icon names
export function getIconNames(): string[] {
  return Object.keys(iconMap);
}
