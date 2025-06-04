import {
  TargetAndTransition,
  VariantLabels,
  AnimationControls,
} from 'framer-motion';

export interface AnimationTransitions {
  initial: VariantLabels | TargetAndTransition;
  animate: VariantLabels | TargetAndTransition | AnimationControls;
  exit: VariantLabels | TargetAndTransition;
  transition: {
    duration?: number;
    delay?: number;
    ease?: string | number[];
    [key: string]: any;
  };
}
