import React from 'react';
import { Player } from '@remotion/player';
import { ProjectMotionComposition } from './ProjectMotionComposition';

interface ProjectMotionPlayerProps {
  projectId: string;
  heightClass?: string;
}

export const ProjectMotionPlayer: React.FC<ProjectMotionPlayerProps> = ({
  projectId,
  heightClass = 'h-36 sm:h-44',
}) => {
  return (
    <div className={`relative w-full ${heightClass} rounded-2xl overflow-hidden border border-white/[0.08] bg-dark-950/80 shadow-inner group-hover:border-violet-500/40 transition-colors`}>
      {/* Remotion Player Instance */}
      <Player
        component={ProjectMotionComposition}
        inputProps={{ projectId }}
        durationInFrames={90}
        compositionWidth={640}
        compositionHeight={320}
        fps={30}
        loop
        autoPlay
        style={{
          width: '100%',
          height: '100%',
        }}
      />
    </div>
  );
};
