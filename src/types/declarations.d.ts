declare module 'lucide-react' {
  import * as React from 'react';
  export interface LucideProps extends React.SVGProps<SVGSVGElement> {
    size?: string | number;
    color?: string;
    strokeWidth?: string | number;
    className?: string;
  }
  export type Icon = React.FC<LucideProps>;

  export const Sun: Icon;
  export const Moon: Icon;
  export const Globe: Icon;
  export const Menu: Icon;
  export const X: Icon;
  export const Github: Icon;
  export const Mail: Icon;
  export const ArrowUp: Icon;
  export const ExternalLink: Icon;
  export const Code: Icon;
  export const Brain: Icon;
  export const Shield: Icon;
  export const Award: Icon;
  export const Users: Icon;
  export const Calendar: Icon;
  export const Download: Icon;
  export const CheckCircle: Icon;
  export const ArrowRight: Icon;
  export const Database: Icon;
  export const Cpu: Icon;
  export const FileText: Icon;
  export const Send: Icon;
  export const Terminal: Icon;
  export const Lock: Icon;
  export const Check: Icon;
  export const Sparkles: Icon;
  export const Eye: Icon;
  export const Activity: Icon;
  export const HeartPulse: Icon;
  export const Stethoscope: Icon;
  export const Layers: Icon;
  export const UserCheck: Icon;
  export const Sparkle: Icon;
}
