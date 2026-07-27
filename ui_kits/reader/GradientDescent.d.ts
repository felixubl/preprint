import * as React from 'react';

export interface GradientDescentProps {
  /** Step size. Below 1.11 the iteration contracts; at 1.11 it orbits; above it runs away. */
  lr?: number;
  /** How many steps have been taken from x0 = -2.2. */
  steps?: number;
}

export declare function GradientDescent(props: GradientDescentProps): JSX.Element;
export declare function gdVerdict(lr: number): { text: string; tone: string };
